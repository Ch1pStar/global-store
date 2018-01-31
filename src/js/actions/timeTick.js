const timeTick = ({dispatch, getState}) => (state) => {
	dispatch({type: 'timeTick', state});
};

export default timeTick;
