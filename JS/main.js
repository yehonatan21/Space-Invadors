'use strict';

import { Game } from "./Game.js";

function start() {
  game.player.draw();
  game.grid.draw();
  game.pauseBtn.draw();
  game.stars.draw();
}

function animate() {
  if (game.player.lose) { //TODO: add a play again option
    game.printMsg('You Lose!',
      "80px Arial",
      (game.canvas.width / 2) - game.getWidthOfText('You Lose!', '80px Arial') / 2,
      game.canvas.height / 2);

    game.printMsg('Play Again?',
      "40px Arial",
      (game.canvas.width / 2) - game.getWidthOfText('Play Again?', '40px Arial') / 2,
      game.canvas.height / 2 + game.getHeightOfText('You Lose!', '80px Arial'));

    game.canvas.addEventListener('click', function (event) {
      game.bichyoun(event);
      game.playAgain(event);
    }, false);
  }
  else if (game.play) {
    game.ctx.clearRect(0, 0, innerWidth, innerHeight);
    game.checkEnemyHit();
    game.isTouchingSpaceship();
    game.player.update();
    game.updete();
    game.grid.update();
    game.stars.update();
  }
  game.pauseBtn.update();
  requestAnimationFrame(animate);
}

const game = new Game();

start();
animate();