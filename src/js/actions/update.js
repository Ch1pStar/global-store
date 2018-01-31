export const createUpdateFromString = (store) => (state) => {
  store.dispatch({type: 'update', state: JSON.parse(state).result})
}