export default class Controller {
  constructor( game, view ) {
    this.game = game
    this.view = view
    this.isPlaying = false;
    this.intervalId = null;
    this.pointInterval = 0;

    document.addEventListener('keydown', this.handleKeyDown.bind(this))

    this.view.renderMainScreen(this.game.getState())
  }

  update() {
    const {left, right, up, down } = this.game.movement
    if ( !left ) {
      this.game.moveRight()
    } else if ( !right ) {
      this.game.moveLeft()
    } else if ( !up ) {
      this.game.moveDown()
    } else if ( !down ) {
      this.game.moveUp()
    }
    this.pointStatus()
    this.updateView()
  }

  pointStatus() {
    this.pointInterval += 1;
    if ( this.pointInterval > 5 ) {
      this.pointInterval = 0
      this.game.removePoint()
      this.game.randomPoint()
    }
  }

  startTimer() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update()
      }, 1000)
    }
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  play() {
    this.isPlaying = true;
    this.startTimer()
    this.updaeView()
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer()
    this.updaeView()
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.stopTimer()
    } else {
      this.view.renderMainScreen(state)
    }
    
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