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
        this.player = new Player(this.ctx, this.canvas.width / 2, this.canvas.height);
        this.grid = new Grid(3, 3, 10, this.canvas, this.ctx)
        this.pauseBtn = new PauseBtn(this.ctx);
        this.stars = new Stars(this.canvas, this.ctx);
        this.play = true;
        this.frames = 0;
        this.BICHYOUN = 'יש לי בכיון ';
        this.canvas.addEventListener('click', (event) => {
            if (this.isInside(this.getMousePos(event), this.pauseBtn.x_pos, this.pauseBtn.width, this.pauseBtn.y_pos, this.pauseBtn.height)) {
                if (this.play) {
                    this.play = false;
                    this.pauseBtn.image.src = './img/play.jpg'
                } else {
                    this.play = true;
                    this.pauseBtn.image.src = './img/pause.jpg'
                }
            }
        }, false);
    }

    updete() {
        this.printScore();
        this.printBICHYOUN();
    };

    printScore() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score:" + this.player.score, this.canvas.width - this.getWidthOfText(`Score: ${this.player.score}`, '20px Arial'), 30);
    }

    printNewLevel() {
        this.printMsg('Level Up!',
            "80px Arial",
            (this.canvas.width / 2) - this.getWidthOfText('Level Up!', '80px Arial') / 2,
            this.canvas.height / 2)
    }

    printBICHYOUN() {
        this.ctx.font = "20px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(this.BICHYOUN, this.canvas.width - this.getWidthOfText(this.BICHYOUN, '20px Arial'), 60);
    }

    pauseGame(event) {
        const mousePos = this.getMousePos(event);
        if (this.isInside(mousePos, this.pauseBtn.x_pos, this.pauseBtn.width, this.pauseBtn.y_pos, this.pauseBtn.height)) {
            this.play = false;
        }
    }

    start() {
        this.#animate();
    }

    #animate() {
        if (this.player.lose) { //TODO: add a play again option
            this.printMsg('You Lose!',
                "80px Arial",
                (this.canvas.width / 2) - this.getWidthOfText('You Lose!', '80px Arial') / 2,
                this.canvas.height / 2);

            this.printMsg('Play Again?',
                "40px Arial",
                (this.canvas.width / 2) - this.getWidthOfText('Play Again?', '40px Arial') / 2,
                this.canvas.height / 2 + this.getHeightOfText('You Lose!', '80px Arial'));

            this.canvas.addEventListener('click', (event) => {
                this.bichyoun(event);
                this.playAgain(event);
            }, false);
        }
        else if (this.play) {
            this.ctx.clearRect(0, 0, innerWidth, innerHeight);
            this.checkEnemyHit();
            this.isLevelUp();
            this.checkIfShotOutOfScreen();
            this.isTouchingSpaceship();
            this.updete();
            this.player.update();
            this.grid.update();
            this.stars.update();
        }
        this.pauseBtn.update();
        requestAnimationFrame(() => this.#animate());
    }

    isLevelUp() {
        if (this.grid.enemys.length == 0) {
            if (this.frames != 100) {
                this.printNewLevel();
                this.frames++;
            } else if (this.frames == 100) {
                this.grid.rows += 1;
                this.grid.coloms += 1;
                if (Math.sign(this.grid.speed) == 1) {
                    this.speed += 1;
                } else {
                    this.speed = (this.grid.speed * -1) + 1;
                }
                this.grid.createGrid();
                this.frames = 0;
            }
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
        })
    };

    checkIfShotOutOfScreen() {
        this.player.shots.forEach((shot) => {
            if (shot.y_pos + shot.radius <= 0) {
                this.player.shots.splice(shot, 1)
            } else {
                shot.update();
            }
        })
    }

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
        // this.canvas.removeEventListener("click", (event) => {this.bichyoun(event);this.playAgain(event);}, false); //how to removeEventListener with arrow function 
        const mousePos = this.getMousePos(event);
        if (this.isInside(mousePos,
            (this.canvas.width / 2) - this.getWidthOfText('Play Again?', '40px Arial') / 2,
            this.getWidthOfText('Play Again?', '40px Arial'),
            this.canvas.height / 2 + this.getHeightOfText('Play Again?', '40px Arial'),
            this.getHeightOfText('You Lose!', '80px Arial'))
        ) {
            this.BICHYOUN = 'יש לי בכיון ';
            this.grid = new Grid(17, 3, 10, this.canvas, this.ctx)
            this.player = new Player(this.ctx, this.canvas.width / 2, this.canvas.height);
        }
    };
    printMsg(msg, fontSize, x_pos, y_pos) {
        this.ctx.font = fontSize;
        this.ctx.fillStyle = "green";
        this.ctx.fillText(msg, x_pos, y_pos)
    };
};