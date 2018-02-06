const ALLOWED_ACTIONS = ['update', 'init']
const integrateLocalState = (store) => (next) => (action) => {
  if (ALLOWED_ACTIONS.indexOf(action.type) < 0) return next(action)

  const stored = JSON.parse(localStorage.getItem('viewed-tournaments')) || [];

  action.state.forEach((state) => state.viewed = stored.indexOf(state.id) > -1);

  return next(action);
};

export default integrateLocalState;
