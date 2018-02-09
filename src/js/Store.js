'use strict';

// import Redux from 'redux'
// import Immutable from 'seamless-immutable'
// import EventEmitter from 'eventemitter3'

const EventEmitter = window.EventEmitter3
const Redux = window.Redux;
const Immutable = window.Immutable;

/**
 * Redux store wrapper
 *
 * @extends EventEmitter
 */
export default class Store extends EventEmitter {
  /**
   * @param {Object} [state]
   * @param {Array.<function>} [middlewares]
   * @param {Array.<function>} [enhancers]
   */
  constructor(state = {}, middlewares = [], enhancers = []) {
    super();

    /**
     * @type {Array.<function>}
     * @private
     */
    this._middlewares = middlewares;

    /**
     * @type {function}
     * @private
     */
    this._middleware = Redux.applyMiddleware(...this._middlewares);

    /**
     * @type {Array.<function>}
     * @private
     */
    this._enhancers = enhancers;

    /**
     * @type {function}
     * @private
     */
    this._enhancer = Redux.compose(this._middleware, ...this._enhancers);

    /**
     * @type {Object.<string,Object.<string,Array.<function>>>}
     * @private
     */
    this._reducers = {};

    /**
     * @type {Object.<string,function>}
     * @private
     */
    this._thunkActions = {};

    /**
     * @type {Object}
     * @private
     */
    this._store = null;

    this._initialState = Immutable(state || {});

    this.dispatch = this.dispatch.bind(this);
    this.getState = this.getState.bind(this);
  }

  /**
   * Init store. after this you can't add middlewares and enhancers.
   */
  init() {
    if (this._store) throw new Error('Store is already initiated, you cannot initiate it twice.');

    this._store = Redux.createStore(this._reducer.bind(this), this._initialState, this._enhancer);
  }

  //noinspection InfiniteRecursionJS
  /**
   * @param {string} [type]
   * @param {Object} payload
   * @return {*}
   */
  dispatch(type, payload) {
    if (!this._store) throw new Error('Store is not initiated yet. You cannot dispatch actions before calling init.');

    let action = null;

    if (arguments.length === 1) {
      if (typeof type === 'string') action = {type};
      else action = arguments[0];
    } else {
      action = {type, payload};
    }

    if (!action) throw new Error('Invalid dispatch arguments.');
    if (typeof action.type !== 'string') throw new Error('Actions must have a type and it must be a string.');

    if (this._thunkActions.hasOwnProperty(type)) {
      return this._thunkActions[type](action, this.dispatch, this.getState);
    }

    return this._store.dispatch(action);
  }

  /**
   * @return {*}
   */
  getState() {
    if (!this._store) throw new Error('Store is not initiated yet. You cannot get state before calling init.');

    return this._store.getState.apply(this._store, arguments);
  }

  /**
   * @return {*}
   */
  subscribe() {
    if (!this._store) throw new Error('Store is not initiated yet. You cannot subscribe before calling init.');

    return this._store.subscribe.apply(this._store, arguments);
  }

  /**
   * @param {string} action
   * @param {string} [path]
   * @param {function} reducer
   */
  addReducer(action, path, reducer) {
    if (arguments.length === 2) {
      reducer = arguments[1];
      path = '';
    }

    path = (path || '*') + '';

    this._reducers[action] = this._reducers[action] || {};
    this._reducers[action][path] = this._reducers[action][path] || [];
    this._reducers[action][path].push(reducer);
  }

  /**
   * @param {string} action
   * @param {string} [path]
   * @param {function} reducer
   */
  removeReducer(action, path, reducer) {
    if (arguments.length === 2) {
      reducer = arguments[2];
      path = '';
    }

    path = (path || '*') + '';

    if (!this._reducers[action] || !this._reducers[action][path]) return;

    let index = this._reducers[action][path].indexOf(reducer);
    if (index !== -1) this._reducers[action][path].splice(index, 1);
  }

  /**
   * @param {Object.<string,Object.<string,Array.<function>|function>>} reducers
   */
  addReducers(reducers) {
    Object.keys(reducers).forEach(action => {
      Object.keys(reducers[action]).forEach(path => {
        this._reducers[action] = this._reducers[action] || {};
        this._reducers[action][path] = this._reducers[action][path] || [];
        this._reducers[action][path] = this._reducers[action][path].concat(reducers[action][path]);
      });
    });
  }

  /**
   * @param {Object.<string,Object.<string,Array.<function>|function>>} reducers
   */
  removeReducers(reducers) {
    Object.keys(reducers).forEach(action => {
      Object.keys(reducers[action]).forEach(path => {
        if (!this._reducers[action] || !this._reducers[action][path]) return;

        reducers[action][path].forEach(reducer => {
          let index = this._reducers[action][path].indexOf(reducer);
          if (index !== -1) this._reducers[action][path].splice(index, 1);
        });
      });
    });
  }

