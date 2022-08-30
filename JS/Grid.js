'use strict';

import { Enemy } from "./Enemy.js";

let canvas = document.getElementById('canvas');

export class Grid {
    constructor(rows, coloms, speed) {
        this.rows = rows;
        this.coloms = coloms;
        this.speed = speed;
        this.width = rows * 31; //TODO: change to enemy image width
        this.height = coloms * 39 //TODO: change to enemy image height
        this.enemys = [];
        this.levelUp = false;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.coloms; j++) {
                this.enemys.push(new Enemy(j * 31, i * 39));
            }
        }
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
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.coloms; j++) {
                    this.enemys.push(new Enemy(j * 31, i * 39));
                }
            }
            this.levelUp = false;
        }
        this.enemys.forEach((enemy) => {
            enemy.draw();
        })
    }

    update() { // FIXME: the last enemy in the enemys array is the one setting the rigth side of the grid 
        this.draw();
        try {
            if (this.enemys[0].x_pos < 0 || this.enemys[this.enemys.length - 1].x_pos + this.enemys[this.enemys.length - 1].width >= canvas.width) {
                this.speed = -this.speed;
                this.enemys.forEach((enemy) => {
                    enemy.y_pos += enemy.height / 2;
                })
            }
        }
        catch (err) {
            this.levelUp = true;
        }
        this.enemys.forEach((enemy) => {
            enemy.x_pos += this.speed;
        })
    }
}