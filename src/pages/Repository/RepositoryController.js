import api from '../../services/api';
import Issue from '../../components/Issue';
import pushRouter from '../../utils/pushRouter';
import Contributors from '../../components/Contributors';

export default async function RepositoryController(req) {
  const repoName = localStorage.getItem('@git_explorer/actual-repository');
  const response = await loadData(repoName);

  document.querySelector('#image_container').innerHTML = /*html*/
  `
    <div class="d-flex p-2 flex-column justify-content-center">
      <img src=${response.repository.owner.avatar_url} alt=${response.repository.full_name} width="120px" height="120px" id="avatar_repository" class="rounded-circle">
    </div>
    <div class="d-flex p-2 flex-column justify-content-center" style="flex: 1">
      <h2 class="card-title" id="repository-title">${response.repository.full_name}</h2>
      <p class="card-text" id="repository-desc">${response.repository.description}</p>
    </div>
  `;

  const contributors = response.contributors.reduce((accumulator, contributor) => {
    if(contributor.contributions >= 500) {
      accumulator["500"].push(contributor);
    } else if(contributor.contributions >= 200) {
      accumulator["200"].push(contributor);
    } else if(contributor.contributions >= 100) {
      accumulator["100"].push(contributor);
    }
    return accumulator;
  }, {
    100: [],
    200: [],
    500: []
  });

  let actualDiv100;
  contributors["100"].forEach((contributor, index) => {
    if(index === 0 || index % 6 === 0) {
      actualDiv100 = index;
      const div = document.createElement('div');
      div.classList.add('d-flex');
      div.classList.add('flex-row');
      div.id = 'div' + actualDiv100;
      document.querySelector("#hundred_plus").appendChild(div);
    }

    document.querySelector("#hundred_plus").querySelector(`#div${actualDiv100}`).appendChild(Contributors(contributor));
  });

  let actualDiv200;
  contributors["200"].forEach((contributor, index) => {
    if(index === 0 || index % 6 === 0) {
      actualDiv200 = index;
      const div = document.createElement('div');
      div.classList.add('d-flex');
      div.classList.add('flex-row');
      div.id = 'div' + actualDiv200;
      document.querySelector("#two_hundred_plus").appendChild(div);
    }

    document.querySelector("#two_hundred_plus").querySelector(`#div${actualDiv200}`).appendChild(Contributors(contributor));
  });

  let actualDiv500;
  contributors["500"].forEach((contributor, index) => {
    if(index === 0 || index % 6 === 0) {
      actualDiv500 = index;
      const div = document.createElement('div');
      div.classList.add('d-flex');
      div.classList.add('flex-row');
      div.id = 'div' + actualDiv500;
      document.querySelector("#five_hundred_plus").appendChild(div);
    }

    document.querySelector("#five_hundred_plus").querySelector(`#div${actualDiv500}`).appendChild(Contributors(contributor));
  });

  const issues = [...response.issues, ...response.closed_issues];

  issues.forEach(issue => {
    const { title, html_url, state } = issue;
    const { login } = issue.user;
    document.querySelector('#issues').appendChild(Issue({title, login, html_url, state}));
  });

  document.querySelector('#btn_filter_open').addEventListener('click', e => {
    const issues = document.querySelector('#issues').getElementsByTagName('li');
    const button = e.currentTarget;
    for(let issue of issues) {
      const state = issue.getElementsByTagName('span')[0].innerHTML;
      if(button.innerHTML == 'Hide open') {
        if(state === 'open') {
          issue.style = 'display: none';
        }
      } else {
        issue.style = 'display: flex';
      }
    }

    if(button.innerHTML === 'Hide open') {
      button.innerHTML = 'Show open';
    } else {
      button.innerHTML = 'Hide open';
    }
  })

  document.querySelector('#btn_filter_closed').addEventListener('click', e => {
    const issues = document.querySelector('#issues').getElementsByTagName('li');
    const button = e.currentTarget;
    for(let issue of issues) {
      const state = issue.getElementsByTagName('span')[0].innerHTML;
      if(button.innerHTML == 'Hide closed') {
        if(state === 'closed') {
          issue.style = 'display: none';
        }
      } else {
        issue.style = 'display: flex';
      }
    }

    if(button.innerHTML === 'Hide closed') {
      button.innerHTML = 'Show closed';
    } else {
      button.innerHTML = 'Hide closed';
    }
  })
};

async function loadData(repoName) {
  const [repository, issues, closed_issues, contributors] = await Promise.all([
    api.get(`/repos/${repoName}`),
    api.get(`/repos/${repoName}/issues`),
    api.get(`/repos/${repoName}/issues?state=closed`),
    api.get(`/repos/${repoName}/contributors?per_page=300`)
  ]);

  return {
    repository: repository.data,
    issues: issues.data,
    closed_issues: closed_issues.data,
    contributors: contributors.data
  }
}
