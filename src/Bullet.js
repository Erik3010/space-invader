class Bullet {
  constructor(ctx, { x, y, width, height, speed }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = speed;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fill();
    this.ctx.closePath();
  }
  update() {
    this.draw();
    this.y -= this.speed;
  }
}
