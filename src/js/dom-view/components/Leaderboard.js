import Component from './Component'

export default class Leaderboard extends Component {
  constructor (state, appContainer) {
    super(state, appContainer)
    this.state = state
  }

  render () {
    const cnt = this._container
    const state = this._state

    this.clearCnt()
    state.leaderboard.groups.forEach((group) => {
      const inner = document.createElement('inner')

      inner.className = 'component-container inner'
      inner.textContent = '--------------------'
      group.forEach((part) => {
        const span = document.createElement('span')
        const text = `${part.place}. ${part.displayName} ${part.points}`

        span.textContent = text

        inner.appendChild(span)
      })

      cnt.appendChild(inner)
    })

    this.visible = (state.status === 'active')

    super.render()
  }

  clearCnt () {
    this._container.textContent = '-----------Leaderboard-----------'
  }
}
