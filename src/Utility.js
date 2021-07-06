class Utility {
  static isColliding(object, bullet) {
    if (
      bullet.x < object.x + object.width &&
      bullet.x + bullet.width > object.x &&
      bullet.y + bullet.height > object.y &&
      bullet.y < object.y + object.height
    )
      return true;

    return false;
  }
  static isCursorInElement(cursor, element) {
    return (
      cursor.x > element.x &&
      cursor.x < element.x + element.width &&
      cursor.y > element.y &&
      cursor.y < element.y + element.height
    );
  }
  static drawRect(ctx, { x, y, width, height, color }) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
  static drawText(ctx, { x, y, fontSize, color, text, isCenter }) {
    ctx.beginPath();
    if (isCenter) {
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
    }
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.closePath();
  }
}
