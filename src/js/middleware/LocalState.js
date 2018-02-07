const ALLOWED_ACTIONS = ['update', 'init']
const integrateLocalState = (store) => (next) => (action) => {
  if (ALLOWED_ACTIONS.indexOf(action.type) < 0) return next(action)

  const stored = JSON.parse(window.localStorage.getItem('viewed-tournaments')) || []

  action.state.forEach((state) => state.viewed = stored.indexOf(state.id) > -1) // eslint-disable-line no-return-assign

  return next(action)
}

export default integrateLocalState
