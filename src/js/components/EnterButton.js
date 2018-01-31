import Component from './Component'

export default class EnterButton extends Component {
  constructor (state, enterAction) {
    super(state)

    this._button = document.createElement('button')
    this._container.appendChild(this._button)

    this._button.addEventListener('click', enterAction)
  }

  render () {
    const button = this._button
    const state = this._state

    this.visible = (state.status === 'pending')
    button.textContent = 'Enter'

    super.render()
  }
}
