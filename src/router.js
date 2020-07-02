import Home from './pages/Home/HomeController';
import Repository from './pages/Repository/RepositoryController';

import Router from '@kodnificent/sparouter';

import HomeView from './pages/Home/HomeView';
import RepositoryView from './pages/Repository/RepositoryView';

const router = new Router({ historyMode: true });
const divContent = document.querySelector('#content');

router.get('/', function(req) {
  divContent.innerHTML = HomeView;
  Home(req);
});

router.get('/repository', function(req) {
  divContent.innerHTML = RepositoryView;
  Repository(req);
});

export default router;
