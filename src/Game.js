class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.isPause = false;
    this.gameOver = false;

    this.player;
    this.aliens = [];

    this.bullets = [];
    this.isShooting = false;

    this.playerArea = {
      x: 0,
      y: this.canvas.height - 100,
      width: this.canvas.width,
      height: this.canvas.height,
    };

    this.aliensPadding = {
      top: 40,
      left: 25,
    };

    this.score = 0;
    this.localKey = "space_ivander_key";

    this.startButton;
    this.pauseButton;

    this.init();
    this.listener();
  }
  init() {
    this.player = new Player(this.ctx, {
      x: this.canvas.width / 2 - 50,
      y: this.canvas.height - 40,
      width: 50,
      height: 40,
      speed: 5,
    });

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 11; col++) {
        this.aliens.push(
          new Alien(this.ctx, {
            x: col * 42 + this.aliensPadding.left,
            y: row * 28 + this.aliensPadding.top,
            width: 28,
            height: 18,
            speed: 5,
            type: row < 3,
          })
        );
      }
    }

    this.startButton = new Button(this.ctx, {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      width: 100,
      height: 35,
      fontSize: 18,
      bgColor: "gray",
      textColor: "#fff",
      text: "Play",
      onclick: (instance) => {
        init();
        instance.rect = { x: 0, y: 0, width: 0, height: 0 };
      },
    });

    this.pauseButton = new Button(this.ctx, {
      x: this.canvas.width - 50,
      y: 20,
      width: 80,
      height: 25,
      fontSize: 14,
      bgColor: "gray",
      textColor: "#fff",
      text: this.isPause ? "Play" : "Pause",
      onclick: (instance) => {
        this.isPause = !this.isPause;
        instance.text = this.isPause ? "Play" : "Pause";
        this.update();
      },
    });

    this.showStartScreen();
  }
  listener() {
    window.addEventListener("keydown", (e) => {
      if (this.isPause) return;

      if (e.keyCode === 65) {
        this.player.update(-1);
      } else if (e.keyCode === 68) {
        this.player.update(1);
      } else if (e.keyCode === 32) {
        if (this.isShooting) return;
        this.player.shoot();
      }
    });
  }
  drawBackground() {
    this.drawDarkBg();
    this.drawPlayerArea();
  }
  drawDarkBg() {
    Utility.drawRect(this.ctx, {
      x: 0,
      y: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      color: "#000",
    });
  }
  drawPlayerArea() {
    Utility.drawRect(this.ctx, {
      x: this.playerArea.x,
      y: this.playerArea.y,
      width: this.playerArea.width,
      height: this.playerArea.height,
      color: "gray",
    });
  }
  update() {
    this.drawBackground();
    this.player.draw();

    this.checkCollition();

    this.bullets.forEach((bullet, index) => {
      bullet.update();
      if (bullet.y < 0 - bullet.height) {
        this.isShooting = false;
        this.bullets.splice(index, 1);
      }
    });

    this.aliens.forEach((alien) => {
      if (alien.x + alien.width > this.canvas.width || alien.x < 0) {
        this.changeAlienDirection();
      }
    });

    this.aliens.forEach((alien, index) => {
      alien.update();
    });

    this.showGameBar();
  }
  changeAlienDirection() {
    this.aliens.forEach((alien) => {
      alien.speed *= -1;
      alien.y += 4;
      alien.update();
    });
  }
  checkCollition() {
    this.bullets.forEach((bullet, index) => {
      this.aliens.forEach((alien, idx) => {
        if (Utility.isColliding(bullet, alien)) {
          this.isShooting = false;
          this.bullets.splice(index, 1);
          this.aliens.splice(idx, 1);
          this.score += 10;
        }
      });
    });

    for (let i = 0; i < this.aliens.length; i++) {
      if (Utility.isColliding(this.aliens[i], this.player)) {
        this.gameOver = true;
        this.saveScore();
        break;
      }
    }
  }
  saveScore() {
    const lastScore = localStorage.getItem(this.localKey) || 0;

    if (this.score > lastScore) {
      localStorage.setItem(this.localKey, this.score);
    }
  }
  showStartScreen() {
    this.drawDarkBg();

    this.startButton.init();

    const highScore = localStorage.getItem(this.localKey) || 0;
    Utility.drawText(this.ctx, {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2 + 50,
      fontSize: 24,
      color: "#fff",
      text: `Highscore: ${highScore}`,
      isCenter: true,
    });
  }
  showGameBar() {
    Utility.drawText(this.ctx, {
      x: this.canvas.width / 2,
      y: 20,
      fontSize: 14,
      color: "#fff",
      text: `Score: ${this.score}`,
      isCenter: true,
    });

    this.pauseButton.init();
  }
}
