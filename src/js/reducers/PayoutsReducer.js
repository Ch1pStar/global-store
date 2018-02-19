export function expandPayouts (state = [], action) {
  const newState = []

  state.forEach((t, i) => {
  	if(t.id !== action.payload) return newState[i] = state;

  	newState[i] = t.set('modal', {
  		type: 'payouts',
  		wasOpened: false,
  		wasClosed: false,
  	});
  })

  return newState
}

export function payoutsShown (state = [], action) {
  const newState = []

  state.forEach((t, i) => {
  	if(t.id !== action.payload) return newState[i] = state;

  	newState[i] = t.set('modal', {
  		type: 'payouts',
  		wasOpened: true,
  		wasClosed: false,
  	});
  })

  return newState
}

export function colapsePayouts (state = [], action) {
  const newState = []

  state.forEach((t, i) => {
  	if(t.id !== action.payload) return newState[i] = state;

  	newState[i] = t.set('modal', {
  		type: 'payouts',
  		wasOpened: true,
  		wasClosed: true,
  	});
  })

  return newState
}
