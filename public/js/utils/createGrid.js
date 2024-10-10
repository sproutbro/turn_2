/**
 * 지정된 매개변수에 따라 씬에서 객체의 그리드를 생성합니다.
 *
 * @param {number} count - 생성할 객체의 총 개수입니다.
 * @param {number} startX - 첫 번째 객체의 시작 x 좌표입니다.
 * @param {number} startY - 첫 번째 객체의 시작 y 좌표입니다.
 * @param {number} columns - 그리드의 열 개수입니다.
 * @param {number} gapX - 객체 간의 수평 간격입니다.
 * @param {number} gapY - 객체 간의 수직 간격입니다.
 * @param {function} createObject - 각 객체를 생성하고 초기화하는 콜백 함수입니다.
 */
export function createGrid(
  count,
  startX,
  startY,
  columns,
  gapX,
  gapY,
  createObject
) {
  for (let index = 0; index < count; index++) {
    const row = Math.floor(index / columns); // 줄 번호
    const col = index % columns; // 열 번호

    // 좌표 계산
    const x = startX + gapX * col;
    const y = startY + gapY * row;

    // 외부에서 오브젝트 생성 및 설정
    if (createObject) {
      createObject(x, y, index); // 좌표와 인덱스를 인자로 전달
    }
  }
}
