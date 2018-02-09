import {get, initDebug} from './extra/util'
import reducers from './reducers/index'
import {thunkActions} from './actions/index'
import View from './View'
import Timer from './extra/Timer'
import Store from './Store'

class App {
  constructor (data) {
    this._initStore(data)
    this.view = new View(data, this.store) // create view
    this.timer = new Timer(this.store)

    initDebug(data, this.store, {timer: this.timer})
  }

  _initStore (data) {
    const store = this.store = new Store(data)

    store.addReducers(reducers)
    store.addThunkActions(thunkActions)
    store.init()
  }
}

document.addEventListener('DOMContentLoaded', () => get((data) => new App(data)))
