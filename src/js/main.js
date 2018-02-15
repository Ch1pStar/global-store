import {get, initDebug, loadAssets} from './extra/util'
import AppDOM from './AppDOM'
import App from './App'
import assets from './config/assets'

const init = (data) => new App(data);
const initDOM = (data) => new AppDOM(data);

export {
  init,
  initDOM,
  get,
  initDebug,
  assets,
  loadAssets,
};
