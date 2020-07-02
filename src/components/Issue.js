export default function Issue({title, login, html_url, state}) {
  const issue = document.createElement('li');
  issue.classList.add('card');

  let statusEl = `<span class="badge badge-success">${state}</span>`;
  if(state === 'closed') {
    statusEl = `<span class="badge badge-danger">${state}</span>`;
  }

  issue.innerHTML = /*html*/
  `
    <a href=${html_url} style="text-decoration: none; color: black;" target="blank" class="card-body">
      <div style="display: flex;">
        <div class="d-flex p-2 flex-column justify-content-center" style="flex: 1">
          <h5 class="card-title">${title}</h5>
          <p class="card-text" id="repository_desc">${login}</p>
          ${statusEl}
        </div>
        <div class="d-flex p-2 flex-column justify-content-center">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>
    </a>
  `;

  return issue;
}
