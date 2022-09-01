'use strict';

export class Stars {
    constructor(canvas,ctx) {
        this.canvas = canvas;
        this.ctx = ctx
        this.stars = [];
        for (let i = 0; i < 500; i++) {
            this.stars.push({
                x: (Math.floor(Math.random() * this.canvas.width)),
                y: (Math.floor(Math.random() * this.canvas.height)),
                r: (Math.random() * 2)
            });
        }
    };

    draw() {
        this.stars.forEach((star) => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.r , 0, 2 * Math.PI);
            this.ctx.fillStyle = "white";
            this.ctx.closePath();
            this.ctx.fill();
        })
    }

    update() {
        this.draw();
        this.stars.forEach((star) => {
            if(star.y >= this.canvas.height){
                star.y = 0;                
            }else{
            star.y += 0.4
            }
        })
    }
}