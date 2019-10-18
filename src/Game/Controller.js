export default class Controller {
  constructor( game, view ) {
    this.game = game
    this.view = view

    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.view.renderMainScreen(this.game.getState())
  }

  updateView() {
    console.log(321)
    const state = this.game.getState();
    this.view.renderMainScreen(state)
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 37:
        this.game.moveLeft()
        this.updateView()
        break;
      case 38:
        this.game.moveUp()
        this.updateView()
        break;
      case 39:
        this.game.moveRight()
        this.updateView()
        break;
      case 40:
        this.game.moveDown()
        this.updateView()
        break;
      default:
        break;
    }
  }
}