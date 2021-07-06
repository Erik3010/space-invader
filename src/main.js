const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas, ctx);

const init = () => {
  update();
};

const update = () => {
  if (!game.gameOver && !game.isPause) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.update();
  } else if (game.gameOver) {
    alert("Game Over");
    return;
  }

  setTimeout(update, 100);
};

// window.onload = init();
