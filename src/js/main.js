import {get, initDebug} from './extra/util'
import middleware from './middleware/index'
import reducers from './reducers/index'
import View from './View'
import {INIT} from './actions/index'
import Timer from './extra/Timer';
import Store from './Store';

function loaded (data) {
  const store = new Store(data);

  store.addReducers(reducers);
  store.init();

  const view = new View(data, store) // create view
  const timer = new Timer(store);

  initDebug(data, store, {timer})
}

document.addEventListener('DOMContentLoaded', () => get(loaded))