  /**
   * @param {Object.<string,function>} actions
   */
  addThunkActions(actions) {
    Object.keys(actions).forEach(type => this._thunkActions[type] = actions[type]);
  }

  /**
   * @param {Object.<string,function>|Array.<string>} actions
   */
  removeThunkActions(actions) {
    if (Array.isArray(actions)) actions.forEach(type => delete this._thunkActions[type]);
    else Object.keys(actions).forEach(type => delete this._thunkActions[type]);
  }

  /**
   * @param {function} middleware
   * @param {number|null} [index]
   * @returns {Store}
   */
  addMiddleware(middleware, index = null) {
    if (this._store) throw new Error('Store is already initiated, you cannot add middleware.');

    if (index === null) this._middlewares.push(middleware);
    else this._middlewares.splice(index, 0, middleware);

    this._middleware = Redux.applyMiddleware(...this._middlewares);
    this._enhancer = Redux.compose(this._middleware, ...this._enhancers);

    return this;
  }

  /**
   * @param {function} enhancer
   * @param {number|null} [index]
   * @returns {Store}
   */
  addEnhancer(enhancer, index = null) {
    if (this._store) throw new Error('Store is already initiated, you cannot add enhancers.');

    if (index === null) this._enhancers.push(enhancer);
    else this._enhancers.splice(index, 0, enhancer);

    this._middleware = Redux.applyMiddleware(...this._middlewares);
    this._enhancer = Redux.compose(this._middleware, ...this._enhancers);

    return this;
  }

  /**
   * @param {Object} state
   * @param {Object} action
   * @param {Object} action.type
   * @private
   */
  _reducer(state, action) {
    let reducers = this._reducers['*'];
    if (reducers) state = this._reduce(reducers, state, action);

    reducers = this._reducers[action.type];
    if (reducers) state = this._reduce(reducers, state, action);

    this.emit('*', action, state);
    this.emit(action.type, action, state);

    return state;
  }

  /**
   * @param {Object} reducers
   * @param {Object} state
   * @param {Object} action
   * @returns {Object}
   * @private
   */
  _reduce(reducers, state, action) {
    return Object.keys(reducers).reduce((state, path) => reducers[path].reduce((state, reducer) => {
      if (path === '*') return Immutable(reducer(state, action));

      let arr = path.split('.');
      let local = arr.reduce((state, key) => state ? state[key] : state, state);

      return state.setIn(arr, Immutable(reducer(local, action)));
    }, state), state);
  }

  /**
   * @returns {*}
   */
  get state() {
    if (!this._store) throw new Error('Store is not initiated yet. You cannot get state before calling init.');

    return this._store.getState();
  }
}



function createThunkAction(type, fn) {
  return (action, dispatch, getState) => {
    fn(action.payload, dispatch, getState);
  };
}

function createAsyncAction(type, fn) {
  return createThunkAction(type, (payload, dispatch, getState) => {
    dispatch({type: type + '_START', payload: payload});
    fn(payload, (error, result) => {
      if (typeof error === 'undefined') error = null;
      if (typeof result === 'undefined') result = null;
      return dispatch({type: type + '_END', payload: {error, result}, payloadStart: payload});
    }, dispatch, getState);
  })
}

function createServerAction(type, options) {
  let {url, request, response, validate, callback} = (options || {});
  return createAsyncAction(type, (data, cb, dispatch) => {
    let requestData = data;
    let urlRequest = (typeof url === 'function') ? url(data) : url;
    if (request) data = request(data);
    if (validate) {
      let error = validate(data);
      if (error) {
        if (typeof callback === 'function') callback(error, null, null, requestData, dispatch);
        return cb(error);
      }
    }
    Server.request(urlRequest, data, (error, result) => {
      if (response) result = response(result);
      if (error) {
        if (typeof callback === 'function') callback(error, result);
        return cb(error, result, requestData, dispatch);
      }
      let data = {result, entities: {}};
      if (result && normalizeConfig) {
        data = normalize(result, normalizeConfig);
        dispatch('REPOSITORY_LOAD_DATA', {data});
      }
      if (typeof callback === 'function') callback(error, data.result, data.entities, requestData, dispatch);
      cb(error, data.result);
    });
  });
}

function createAction(type, config) {
  if (config.type === 'async') {
    if (!config.fn) console.error('Action defined as async without a fn.', config);
    return createAsyncAction(type, config.fn || ((payload, callback) => callback()));
  } else if (config.type === 'server') {
    if (!config.url) console.error('Action defined as server without a url.', config);
    return createServerAction(type, config);
  } else {
    if (!config.fn) console.error('Action defined as thunk without a fn.', config);
    return createThunkAction(type, config.fn);
  }
}
