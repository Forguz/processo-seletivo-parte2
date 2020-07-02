export default /*html*/
`
  <a class="btn btn-outline-primary btn-lg" href="/">
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
    voltar
  </a>
  <div id="image_container" class="d-flex mt-5">
    <div class="text-center align-self-center">
      <div class="spinner-border" style="width: 60px; height: 60px;" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <h1>Contribuidores</h1>
    <h4>100 - 199</h4>
    <div id="hundred_plus">
    </div>
    <h4>200 - 499</h4>
    <div id="two_hundred_plus"></div>
    <h4>+500</h4>
    <div id="five_hundred_plus"></div>
  </div>
  <div class="d-flex flex-row m-b-5 justify-content-between">
    <h1>Issues</h1>
    <div>
      <button id="btn_filter_open" class="btn btn-success btn-lg">Hide open</button>
      <button id="btn_filter_closed" class="btn btn-danger btn-lg">Hide closed</button>
    </div>
  </div>
  <div id="issues" class="mt-5">
  </div>
`;
