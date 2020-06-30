import routes from '../routes';

export default function pagePush(pathName) {
  const contentDiv = document.querySelector('#content');

  window.history.pushState(
    {},
    pathName,
    window.location.origin + pathName
  );
  contentDiv.innerHTML = routes[pathName];
}
