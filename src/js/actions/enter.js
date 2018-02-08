import {get} from '../util'


const enterTournament = (dispatch, id = -1) => () => {
  if (id < 0) return

  console.log('requesting next state...')

  // TODO send real request with tournament id
  get(async (state) => {
    dispatch({type: 'enterRequested', id})
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('got it...carry on')

    dispatch({type: 'update', state})
  }, 'src/mock/active.json')
}

let store = new Store();
store.getState();
store.dispatch('ENTER_TOURNAMENT', {id: 5});


class App {

}

let app1 = new App();
let app2 = new App();



class Requester {
  constructor (apiKey) {
    this._apiKey = apiKey;
  }

  request1() {
    fetch('asdasd', {apiKey: this._apiKey});
  }

  request2() {
    fetch('asdasd2', {apiKey: this._apiKey});
  }
}

class Repository {
  constructor (dbName) {
    this._db = new MySQL(dbName);
  }
}

class Person {
  constructor (name) {
    this._name = name;
  }
}

// ACTIVE RECORD:

let repo = new Repository();
let person = new Person(repo);
person.saveYourself();
person.saveYourselfInThisRepo(repo);

// DATA MAPPER:

let repo = new Repository();
let person = new Person();

person.setName(name);
repo.saveThisPerson(person);


const STATIC_BULLSHIT = {

}

class StaticBullshit {
  constructor () {

  }
}
const STATIC_BULLSHIT = (() => {

})();



let createRequester = (apiKey) => {
  return {
    _apiKey: 'asd',

    request1() {
      fetch('asdasd', {apiKey: this._apiKey});
    },

    request2() {
      fetch('asdasd2', {apiKey: this._apiKey});
    }
  }
}

let asdasdas = {};

var asdda;
window



class LeaderboardController {
  enter(id) {
    this._store.dispatch('ENTER_TOURNAMENT', {id: id});
  }
}


leaderboard.enter(100);
this._store.dispatch(Action.ENTER_TOURNAMENT, {id: 100});

store.dispatch('INITIATE', {local: localStorage.getItem('asd')});

store.addReducers({
  'ENTER_TOURNAMENT': {
    'notepad.text.asd.asd.asd': (state = {}, action) => action.text,

    'ahshsd.sdfds': (state = {}, action) => action.text
  },

  'LEAVE_TOURNAMENT': {
    'adssafdfgh': [

    ]
  }
});
store.addReducers({
  'ENTER_TOURNAMENT': {
    'notepad.text.asd.asd.asd': (state = {}, action) => action.text,
    'notepad.text.asd.asd': (state = {}, action) => action.text,
    'dfdghjk': (state = {}, action) => action.text,

    'ahshsd.sdfds': (state = {}, action) => action.text
  },

  'LEAVE_TOURNAMENT': {
    'adssafdfgh': [

    ]
  }
});

export default enterTournament
