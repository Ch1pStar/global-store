import {get, initDebug} from './extra/util'
// import App from './AppDOM'
import App from './App'

const init = (data) => new App(data);

export default init;

document.addEventListener('DOMContentLoaded', () => get((data) => window.a = new App(data)))
