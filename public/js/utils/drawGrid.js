/**
 * @param {Phaser.Scene} scene - 선을 그릴 Phaser 씬
 * @param {number} gridSize - 선 간격 (픽셀 단위)
 */
export function drawGrid(scene, gridSize) {
  const width = scene.scale.width;
  const height = scene.scale.height;

  const graphics = scene.add.graphics();
  graphics.lineStyle(1, 0x999999, 1);
  graphics.setDepth(10);

  for (let y = 0; y <= height; y += gridSize) {
    if ((y / gridSize) % 5 === 0) {
      graphics.lineStyle(2, 0xff0000, 1);
    } else {
      graphics.lineStyle(1, 0x999999, 1);
    }

    graphics.beginPath();
    graphics.moveTo(0, y);
    graphics.lineTo(width, y);
    graphics.closePath();
    graphics.strokePath();
  }

  for (let x = 0; x <= width; x += gridSize) {
    if ((x / gridSize) % 5 === 0) {
      graphics.lineStyle(2, 0xff0000, 1);
    } else {
      graphics.lineStyle(1, 0x999999, 1);
    }

    graphics.beginPath();
    graphics.moveTo(x, 0);
    graphics.lineTo(x, height);
    graphics.closePath();
    graphics.strokePath();
  }
}
