export const createUpdateFromStringAction = (store) => (state) => {
  store.dispatch({type: 'update', state: JSON.parse(state).result})
}

export const createUpdateAction = (store) => (state) => {
  store.dispatch({type: 'update', state})
}
