'use strict';

import { Enemy } from "./Enemy.js";

export class Grid {
    constructor(rows, coloms, speed, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.rows = rows;
        this.coloms = coloms;
        this.speed = speed;
        this.width = rows * 31; //TODO: change to enemy image width
        this.height = coloms * 39 //TODO: change to enemy image height
        this.enemys = [];
        this.levelUp = false;
        this.createGrid()
    };

    draw() {
        if (this.levelUp) {
            // TODO: new level animation + set time out.
            this.rows += 1;
            this.coloms += 2;
            if (Math.sign(this.speed) == 1) {
                this.speed += 1;
            } else {
                this.speed = (this.speed * -1) + 1;
            }
            this.createGrid()
            this.levelUp = false;
        }
        this.enemys.forEach((enemy) => {
            enemy.draw();
        })
    }

    update() {
        this.draw();
        for (const enemy of this.enemys) {
            if (enemy.x_pos < 0 || enemy.x_pos + enemy.width >= canvas.width) {
                this.speed = -this.speed;
                this.enemys.forEach((enemy) => {
                    enemy.y_pos += enemy.height / 2;
                })
                break;
            }
        }
        if (this.enemys.length == 0) {
            this.levelUp = true;
        }
        this.enemys.forEach((enemy) => {
            enemy.x_pos += this.speed;
        })
    }

    createGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.coloms; j++) {
                this.enemys.push(new Enemy(j * 31, i * 39,this.canvas,this.ctx));
            }
        }
    }
}