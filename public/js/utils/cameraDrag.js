export function cameraDrag() {
  this.isDragging = false;
  this.dragStartPoint = new Phaser.Math.Vector2();
  this.cameraStartPoint = new Phaser.Math.Vector2();
  const { map } = this;

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.input.on("pointerdown", (pointer) => {
    this.isDragging = true;
    this.dragStartPoint.set(pointer.x, pointer.y);
    this.cameraStartPoint.set(
      this.cameras.main.scrollX,
      this.cameras.main.scrollY
    );
  });

  this.input.on("pointerup", () => {
    this.isDragging = false;
  });

  this.input.on("pointerupoutside", () => {
    this.isDragging = false;
  });

  this.input.on("pointermove", (pointer) => {
    if (this.isDragging) {
      const dragX = pointer.x - this.dragStartPoint.x;
      const dragY = pointer.y - this.dragStartPoint.y;

      this.cameras.main.scrollX = this.cameraStartPoint.x - dragX;
      this.cameras.main.scrollY = this.cameraStartPoint.y - dragY;
    }
  });

  const zoomSpeed = 2; // 줌 속도 조절 값 (높을수록 빠름)

  // 마우스 휠로 줌 인/아웃
  this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
    let newZoom = this.cameras.main.zoom - deltaY * zoomSpeed * 0.001;
    newZoom = Phaser.Math.Clamp(newZoom, 0.5, 2); // 최소/최대 줌 레벨 설정

    // 트윈을 사용해 줌을 부드럽게 설정
    this.tweens.add({
      targets: this.cameras.main,
      zoom: newZoom,
      duration: 50, // 줌 속도 (밀리초, 낮을수록 빠름)
      ease: "Quad.easeOut",
    });
  });
}

export function moveCamera(scene, x, y) {
  const { width, height } = scene.game.config;
  scene.cameras.main.scrollX = x - width / 2;
  scene.cameras.main.scrollY = y - height / 2;
}
