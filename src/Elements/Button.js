class Button {
  constructor(
    ctx,
    { x, y, width, height, fontSize = 10, bgColor, textColor, text, onclick }
  ) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.fontSize = fontSize;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.text = text;

    this.rect = {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      width: this.width,
      height: this.height,
    };

    this.cursor = "default";

    this.onclick = onclick;

    this.moveHandler = this.mouseMoveHandler.bind(this);
    this.clickHandler = this.mouseClickHandler.bind(this);
  }
  init() {
    this.event();
    this.draw();
  }
  event() {
    canvas.addEventListener("mousemove", this.moveHandler);
    canvas.addEventListener("click", this.clickHandler);
  }
  mouseMoveHandler(e) {
    const cursor = {
      x: e.offsetX,
      y: e.offsetY,
    };
    if (Utility.isCursorInElement(cursor, this.rect)) {
      this.cursor = "pointer";
    } else this.cursor = "default";

    document.body.style.cursor = this.cursor;
  }
  mouseClickHandler(e) {
    const cursor = {
      x: e.offsetX,
      y: e.offsetY,
    };
    if (Utility.isCursorInElement(cursor, this.rect)) {
      this.onclick.call(this, this);
    }
  }
  draw() {
    Utility.drawRect(this.ctx, {
      ...this.rect,
      color: this.bgColor,
    });

    Utility.drawText(this.ctx, {
      x: this.rect.x + this.width / 2,
      y: this.rect.y + this.height / 2,
      fontSize: this.fontSize,
      color: this.textColor,
      text: this.text,
      isCenter: true,
    });
  }
  destroy() {
    canvas.removeEventListener("mousemove", this.moveHandler);
    canvas.removeEventListener("click", this.clickHandler);
  }
}
