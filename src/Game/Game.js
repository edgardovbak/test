export default class Game {
  constructor() {
    this.playField = this.createPlayfield(),
    this.activePosition = {
      x: 0,
      y: 0
    },
    this.snake = [{
        x: 0,
        y: 0
      },
      {
        x: 0,
        y: 0
      },
        {
        x: 0,
        y: 0
      }
    ]
  }

  getState() {
    const playField = this.createPlayfield()
    const snake = this.snake
    for (let i = 0; i < snake.length; i++) {
      playField[snake[i].y][snake[i].x] = 1  
    }
    return {
      playField
    }
  }

  updateSnake() {
    const snake = this.snake;
    const { x, y } = this.activePosition
    snake.pop()
    snake.unshift({
      x , y
    })
    this.snake = snake
  }

  hasCollision() {
    const { x, y } = this.snake[0]
    const length = this.playField.length
    if ( (x >= 0 && x < length && y >= 0 && y < length )) {
      return true
    }
    return false
  }

  createPlayfield() {
    const playField = [];
    for (let y = 0; y < 20; y++) {
      playField[y] = []
      
      for (let x = 0; x < 20; x++) {
        playField[y][x] = 0
      }
    }
    return playField;
  }

  moveDown() {
    this.activePosition.y += 1
    if ( !this.hasCollision()) {
      console.log("you die")
      this.activePosition.y -= 1
    }
    this.updateSnake()
  }

  moveUp() {
    this.activePosition.y -= 1
    if ( !this.hasCollision()) {
      console.log("you die")
      this.activePosition.y += 1
    }
    this.updateSnake()
  }

  moveLeft() {
    this.activePosition.x -= 1
    if ( !this.hasCollision()) {
      console.log("you die")
      this.activePosition.x += 1
    }
    this.updateSnake()
  }

  moveRight() {
    this.activePosition.x += 1
    if ( !this.hasCollision()) {
      console.log("you die")
      this.activePosition.x -= 1
    }
    this.updateSnake()
  }
}