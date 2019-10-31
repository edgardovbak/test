export default class Game {
  constructor() {
    this.points = {
      '1': 10,
      '2': 30,
      '3': 50,
      '4': 70
    },
    this.playFieldLength = 20
    
    this.reset()
  }

  reset() {
    this.showPoint = false,
    this.isGameOver = false,
    this.point = {x: 15, y: 15},
    this.level = 0,
    this.score = 0,
    this.pointInterval = null,
    this.movement = {
      left: false,
      right: true,
      up: true,
      down: true
    }
    this.playField = this.createPlayfield(),
    this.activePosition = {
      x: 10,
      y: 10
    },
    this.snake = [{
        x: 10,
        y: 10
      },
      {
        x: 10,
        y: 10
      }
    ]
  }

  randomPoint() {
    this.showPoint = true
    let point = {
      x: Math.floor(Math.random() * this.playFieldLength),
      y: Math.floor(Math.random() * this.playFieldLength)
    }
    this.point = point
    if (!this.intervalId) {
      this.pointInterval = setInterval(() => {}, 5000)
    }
  }

  removePoint() {
    this.showPoint = false
    if (this.intervalId) {
      clearInterval(this.pointInterval)
    }
  }

  getState() {
    const playField = this.createPlayfield()
    const snake = this.snake
    for (let i = 0; i < snake.length; i++) {
      playField[snake[i].y][snake[i].x] = 1  
    }
    return {
      playField,
      showPoint: this.showPoint,
      point: this.point,
      isGameOver: this.isGameOver
    }
  }

  snakeGrow() {
    this.removePoint()
    const snake = this.snake
    this.updateScore(1)
    let snakePart = snake[snake.length - 1]
    snake.push(snakePart)
  }

  updateScore(pointNumber) {
    if (pointNumber > 0) {
      this.score += Game.points[pointNumber] * (this.level + 1);
    }
  }

  updateSnake() {
    const snake = this.snake
    const { x, y } = this.activePosition
    snake.pop()
    snake.unshift({
      x , y
    })
    this.snake = snake
  }

  hasCollision() {
    const { x, y } = this.activePosition
    const length = this.playField.length
    let snake = this.snake
    if ( (x >= 0 && x < length && y >= 0 && y < length )) {
      if ( x == this.point.x && y == this.point.y) {
        this.snakeGrow()
      }
      for (let i = 3; i < snake.length; i++) {
        if ( snake[i].x == x && snake[i].y == y ) {
          this.isGameOver = true
          return false
        }
      }
      return true
    }
    this.isGameOver = true
    return false
  }

  createPlayfield() {
    const playField = []
    for (let y = 0; y < this.playFieldLength; y++) {
      playField[y] = []
      
      for (let x = 0; x < this.playFieldLength; x++) {
        playField[y][x] = 0
      }
    }
    return playField
  }

  reinitDirections() {
    this.movement = {
      left: true,
      right: true,
      up: true,
      down: true
    }
  }

  movementDirections(item) {
    this.reinitDirections()
    switch (item) {
      case 'left':
        this.movement.right = false
      break
      case 'right':
        this.movement.left = false
      break
      case 'up':
        this.movement.down = false
      break
      case 'down':
        this.movement.up = false
      break
      default:
      break
    }
  }

  moveDown() {
    if ( this.movement.down) {
      this.activePosition.y += 1
      if ( !this.hasCollision()) {
        console.log("you die")
        this.activePosition.y -= 1
      }
      this.movementDirections('down')
      this.updateSnake()
    }
  }

  moveUp() {
    if ( this.movement.up) {
      this.activePosition.y -= 1
      if ( !this.hasCollision()) {
        console.log("you die")
        this.activePosition.y += 1
      }
      this.movementDirections('up')
      this.updateSnake()
    }
  }

  moveLeft() {
    if ( this.movement.left) {
      this.activePosition.x -= 1
      if ( !this.hasCollision()) {
        console.log("you die")
        this.activePosition.x += 1
      }
      this.movementDirections('left')
      this.updateSnake()
    }
  }

  moveRight() {
    if ( this.movement.right) {
      this.activePosition.x += 1
      if ( !this.hasCollision()) {
        console.log("you die")
        this.activePosition.x -= 1
      }
      this.movementDirections('right')
      this.updateSnake()
    }
  }
}