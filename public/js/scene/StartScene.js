export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  preload() {
    this.load.image("start_background", "assets/start_background.png");
    this.load.image("start_start_button", "assets/start_start_button.png");
    this.load.image(
      "start_continue_button",
      "assets/start_continue_button.png"
    );
  }

  create() {
    this.add.image(0, 0, "start_background").setOrigin(0, 0).setScale(2);

    const startButton = this.add.image(186, 870, "start_start_button");
    startButton.setOrigin(0, 0);
    startButton.setInteractive();
    startButton.setScale(2);
    startButton.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });

    const continueButton = this.add.image(370, 868, "start_continue_button");
    continueButton.setOrigin(0, 0);
    continueButton.setInteractive();
    continueButton.setScale(2);
    continueButton.on("pointerdown", () => {
      console.log("continue");
    });
  }
  update() {}
}
