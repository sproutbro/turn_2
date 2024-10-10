/**
 * 수정필요
 *
 * @param {Phaser.Scene} scene - 선을 그릴 Phaser 씬
 * @param {number} x - 객체의 시작 x 좌표입니다.
 * @param {number} y - 객체의 시작 y 좌표입니다.
 * @param {string} text - 텍스트 내용.
 */
export function addStyledText(scene, x, y, text) {
  const styledText = scene.add.text(x, y, text);
  styledText.setFontFamily("Noto Sans KR");
  styledText.setFontSize(32);
  styledText.setColor("#ffffff");
  styledText.setDepth(2);
  styledText.setOrigin(0.5, 0.5);
}

/**
 * 사각형 자료 배열로 사각형 생성
 * UI 창 생성용으로 만든함수 임시다.
 *
 * @param {Phaser.Scene.graphics} graphics
 * @param {Object} rects - [{x,y,width,height}]
 * @param {string} color - 기본 "0xffffff"
 */
export function drawRoundedRects(graphics, rects, color = "0xffffff") {
  graphics.clear();
  graphics.fillStyle(color, 0.2);

  rects.forEach((rect) => {
    const { x, y, width, height } = rect;
    graphics.fillRoundedRect(x * 40, y * 40, width * 40, height * 40, 10);
  });
}
