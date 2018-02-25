import reducers from './reducers/index'
import {thunkActions} from './actions/index'
import View from './dom-view/View'
import Timer from './extra/Timer'
import Store from './Store'

export default class App {
  constructor (data) {
    this._initStore(data)
    this.view = new View(data, this.store) // create view
    this.timer = new Timer(this.store)
  }

  _initStore (data) {
    const store = this.store = new Store(data)

    store.addReducers(reducers)
    store.addThunkActions(thunkActions)
    store.init()
  }
}