import {get, initDebug} from './extra/util'
import AppDOM from './AppDOM'
import App from './App'

const init = (data) => new App(data);
const initDOM = (data) => new AppDOM(data);

export {
  init,
  initDOM,
  get,
  initDebug,
};
