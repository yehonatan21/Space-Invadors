'use strict';

import { Player } from "./Player.js";
import { Grid } from "./Grid.js";
import { PauseBtn } from "./PauseBtn.js";
import { Stars } from "./stars.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.height = window.innerHeight - 4; //FIXME
canvas.width = window.innerWidth;

function start() {
  player.draw();
  grid.draw();
  pauseBtn.draw();
  stars.draw();
}

function animate() {
  if (player.lose) { //TODO: add play again option
    ctx.font = "80px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("You Lose!", (canvas.width / 2) - getWidthOfText('You Lose!','Arial','80px')/2, canvas.height / 2) 
    return
  }
  else if (player.play) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    checkEnemyHit();
    isTouchingSpaceship();
    player.update();
    grid.update();
    stars.update();
  }
  pauseBtn.update();
  requestAnimationFrame(animate);
}

function checkEnemyHit() {
  player.shots.forEach((shot, i) => {
    grid.enemys.forEach((enemy, j) => {
      if (shot.x_pos - shot.radius >= enemy.x_pos &&
        shot.x_pos - shot.radius <= enemy.x_pos + enemy.width &&
        shot.y_pos - shot.radius >= enemy.y_pos &&
        shot.y_pos - shot.radius <= enemy.y_pos + enemy.height
      ) {
        player.shots.splice(i, 1);
        grid.enemys.splice(j, 1);
        player.score += 5;
      }
    }
    )
    if (shot.y_pos + shot.radius <= 0) { //TODO: take out to new function? 
      player.shots.splice(shot, 1)
    } else {
      shot.update();
    }
  })
}

function isTouchingSpaceship() { // FIXME
  grid.enemys.forEach((enemy) => {
    if (player.x_pos + player.width >= enemy.x_pos &&
      player.x_pos + player.width / 2 <= enemy.x_pos + enemy.width &&
      player.y_pos + player.height >= enemy.y_pos &&
      player.y_pos <= enemy.y_pos + enemy.height
    ) {
      player.lose = true;
    }
  })
}

addEventListener('click', function (event) {
  const mousePos = pauseBtn.getMousePos(canvas, event);

  if (pauseBtn.isInside(mousePos)) {
    if (pauseBtn.image.src.endsWith("img/pause.jpg")) {
      pauseBtn.image.src = './img/play.jpg'
      player.play = false
    } else {
      pauseBtn.image.src = './img/pause.jpg';
      player.play = true;
    }
  }
}, false);

const player = new Player();
const grid = new Grid(3, 3, 10)
const pauseBtn = new PauseBtn();
const stars = new Stars();

start();
animate();

export function getWidthOfText(txt, fontname, fontsize){
  if(getWidthOfText.c === undefined){
      getWidthOfText.c=document.createElement('canvas');
      getWidthOfText.ctx=getWidthOfText.c.getContext('2d');
  }
  var fontspec = fontsize + ' ' + fontname;
  if(getWidthOfText.ctx.font !== fontspec)
      getWidthOfText.ctx.font = fontspec;
  return getWidthOfText.ctx.measureText(txt).width;
}

console.log(getWidthOfText('You Lose!','Arial','80px'));