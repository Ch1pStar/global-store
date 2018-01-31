const timeTick = ({dispatch, getState}) => (mutations) => {
  dispatch({type: 'timeTick', mutations})
}

export default timeTick
