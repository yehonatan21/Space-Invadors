'use strict';

export class Shot {
    constructor(x_pos, y_pos, speed, color) {
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.radius = 3;
        this.speed = speed;
        this.color = color
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x_pos, this.y_pos, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
        this.y_pos += this.speed;
    }
}