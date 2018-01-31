import Component from './Component'

export default class Rewards extends Component {
  constructor (state) {
    super(state)
    this.state = state
  }

  render () {
    const cnt = this._container
    const state = this._state

    this.clearCnt()
    state.forEach((reward) => {
      const span = document.createElement('span')

      span.className = 'inner'
      span.innerText = `${String(reward.from).padStart(2, '0')}-${String(reward.to).padStart(2, '0')} => ${reward.symbol}${parseFloat(reward.amount, 10).toFixed(2).padStart(7, '0')}`
      cnt.appendChild(span)
    })

    super.render()
  }

  clearCnt () {
    this._container.innerText = '-----------Payouts-----------'
  }
}
