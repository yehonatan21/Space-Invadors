'use strict';

export class Shot {
    constructor(x_pos, y_pos, speed, color,ctx) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.radius = 3;
        this.speed = speed;
        this.color = color
        this.ctx = ctx;
    };

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x_pos, this.y_pos, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.closePath();
        this.ctx.fill();
    }

    update() {
        this.draw();
        this.y_pos += this.speed;
    }
}