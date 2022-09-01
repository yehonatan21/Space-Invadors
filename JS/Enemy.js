'use strict';

export class Enemy {
  constructor(x_pos, y_pos, canvas, ctx) {
    this.speed = 0;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.canvas = canvas;
    this.ctx = ctx;
    const image = new Image();
    image.src = './img/invader.png';
    image.onload = () => {
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    };
  }

  draw() {
    if (this.image) {
      this.ctx.drawImage(
        this.image,
        this.x_pos,
        this.y_pos,
        this.width,
        this.height
      );
    }
  }

  update() {
    this.x_pos += this.speed;
    this.draw();
    if (this.x_pos <= 0 || this.x_pos + this.width >= this.canvas.width) {
      this.speed = -this.speed;
    }
  }
}