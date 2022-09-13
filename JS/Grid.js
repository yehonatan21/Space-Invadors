'use strict';

import { Enemy } from "./Enemy.js";
import { Shot } from "./Shot.js";

export class Grid {
    constructor(rows, coloms, direction, canvas, canvasHeight, canvasWidth) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.shotTimer = Math.floor(Math.random() * 100) + 100;
        this.rows = rows;
        this.coloms = coloms;
        this.direction = direction;
        this.width = rows * 31; //TODO: change to enemy image width
        this.height = coloms * 39; //TODO: change to enemy image height
        this.enemys = [];
        this.shots = [];
        this.createGrid();
    };

    draw(ctx) {
        this.enemys.forEach((enemy) => {
            enemy.draw(ctx);
        })
        if (this.shotTimer == 300 && this.enemys.length !== 0) {
            const randomShoter = Math.floor(Math.random() * this.enemys.length);
            this.shots.push(new Shot(this.enemys[randomShoter].x_pos + this.enemys[randomShoter].width / 2,
                this.enemys[randomShoter].y_pos + this.enemys[randomShoter].height / 2,
                5, 'white', ctx));
            this.shotTimer = Math.floor(Math.random() * 100) + 100;
        } else if (this.enemys.length !== 0) {
            this.shotTimer++;
        }
        this.shots.forEach((shot) => {
            if (shot.y_pos + shot.radius >= this.canvasHeight) {
                this.shots.splice(shot, 1);
            }
            shot.draw(ctx);
        })
        for (const enemy of this.enemys) {
            if (enemy.x_pos < 0 || enemy.x_pos + enemy.width >= this.canvasWidth) {
                this.direction = -this.direction;
                this.enemys.forEach((enemy) => {
                    enemy.y_pos += enemy.height / 2;
                })
                break;
            }
        }
        this.enemys.forEach((enemy) => {
            enemy.x_pos += this.direction;
        })
    }

    createGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.coloms; j++) {
                this.enemys.push(new Enemy(j * 31, i * 39, this.canvasWidth));
            }
        }
    }
}