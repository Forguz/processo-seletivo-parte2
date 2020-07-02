import api from '../../services/api';
import * as Toastr from 'toastr';

import router from '../../router';
import pushRouter from '../../utils/pushRouter';

import Repository from '../../components/Repository';


export default function HomeController(req) {
  const searchGroup = document.querySelector('#search-group');

  if(localStorage.hasOwnProperty('@git_explorer/repositories')) {
    const repositories = JSON.parse(localStorage.getItem('@git_explorer/repositories'));

    repositories.forEach(repository => {
      addRepository(repository);
    });
  }

  searchGroup.addEventListener('submit', async e => submit(e));
}

async function submit(e) {
  e.preventDefault();
  const form = e.target;
  const repoName = form["search"].value;
  let repositories = new Array();

  if(localStorage.hasOwnProperty('@git_explorer/repositories')) {

    repositories = JSON.parse(localStorage.getItem('@git_explorer/repositories'));
  }

  const repositoryExists = repositories.find(repository => repository.title.toLowerCase() === repoName.toLowerCase());

  console.log('Já existe', repositoryExists);
  if(repositoryExists) {
    Toastr.warning('Repositório já adicionado.');
  } else {
    const repositoryData = await loadData(repoName);

    const repositoryObject = {
      title: repositoryData.full_name,
      description: repositoryData.description,
      avatar: repositoryData.owner.avatar_url,
      alt: repositoryData.owner.login
    }

    repositories.push(repositoryObject);
    localStorage.setItem('@git_explorer/repositories', JSON.stringify(repositories));
    const lis = document.getElementsByClassName('card');

    addRepository(repositoryObject, lis.length);
  }
}

async function loadData(repoName) {
  try {
    const response = await api.get(`/repos/${repoName}`);

    Toastr.success('Repositório adicionado!');
    return response.data;
  } catch (err) {
    Toastr.error('Erro ao adicionar o repositório!');
  }
}

function pushRepository(e) {
  const repositoryName = e.currentTarget.querySelector('h5').innerHTML;
  localStorage.setItem('@git_explorer/actual-repository', repositoryName);
  console.log(repositoryName);
  pushRouter('/repository', router);
}

function addRepository(repositoryObject) {
  const repositoryElement = Repository(repositoryObject);
  const lis = document.getElementsByClassName('card');

  document.querySelector('#content').appendChild(repositoryElement);
  lis[lis.length - 1].addEventListener('click', e => pushRepository(e));
}
