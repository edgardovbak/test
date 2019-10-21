export default class View {
  static colors = {
    '1': 'red',
    "2": "green", 
    "3": "blue",
    "4": "yellow",
    "5": "orange",
    "6": "cyan",
    "7": "purple"
  }

  constructor(element, width, height, rows, columns) {
    this.element = element
    this.width = width
    this.height = height

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.context = this.canvas.getContext('2d')

    this.playFieldBorderWidth = 4;
    this.playFieldX = this.playFieldBorderWidth;
    this.playFieldY = this.playFieldBorderWidth;
    this.playFieldWidth = this.width;
    this.playFieldHeight = this.height;
    this.playFieldInnerWidth = this.playFieldWidth - this.playFieldBorderWidth * 2;
    this.playFieldInnerHeight = this.playFieldHeight - this.playFieldBorderWidth * 2;

    this.blockWidth = this.playFieldInnerWidth / columns;
    this.blockHeight = this.playFieldInnerHeight / rows;

    this.element.appendChild(this.canvas);
  }
  
  renderMainScreen(state) {
    this.clearScreen()
    this.renderPlayField(state)
  }

  clearScreen () {
    this.context.clearRect(0,0, this.width, this.height)
  }

  renderPlayField ({playField, point, showPoint}) {
    for (let y = 0; y < playField.length; y++) {
      const line = playField[y];
      
      for (let x = 0; x < line.length; x++) {
        const block = line[x];
        
        if (block) {
          this.renderBlock(
            this.playFieldX + (x * this.blockWidth), 
            this.playFieldY + (y * this.blockHeight), 
            this.blockWidth, 
            this.blockHeight,
            View.colors[block] 
          )
        }
      }

      this.context.strokeStyle = "white";
      this.context.lineWidth = this.playFieldBorderWidth;
      this.context.strokeRect(0,0, this.playFieldWidth, this.playFieldHeight)
    }

    if (showPoint) {
      this.renderBlock(
        this.playFieldX + (point.x * this.blockWidth), 
        this.playFieldY + (point.y * this.blockHeight), 
        this.blockWidth, 
        this.blockHeight,
        View.colors[2] 
      )
    }
    

    this.context.strokeStyle = "white";
    this.context.lineWidth = this.playFieldBorderWidth;
    this.context.strokeRect(0,0, this.playFieldWidth, this.playFieldHeight)
  }

  renderBlock( x, y, width, height, color) {
    this.context.fillStyle = color
    this.context.strokeStyle = "#040404"
    this.context.lineWidth = 2;

    this.context.fillRect(x,y, width,height)
    this.context.strokeRect(x,y, width,height)
  }
}