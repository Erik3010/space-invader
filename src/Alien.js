class Alien {
  constructor(ctx, { x, y, width, height, speed, type }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = speed;

    this.type = type;

    this.xMask = !this.type ? 225 : 0;
    this.mask = {
      x: this.xMask,
      y: 0,
      width: 111 - (!this.type ? 25 : 0),
      height: 80,
    };

    this.image = new Image();
    this.image.src = "assets/sprite.png";

    this.spriteStep = 0;
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
      this.height
    );
  }
  update() {
    if (this.spriteStep > 1) this.spriteStep = 0;

    this.mask.x = this.mask.width * this.spriteStep + this.xMask;
    this.spriteStep++;

    this.x += this.speed;

    this.draw();
  }
}
