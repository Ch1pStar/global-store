export const createUpdateFromStringAction = ({dispatch, getState}) => (state) => {
  dispatch('update', JSON.parse(state).result)
}

export const createUpdateAction = ({dispatch, getState}) => (state) => {
  dispatch(update, state)
}
