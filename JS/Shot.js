'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

export class Shot {
    constructor(x_pos, y_pos) {
        this.x_pos = x_pos ;
        this.y_pos = y_pos;
        this.radius = 3;
        this.speed = -10;
    };

    draw() {
        ctx.beginPath();
        ctx.arc(this.x_pos, this.y_pos, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.closePath();
        ctx.fill();
    }

    update() {
        this.draw();
        this.y_pos += this.speed;
    }
}