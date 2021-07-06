class Player {
  constructor(ctx, { x, y, width, height, speed }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = speed;

    this.mask = {
      x: 395,
      y: 0,
      width: 95,
      height: 80,
    };

    this.image = new Image();
    this.image.src = "assets/sprite.png";
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.mask.x,
      this.mask.y,
      this.mask.width,
      this.mask.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  update(inc) {
    this.x += this.speed * inc;
  }
  shoot() {
    game.isShooting = true;
    game.bullets.push(
      new Bullet(this.ctx, {
        x: this.x + this.width / 2 - 5,
        y: this.y,
        width: 5,
        height: 10,
        speed: 20,
      }),
    );
  }
}
