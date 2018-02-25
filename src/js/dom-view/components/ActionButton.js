import Component from './Component'

export default class ActionButton extends Component {
  constructor (state, appContainer, action) {
    super(state, appContainer)

    this._firstTimeText = document.createElement('span')
    this._container.appendChild(this._firstTimeText)

    this._button = document.createElement('button')
    this._container.appendChild(this._button)

    this._button.addEventListener('click', action)
  }

  render () {
    const button = this._button
    const text = this._firstTimeText
    const state = this._state
    const isDisabled = Boolean(state.enterRequested)

    button.disabled = isDisabled

    this.visible = (state.status === 'pending')
    button.textContent = isDisabled ? 'Waiting' : 'Enter'

    text.style.display = state.viewed ? 'none' : 'inline'
    text.textContent = 'New Tournament Available!'

    super.render()
  }
}
