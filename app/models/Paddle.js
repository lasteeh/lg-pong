export class Paddle {
  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {object} options
   * @param {number} [x=40]
   * @param {number} [y=40]
   * @param {number} [width=8]
   * @param {number} [height=30]
   * @param {string} [color="white"]
   */
  constructor(
    context,
    { x = 0, y = 0, width = 8, height = 30, color = "white" } = {}
  ) {
    this.pContext = context;
    this.pColor = color;
    this.pWidth = width;
    this.pHeight = height;

    this.pX = x;
    this.pY = y;

    this.draw();
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @param {string} color
   */
  set({
    x = this.pX,
    y = this.pY,
    width = this.pWidth,
    height = this.pHeight,
    color = this.pColor,
  } = options) {
    this.pColor = color;
    this.pWidth = width;
    this.pHeight = height;

    this.pX = x;
    this.pY = y;
  }

  draw() {
    this.pContext.fillStyle = this.pColor;
    this.pContext.fillRect(this.pX, this.pY, this.pWidth, this.pHeight);
  }

  move({ x = 0, y = 0 } = {}) {
    this.pX += x;
    this.pY += y;
  }
}
