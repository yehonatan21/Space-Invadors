'use strict';

export class Enemy {
  constructor(x_pos, y_pos, canvasWidth) {
    this.direction = 0;
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.canvasWidth = canvasWidth;
    const image = new Image();
    image.onload = () => {
      this.image = image;
      this.width = image.width;
      this.height = image.height;
    };
    image.src = './img/invader.png';
  }

  draw(ctx) {
    this.x_pos += this.direction;
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.x_pos,
        this.y_pos,
        this.width,
        this.height
      );
    }
    if (this.x_pos <= 0 || this.x_pos + this.width >= this.canvasWidth) {
      this.direction = -this.direction;
    }
  }
}