const enterTournament = ({dispatch, getState}, id=-1) => () => {
	if(id < 0) return;

	dispatch({type: 'enter', id});
};

export default enterTournament;
