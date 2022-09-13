'use strict';

export class Stars {
    constructor(canvasHeight, canvasWidth) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.stars = [];
        for (let i = 0; i < 500; i++) {
            this.stars.push({
                x: (Math.floor(Math.random() * this.canvasWidth)),
                y: (Math.floor(Math.random() * this.canvasHeight)),
                r: (Math.random() * 2)
            });
        }
    };

    draw(ctx) {
        this.stars.forEach((star) => {
            if (star.y >= this.canvasHeight) {
                star.y = 0;
            } else {
                star.y += 0.4;
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.closePath();
            ctx.fill();
        })
    }
}