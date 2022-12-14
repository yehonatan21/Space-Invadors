'use strict';

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

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x_pos,
            this.y_pos,
            this.width,
            this.height
        );
    }
}