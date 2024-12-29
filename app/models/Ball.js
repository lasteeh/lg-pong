export class Ball {
  constructor(
    context,
    {
      x = 0,
      y = 0,
      vX = 1,
      vY = 1,
      width = 5,
      height = 5,
      color = "white",
    } = {}
  ) {
    this.bContext = context;
    this.bX = x;
    this.bY = y;
    this.bVX = vX;
    this.bVY = vY;
    this.bWidth = width;
    this.bHeight = height;
    this.bColor = color;

    this.draw();
  }

  set({
    x = this.bX,
    y = this.bY,
    width = this.bWidth,
    height = this.bHeight,
    color = this.bColor,
  } = {}) {
    this.bColor = color;
    this.bWidth = width;
    this.bHeight = height;

    this.bX = x;
    this.bY = y;
  }

  move() {
    this.bX += this.bVX;
    this.bY += this.bVY;
  }

  bounce(direction) {
    if (direction == "x") this.bVX = -this.bVX;
    if (direction == "y") this.bVY = -this.bVY;
  }

  draw() {
    this.bContext.fillStyle = this.bColor;
    this.bContext.fillRect(this.bX, this.bY, this.bWidth, this.bHeight);
  }
}
