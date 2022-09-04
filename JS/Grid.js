'use strict';

import { Enemy } from "./Enemy.js";
import { Shot } from "./Shot.js";

export class Grid {
    constructor(rows, coloms, speed, canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.shotTimer = Math.floor(Math.random() * 100) + 100;
        this.rows = rows;
        this.coloms = coloms;
        this.speed = speed;
        this.width = rows * 31; //TODO: change to enemy image width
        this.height = coloms * 39 //TODO: change to enemy image height
        this.enemys = [];
        this.shots = [];
        this.createGrid()
    };

    draw() {
        this.enemys.forEach((enemy) => {
            enemy.draw();
        })
    }

    update() {
        this.draw();
        if (this.shotTimer == 300 && this.enemys.length !== 0) {
            const randomShoter = Math.floor(Math.random() * this.enemys.length);
            this.shots.push(new Shot(this.enemys[randomShoter].x_pos + this.enemys[randomShoter].width / 2,
                this.enemys[randomShoter].y_pos + this.enemys[randomShoter].height / 2,
                5, 'white', this.ctx));
            this.shotTimer = Math.floor(Math.random() * 100) + 100;
        } else if (this.enemys.length !== 0) {
            this.shotTimer++;
        }
        this.shots.forEach((shot) => {
            if (shot.y_pos + shot.radius >= this.canvas.height) {
                this.shots.splice(shot, 1)
            }
            shot.update();
        })
        for (const enemy of this.enemys) {
            if (enemy.x_pos < 0 || enemy.x_pos + enemy.width >= canvas.width) {
                this.speed = -this.speed;
                this.enemys.forEach((enemy) => {
                    enemy.y_pos += enemy.height / 2;
                })
                break;
            }
        }
        this.enemys.forEach((enemy) => {
            enemy.x_pos += this.speed;
        })
    }

    createGrid() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.coloms; j++) {
                this.enemys.push(new Enemy(j * 31, i * 39, this.canvas, this.ctx));
            }
        }
    }
}