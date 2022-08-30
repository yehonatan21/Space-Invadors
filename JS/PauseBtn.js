'use strict';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

export class PauseBtn {
    constructor() {
        this.image = new Image();
        this.image.src = './img/pause.jpg';
        this.image.onload = () => {
            const scale = 0.4;
            this.width = this.image.width * scale;
            this.height = this.image.height * scale;
            this.x_pos = 0;
            this.y_pos = 10;
        };
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.x_pos,
            this.y_pos,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();
    }
    
     getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    
     isInside(pos) {
        return pos.x > this.x_pos &&
            pos.x < this.x_pos + this.width &&
            pos.y < this.y_pos + this.height &&
            pos.y > this.y_pos
    }
}