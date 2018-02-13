import {get, initDebug, createPIXIRenderer} from './extra/util'
import AppDOM from './AppDOM'
import App from './App'

const init = (data) => {
  const app = new App(data)

  createPIXIRenderer(app.container);

  return app;
};
const initDOM = (data) => new AppDOM(data);

export {
  init,
  initDOM,
  get
};
