import Component from './Component'

export default class Leaderboard extends Component {
  constructor (state) {
    super(state)
    this.state = state
  }

  render () {
    const cnt = this._container
    const state = this._state

    this.clearCnt()
    state.groups.forEach((group) => {
      const inner = document.createElement('inner')

      inner.className = 'component-container inner'
      inner.innerText = '--------------------'
      group.forEach((part) => {
        const span = document.createElement('span')
        const text = `${part.place}. ${part.displayName} ${part.points}`

        span.innerText = text

        inner.appendChild(span)
      })

      cnt.appendChild(inner)
    })

    super.render()
  }

  clearCnt () {
    this._container.innerText = '-----------Leaderboard-----------'
  }
}
