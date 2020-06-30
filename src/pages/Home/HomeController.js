import api from '../../services/api';

import Repository from '../../components/Repository';
import * as Toastr from 'toastr';

import pagePush from '../../utils/nav';

export default function HomeController() {
  const searchGroup = document.querySelector('#search-group');

  searchGroup.addEventListener('submit', async e => submit(e));

  let lastIndex = 0;

  async function submit(e) {
    e.preventDefault();
    const form = e.target;
    const repoName = form["search"].value;

    const repositoryData = await loadData(repoName);

    const repositoryElement = Repository(
      {
        title: repositoryData.full_name,
        description: repositoryData.description,
        avatar: repositoryData.owner.avatar_url,
        alt: repositoryData.owner.login
      }
    );

    document.querySelector('#content').appendChild(repositoryElement);

    const lis = document.getElementsByClassName('card');

    // não sabia outra forma de fazer, então fiz uma validação, para que o li
    // chamasse somente uma vez a função adicionada

    let i = 0;
    for(i; i < lis.length; i++) {
      console.log('actualIndex', i);
      console.log('lastIndex', lastIndex);
      if(i === 0 && lastIndex === 0) {
        lis[i].addEventListener('click', e => setRepositoryOnLocalStorage(e));
      }

      if(i === lastIndex && lastIndex !== 0) {
        lis[lastIndex].addEventListener('click', e => setRepositoryOnLocalStorage(e));
      }
    }
    lastIndex++;
  }

  async function loadData(repoName) {
    try {
      const response = await api.get(`/repos/${repoName}`);

      Toastr.success('Repository added!');
      return response.data;
    } catch (err) {
      Toastr.error(err);
    }
  }

  function setRepositoryOnLocalStorage(e) {
    console.log(e.currentTarget);
    const repositoryName = e.currentTarget.querySelector('h5').innerHTML;
    console.log(repositoryName);
    localStorage.setItem('@listGit/actual-repository', repositoryName);
    pagePush('/repository');
  }

  // async function loadData(repoName) {
  //   const [repository, issues, contributors] = await Promise.all([
  //     api.get(`/repos/${repoName}`),
  //     api.get(`/repos/${repoName}/issues`),
  //     api.get(`/repos/${repoName}/contributors`)
  //   ]);

  //   return {
  //     repository: repository.data,
  //     issues: issues.data,
  //     contributors: contributors.data
  //   }
  // }
}
