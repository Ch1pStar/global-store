const timeTick = ({dispatch, getState}) => (mutations) => {
  dispatch('timeTick', mutations)
}

export default timeTick
