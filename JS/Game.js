'use strict';

import { Player } from "./Player.js";
import { Grid } from "./Grid.js";
import { PauseBtn } from "./PauseBtn.js";
import { Stars } from "./stars.js";

export class Game {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.canvas.height = window.innerHeight - 4; //FIXME:
        this.canvas.width = window.innerWidth;
        this.ctx = this.canvas.getContext('2d');
        this.player = new Player(this.canvas, this.ctx);
        this.grid = new Grid(17, 3, 10, this.canvas, this.ctx)
        this.pauseBtn = new PauseBtn(this.ctx); // FIXME: Add addEventListener to the pauseBtn
        this.stars = new Stars(this.canvas, this.ctx);
        this.play = true;
        this.BICHYOUN = 'יש לי בכיון ';
        // this.pauseBtn.addEventListener('click', function (event) {
        //     this.getMousePos(event);
        //     if(isInside()){
        //         this.play = false;
        //     }
        //   }, false)
    }

    updete() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score:" + this.player.score, this.canvas.width - this.getWidthOfText(`Score: ${this.player.score}`, '20px Arial'), 30);

        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.BICHYOUN, this.canvas.width - this.getWidthOfText(this.BICHYOUN, '20px Arial'), 60);
    };

    pauseGame(event) {
        const mousePos = this.getMousePos(event);
        if (this.isInside(mousePos, this.pauseBtn.x_pos, this.pauseBtn.width, this.pauseBtn.y_pos, this.pauseBtn.height)) {
            this.play = false;
        }
    }

    bichyoun(event) {
        const mousePos = this.getMousePos(event);
        if (this.isInside(mousePos,
            this.canvas.width - this.getWidthOfText(this.BICHYOUN, '20px Arial'),
            this.canvas.width - this.getWidthOfText(this.BICHYOUN, '20px Arial') + this.getWidthOfText(' יש לי בכיון', '20px Arial'),
            40,
            40
        ) && this.BICHYOUN == 'יש לי בכיון ') {
            this.BICHYOUN = "בזבזת את הבכיון "
            this.player.lose = false;
            this.grid.enemys = [];
            this.grid.createGrid();
        };
    };

    getWidthOfText(txt, font) {
        this.ctx.font = font;
        const { width } = this.ctx.measureText(txt);
        return width;
    };

    getHeightOfText(text, fontSize) {
        this.ctx.font = fontSize;
        this.ctx.fillText(text, -100, -100);
        const metrics = this.ctx.measureText(text);
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        return textHeight;
    };

    getMousePos(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    isInside(MousePos, x_pos, width, y_pos, height) {
        return MousePos.x > x_pos &&
            MousePos.x < x_pos + width &&
            MousePos.y > y_pos &&
            MousePos.y < y_pos + height
    };

    checkEnemyHit() {
        this.player.shots.forEach((shot, i) => {
            this.grid.enemys.forEach((enemy, j) => {
                if (shot.x_pos - shot.radius >= enemy.x_pos &&
                    shot.x_pos - shot.radius <= enemy.x_pos + enemy.width &&
                    shot.y_pos - shot.radius >= enemy.y_pos &&
                    shot.y_pos - shot.radius <= enemy.y_pos + enemy.height
                ) {
                    this.player.shots.splice(i, 1);
                    this.grid.enemys.splice(j, 1);
                    this.player.score += 5;
                }
            }
            )
            if (shot.y_pos + shot.radius <= 0) { //TODO: take out to new function? 
                this.player.shots.splice(shot, 1)
            } else {
                shot.update();
            }
        })
    };

    isTouchingSpaceship() {
        this.grid.enemys.forEach((enemy) => {
            if (this.player.x_pos + this.player.width >= enemy.x_pos &&
                this.player.x_pos + this.player.width / 2 <= enemy.x_pos + enemy.width &&
                this.player.y_pos + this.player.height >= enemy.y_pos &&
                this.player.y_pos <= enemy.y_pos + enemy.height
            ) {
                this.player.lose = true;
            }
        })
    };

    playAgain(event) {
        const mousePos = this.getMousePos(event);
        if (this.isInside(mousePos,
            (this.canvas.width / 2) - this.getWidthOfText('Play Again?', '40px Arial') / 2,
            this.getWidthOfText('Play Again?', '40px Arial'),
            this.canvas.height / 2 + this.getHeightOfText('Play Again?', '40px Arial'),
            this.getHeightOfText('You Lose!', '80px Arial'))
        ) {
            console.log("done!")
        }
    };
    printMsg(msg, fontSize, x_pos, y_pos) {
        this.ctx.font = fontSize;
        this.ctx.fillStyle = "green";
        this.ctx.fillText(msg, x_pos, y_pos)
    };
};