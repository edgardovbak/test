export default class Controller {
  constructor( game, view ) {
    this.game = game
    this.view = view
    this.isPlaying = false;
    this.intervalId = null;
    this.pointInterval = 0;

    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this));

    this.view.renderStartScreen()
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
    this.updateView()
  }

  startTimer() {
    const speed = 1000 - this.game.getState().level * 100
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update()
      }, speed > 0 ? speed : 300)
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
    this.updateView()
    this.game.randomPoint()
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer()
    this.updateView()
    this.game.removePoint()
  }

  updateView() {
    const state = this.game.getState();
    if (state.isGameOver) {
      this.stopTimer()
      this.view.renderEndScreen(state);
    }  else if (!this.isPlaying) {
      this.view.renderPauseScreen()
    } else {
      this.view.renderMainScreen(state)
    }
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 37:
        this.stopTimer()
        this.game.moveLeft()
        this.updateView()
        break;
      case 38:
        this.stopTimer()
        this.game.moveUp()
        this.updateView()
        break;
      case 39:
        this.stopTimer()
        this.game.moveRight()
        this.updateView()
        break;
      case 40:
        this.stopTimer()
        this.game.moveDown()
        this.updateView()
        break;
      case 13:
        const state = this.game.getState()
        if (state.isGameOver) {
          this.reset()
        }else if (this.isPlaying) {
          this.pause()
        } else {
          this.play()
        }
        break;
      default:
        break;
    }
  }

  handleKeyUp(event) {
    console.log(213)
    switch (event.keyCode) {
      case 40:
      case 39:
      case 38:
      case 37:
          this.startTimer()
        break;
      default:
        break;
      }
  }
}