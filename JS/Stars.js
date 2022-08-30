'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight - 4; //FIXME
canvas.width = window.innerWidth;

export class Stars {
    constructor() {
        this.stars = [];
        for (let i = 0; i < 500; i++) {
            this.stars.push({
                x: (Math.floor(Math.random() * canvas.width)),
                y: (Math.floor(Math.random() * canvas.height)),
                r: (Math.random() * 2)
            });
        }
    };

    draw() {
        this.stars.forEach((star) => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r , 0, 2 * Math.PI);
            ctx.fillStyle = "white";
            ctx.closePath();
            ctx.fill();
        })
    }

    update() {
        this.draw();
        this.stars.forEach((star) => {
            if(star.y >= canvas.height){
                star.y = 0;                
            }else{
            star.y += 0.4
            }
        })
    }
}