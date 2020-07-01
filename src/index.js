import 'bootstrap';
import '../node_modules/regenerator-runtime/runtime.js'
import './scss/index.scss';
import './/../node_modules/toastr/build/toastr.css';
import routes from './routes';
import App from './app';

let contentDiv = document.getElementById('content');
contentDiv.innerHTML = routes[window.location.pathname];

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
}

window.onload = App;
