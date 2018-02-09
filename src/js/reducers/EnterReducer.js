export default function EnterReducer(state = [], action) {
  const newState = [];

  state.forEach((t, i) => {
    if(t.id === action.payload) 
      t = t.set('enterRequested', true);

      newState[i] = t;
  });

  return newState;
}