import { Ball } from "./Ball.js";
import { Paddle } from "./Paddle.js";

export class Pong {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.aspectRatio = 4 / 3;

    this.keys = {};

    this.paddleSpeed = 10;
    this.ballSpeed = 2.5;
    this.running = true;
  }

  #resize() {
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;

    let newHeight = viewportHeight;
    let newWidth = this.aspectRatio * viewportWidth;

    if (newWidth > viewportWidth) {
      newWidth = viewportWidth;
      newHeight = newWidth / this.aspectRatio;
    }

    if (newHeight > viewportHeight) {
      newHeight = viewportHeight;
      newWidth = this.aspectRatio * newHeight;
    }

    this.canvas.height = newHeight;
    this.canvas.width = newWidth;
  }

  init() {
    this.canvas.style.display = "block";

    window.addEventListener("resize", () => {
      this.#resize();
    });

    this.#resize();

    this.context = this.canvas.getContext("2d");
  }

  start() {
    this.paddle1 = new Paddle(this.context, { x: 40, y: 40, height: 100 });
    this.paddle2 = new Paddle(this.context, {
      x: this.canvas.width - 40,
      y: 40,
      height: 100,
    });

    this.ball = new Ball(this.context, {
      x: this.canvas.width / 2 - 4,
      y: Math.floor(Math.random() * this.canvas.height),
      width: 8,
      height: 8,
      vX: Math.random() < 0.5 ? -this.ballSpeed : this.ballSpeed,
      vY: Math.random() < 0.5 ? -this.ballSpeed : this.ballSpeed,
    });

    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;

      if (e.key == "Escape") this.running = !this.running;
    });

    this.#update();
  }

  #update() {
    requestAnimationFrame(() => {
      this.#update();
    });

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // center line
    this.context.setLineDash([
      this.canvas.height / 25,
      this.canvas.height / 25,
    ]);
    this.context.beginPath();
    this.context.moveTo(this.canvas.width / 2, 0);
    this.context.lineTo(this.canvas.width / 2, this.canvas.height);
    this.context.strokeStyle = "white";
    this.context.stroke();
    this.context.setLineDash([]);

    if (this.running) {
      // player1
      if (
        this.keys["s"] &&
        this.paddle1.pY + this.paddleSpeed <=
          this.canvas.height - this.paddle1.pHeight
      ) {
        this.paddle1.move({ y: this.paddleSpeed });
      } else if (this.keys["w"] && this.paddle1.pY - this.paddleSpeed >= 0) {
        this.paddle1.move({ y: -this.paddleSpeed });
      }

      // player2
      if (
        this.keys["ArrowDown"] &&
        this.paddle2.pY + this.paddleSpeed <=
          this.canvas.height - this.paddle2.pHeight
      ) {
        this.paddle2.move({ y: this.paddleSpeed });
      } else if (
        this.keys["ArrowUp"] &&
        this.paddle2.pY - this.paddleSpeed >= 0
      ) {
        this.paddle2.move({ y: -this.paddleSpeed });
      }

      // ball
      // TODO: refine collision checks and overlap
      if (
        this.ball.bX >= this.paddle1.pX &&
        this.ball.bX <= this.paddle1.pX + this.paddle1.pWidth &&
        this.ball.bY >= this.paddle1.pY &&
        this.ball.bY <= this.paddle1.pY + this.paddle1.pHeight
      ) {
        this.ball.bounce("x");
      } else if (
        this.ball.bX >= this.paddle2.pX &&
        this.ball.bX <= this.paddle2.pX + this.paddle2.pWidth &&
        this.ball.bY >= this.paddle2.pY &&
        this.ball.bY <= this.paddle2.pY + this.paddle2.pHeight
      ) {
        this.ball.bounce("x");
      } else if (this.ball.bY <= 0 && this.ball.bVY < 0) {
        this.ball.bounce("y");
      } else if (
        this.ball.bY >= this.canvas.height - this.ball.bHeight &&
        this.ball.bVY > 0
      ) {
        this.ball.bounce("y");
      } else if (this.ball.bX <= 0 && this.ball.bVX < 0) {
        this.ball.bounce("x");
      } else if (
        this.ball.bX >= this.canvas.width - this.ball.bWidth &&
        this.ball.bVX > 0
      ) {
        this.ball.bounce("x");
      }

      this.ball.move();
    }

    this.paddle1.draw();
    this.paddle2.draw();
    this.ball.draw();
  }
}
