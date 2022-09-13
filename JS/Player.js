'use strict';

import { Shot } from "./Shot.js";

export class Player {
  constructor(x_pos, y_pos) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.score = 0;
    this.rotate = 0;
    this.direction = 15;
    this.shots = [];
    this.lose = false;
    this.keys = {
      arrowLeft: {
        pressed: false
      },
      arrowRight: {
        pressed: false
      }
    };

    addEventListener('keydown', ({ key }) => {
      switch (key) {
        case 'ArrowLeft':
          this.keys.arrowLeft.pressed = true;
          break;

        case 'ArrowRight':
          this.keys.arrowRight.pressed = true;
          break;

        case ' ':
          this.shots.push(new Shot(this.x_pos + this.width / 2, this.y_pos, -15, 'red', this.ctx)); // FIXME: how create new shpt without passing the ctx 
          break;
      }
    });

    addEventListener('keyup', ({ key }) => {
      switch (key) {
        case 'ArrowLeft':
          this.keys.arrowLeft.pressed = false;
          break;

        case 'ArrowRight':
          this.keys.arrowRight.pressed = false;
          break;
      }
    });

    const image = new Image();
    image.onload = () => {
      const scale = 0.2;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.x_pos -= this.width / 2;
      this.y_pos -= this.height;
    };
    image.src = './img/spaceship.png';
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(
      this.x_pos + this.width / 2,
      this.y_pos + this.height / 2
    );
    ctx.rotate(this.rotate);
    ctx.translate(
      -this.x_pos - this.width / 2,
      -this.y_pos - this.height / 2
    );
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.x_pos,
        this.y_pos,
        this.width,
        this.height
      );
    }
    ctx.restore();

    if (this.keys.arrowLeft.pressed && this.x_pos >= 0) {
      this.x_pos -= this.direction;
      this.rotate = 25;
    } else if (this.keys.arrowRight.pressed && this.x_pos + this.width <= innerWidth) {
      this.x_pos += this.direction;
      this.rotate = -25;
    } else {
      this.rotate = 0;
    }
    this.shots.forEach((shot) => {
      shot.draw(ctx);
    })
  }
}