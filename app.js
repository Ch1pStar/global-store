'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const {Store} = require('react-redux-oop');
const Server = require('./Server');
const Model = require('./Model');
const Navigation = require('./Navigation');
const Notifier = require('./Notifier');
const Chat = require('./Chat');
const Pushpad = require('./Pushpad');
const Tracker = require('./Tracker');
const Provider = require('react-redux').Provider;
const {AppContainer} = require('react-hot-loader');
class App {
    constructor() {
        /**
         * @type {Store}
         * @private
         */
        this._store = new Store({});
        /**
         * @type {Navigation}
         * @private
         */
        this._nav = new Navigation(this._store);
        /**
         * @type {Number}
         * @private
         */
        this._id = parseInt(Math.random() * 10000000);
        //
        if (process.env.NODE_ENV !== 'production') this._setupDevTools();
        else {
            console.log = () => {};
            console.group = () => {};
            console.groupCollapsed = () => {};
            console.groupEnd = () => {};
        }
        Model.Reducers.forEach(r => this._store.addReducers(r));
        Model.ThunkActions.forEach(a => this._store.addThunkActions(a));
        if (module.hot) {
            module.hot.accept('./RootView', () => this.renderTo(this._node));
            module.hot.accept('./Model', () => {
                let ModelUpdate = require('./Model');
                this._store.clearReducers();
                ModelUpdate.Reducers.forEach(r => this._store.addReducers(r));
                ModelUpdate.ThunkActions.forEach(a => this._store.addThunkActions(a));
                this._store.refreshReducers();
                // This way we can reload all actions too:
                this.renderTo(this._node);
            });
        }
    }
    /**
     * @param {Object} config
     * @param {string} config.csrf
     * @param {number} config.time
     * @param {Object} config.notifier
     * @param {Object} config.chat
     * @param {Object} config.mixpanel
     * @param {Object} config.pushpad
     */
    init(config) {
        this._time = config.time;
        // console.warn('Server time:', this._time);
        this._store.init();
        this._store.subscribe(this._stateHandler.bind(this));
        this._store.dispatch('APP_INIT');
        if (!App.isPHP) setTimeout(() => {
            if (this._getCookiesOK()) this._store.dispatch('NOTIFICATIONS_COOKIES_OK_END');
            else this._store.dispatch('NOTIFICATIONS_COOKIES_ASK');
            if (config.notifier) {
                /**
                 * @type {Notifier}
                 * @private
                 */
                this._notifier = new Notifier(
                    {
                        host: config.notifier.host,
                        port: config.notifier.port,
                        ssl: !!config.notifier.ssl,
                        time: this._time
                    },
                    this._store.dispatch,
                    this._store.getState,
                    () => this._nav.repeat(),
                    this._configHandler.bind(this),
                    this._refreshHandler.bind(this)
                );
                this._notifier.connect();
            }
            if (config.chat) {
                /**
                 * @type {Chat}
                 * @private
                 */
                this._chat = new Chat(
                    {
                        host: config.chat.host,
                        port: config.chat.port,
                        ssl: !!config.chat.ssl,
                        time: this._time
                    },
                    this._store.dispatch,
                    this._store.getState
                );
                this._chat.connect();
                this._store.addThunkActions({
                    CHAT_SEND: ({payload}) => {
                        let {type, key, message} = payload;
                        this._chat.send(type, key, message);
                    }
                });
            }
            if (config.pushpad) {
                /**
                 * @type {Pushpad}
                 * @private
                 */
                this._pushpad = new Pushpad(
                    {
                        projectId: config.pushpad.projectId,
                        uid: config.pushpad.uid,
                        uidSignature: config.pushpad.uidSignature
                    },
                    this._store.dispatch
                );
                this._pushpad.init();
                this._store.addThunkActions({
                    NOTIFICATIONS_SUBSCRIBE: () => {
                        this._pushpad.subscribe();
                    }
                });
            }
            if (config.mixpanel) {
                Tracker.identify((config['user'] && config['user']['trackId']) ? config['user']['trackId'] : null);
                Tracker.init(config.mixpanel);
            }
        }, 5);
        this._nav.start(config);
    }
    render() {
        let RootView = require('./RootView');
        return React.createElement(AppContainer, {
            children: React.createElement(Provider, {
                store: this._store,
                children: React.createElement(RootView)
            }),
            errorReporter: ({error}) => {throw error}
        });
    }
    renderTo(node) {
        this._node = node;
        ReactDOM.render(this.render(), node);
    }
    /**
     * @private
     */
    _setupDevTools() {
        this._store.addMiddleware(require('redux-immutable-state-invariant')());
        this._store.addMiddleware(require('redux-logger')({collapsed: true, duration: true}));
        let matches = window.location.href.match(/[?&]_debug=([^&]+)\b/);
        let session = (matches && matches.length) ? matches[1] : null;
        let devTools = null;
        if (window['devToolsExtension']) devTools = window['devToolsExtension']();
        if (devTools) this._store.addEnhancer(devTools);
        if (session) this._store.addEnhancer(require('redux-devtools').persistState(session));
    }
    /**
     * @private
     */
    _stateHandler() {
        let state = this._store.state;
        if (!state) return console.warn('EMPTY STATE');
        state && state.account && this._pushpad && this._pushpad.identify(state.account['username'], state.account['pushpadSignature']);
        state && !state.account && this._pushpad && this._pushpad.unidentify();
        if (state.location && state.location.active) {
            let {view, href, vars} = state.location.active;
            if (this._lastHref !== href) {
                this._lastHref = href;
                if (this._notifier) {
                    if (view === 'App-primary/Contest') this._notifier.subscribeContest(vars['contestId']);
                    else if (view === 'App-primary/Lobby') this._notifier.subscribeLobby('csgo');
                    else this._notifier.unsubscribe();
                }
            }
        }
    }
    /**
     * @param {Object} config
     * @private
     */
    _configHandler(config) {
        // TODO: handle new config in a better way
        console.warn('New config from server:', config);
        window.location.href = window.location + '';
    }
    /**
     * @private
     */
    _refreshHandler() {
        let refreshes = parseInt(sessionStorage.getItem('refreshes'));
        let refreshesTime = parseInt(sessionStorage.getItem('refreshes-time'));
        if (isNaN(refreshes)) refreshes = 0;
        if (isNaN(refreshesTime)) refreshesTime = 0;
        if (refreshesTime < Date.now() - 300000) refreshes = 0;
        if (refreshes > 20) return;
        sessionStorage.setItem('refreshes', (refreshes + 1) + '');
        sessionStorage.setItem('refreshes-time', Date.now() + '');
        window.location.href = window.location + '';
    }
    /**
     * @return {bool}
     * @private
     */
    _getCookiesOK() {
        if (typeof document === 'undefined') return true;
        let name = 'yamzu_cookies=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return true;
        }
        return false;
    }
    /**
     * @return {Store}
     */
    get store() {
        return this._store;
    }
}
module.exports = App;