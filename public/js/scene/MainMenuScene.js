import {
  createGrid,
  drawGrid,
  addStyledText,
  drawRoundedRects,
} from "../utils/index.js";
import planets from "../data/planets.js";
import uiWindows from "../data/uiWindows.js";
import player from "../data/player.js";

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  preload() {
    this.load.image("planet00", "assets/planets/planet00.png");
    this.load.image("planet01", "assets/planets/planet01.png");
    this.load.image("planet02", "assets/planets/planet02.png");
    this.load.image("planet03", "assets/planets/planet03.png");
    this.load.image("planet04", "assets/planets/planet04.png");
    this.load.image("planet05", "assets/planets/planet05.png");
    this.load.image("planet06", "assets/planets/planet06.png");
    this.load.image("planet07", "assets/planets/planet07.png");
    this.load.image("menu_background", "assets/menu_background.png");
    this.load.image(
      "menu_background_planet00",
      "assets/menu_background_planet00.png"
    );
    this.load.image(
      "menu_background_planet01",
      "assets/menu_background_planet01.png"
    );
    this.load.image(
      "menu_background_planet02",
      "assets/menu_background_planet02.png"
    );
    this.load.image(
      "menu_background_planet03",
      "assets/menu_background_planet03.png"
    );
    this.load.image(
      "menu_background_planet04",
      "assets/menu_background_planet04.png"
    );
  }
  create() {
    // background
    this.background = this.add.image(0, 0, "menu_background");
    this.background.setOrigin(0, 0);
    this.background.setDisplaySize(720, 1280);

    // ui window
    const graphics = this.add.graphics();
    drawRoundedRects(graphics, uiWindows);

    // ui text
    addStyledText(this, 180, 60, player.username);
    addStyledText(this, 420, 60, `LV : ${player.level}`);
    addStyledText(this, 600, 60, `G : ${player.gold}`);
    addStyledText(this, 3.5 * 40, 4 * 40, "Units");
    addStyledText(this, 9 * 40, 4 * 40, "inven");
    addStyledText(this, 14.5 * 40, 4 * 40, "achievements");
    addStyledText(this, 9 * 40, 29.5 * 40, "store");

    // planet object
    createGrid(planets.length, 1 * 40, 18 * 40, 4, 160, 160, (x, y, i) => {
      const planetImage = this.add.image(x, y, planets[i].name).setOrigin(0, 0);
      planetImage.setOrigin(0, 0);
      planetImage.setScale(2);
      planetImage.setDepth(2);
      planetImage.setInteractive();
      planetImage.on("pointerdown", () => handlePlanetClick(this, planets[i]));
    });

    function handlePlanetClick(scene, planet) {
      scene.background.setTexture(`menu_background_${planet.name}`);
      drawRoundedRects(graphics, uiWindows, planet.color);
    }
  }

  update() {}
}
