'use strict';

import { Shot } from "./Shot.js";
import { getWidthOfText } from "./main.js"

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

export class Player {
  constructor() {
    this.x_pos;
    this.y_pos;
    this.score = 0;
    this.speed = 15;
    this.shots = [];
    this.lose = false;
    this.play = true;
    this.BICHYOUN = 'יש לי בכיון '
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
          this.shots.push(new Shot(this.x_pos + this.width / 2, this.y_pos, -15, 'red'));
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
    image.src = './img/spaceship.png';
    image.onload = () => {
      const scale = 0.2;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;
      this.x_pos = canvas.width / 2 - this.width / 2;
      this.y_pos = canvas.height - this.height;
    };
  }

  draw() {
    if (this.image) {
      ctx.drawImage(
        this.image,
        this.x_pos,
        this.y_pos,
        this.width,
        this.height
      );
    }
  }

  update() {
    this.draw();
    if (this.keys.arrowLeft.pressed && this.x_pos >= 0) {
      this.x_pos -= this.speed;
    } else if (this.keys.arrowRight.pressed && this.x_pos + this.width <= innerWidth) {
      this.x_pos += this.speed;
    }
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + this.score, canvas.width - getWidthOfText(`Score: ${this.score} `, 'Arial', '20px'), 30);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(this.BICHYOUN, canvas.width - getWidthOfText(this.BICHYOUN, 'Arial', '20px'), 60);
  }
}