import Player from "../classes/Player.js";
import { cameraDrag } from "../utils/index.js";
import { drawGrid } from "../utils/drawGrid.js";
import Enemy from "../classes/Enemy.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  preload() {
    this.load.spritesheet("ninja", "assets/sprites/ninja.png", {
      frameWidth: 66.4,
      frameHeight: 62.6,
    });

    this.load.spritesheet("malePerson", "assets/sprites/malePerson.png", {
      frameWidth: 96,
      frameHeight: 128,
    });

    this.load.image("tiles", "assets/tiles/game_tileset00.png");
    this.load.tilemapTiledJSON("map", "assets/tiles/game_tilemap00.json");
  }

  create() {
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("tileset", "tiles");
    this.layer = this.map.createLayer("backgroundLayer", this.tileset, 0, 0);

    this.tileOutline = this.add.graphics();
    this.tileOutline.lineStyle(2, 0xff0000, 1);

    cameraDrag.call(this);

    this.anims.create({
      key: "ninja_attack",
      frames: this.anims.generateFrameNumbers("ninja", {
        start: 0,
        end: 9,
      }),
      frameRate: 10,
      repeat: 0,
    });

    createAnimation(this.anims, "ninja_dead", "ninja", 10, 10, 19);
    createAnimation(this.anims, "ninja_idle", "ninja", 10, 20, 29);
    createAnimation(this.anims, "ninja_walk", "ninja", 10, 30, 39);
    createAnimation(this.anims, "ninja_throw", "ninja", 10, 40, 49);

    createAnimation(this.anims, "malePerson_dead", "malePerson", 10, 0, 10);
    createAnimation(this.anims, "malePerson_idle", "malePerson", 5, 5, 6);
    createAnimation(this.anims, "malePerson_walk", "malePerson", 10, 36, 43);
    createAnimation(
      this.anims,
      "malePerson_attack",
      "malePerson",
      5,
      27,
      29,
      0
    );

    this.player = new Player(this, 0, 128, "ninja").setOrigin(0, 0);

    const enemy = new Enemy(this, 64, 64, "malePerson").setOrigin(0, 0);
    enemy.setScale(0.5);

    // enemy.setInteractive();
    // enemy.on("pointerdown", () => {
    //   console.log(enemy.health);
    //   enemy.takeDamage(5);
    //   console.log(enemy.health);
    // });

    const button1 = this.add.text(0, 600, "unit1");
    button1.setFontSize(48);
    button1.setInteractive();
    button1.on("pointerdown", () => {
      console.log(1);
    });

    this.input.on("pointermove", (pointer) => {
      const tile = this.layer.worldToTileXY(pointer.worldX, pointer.worldY);

      this.tileOutline.clear();
      if (this.map.hasTileAt(tile.x, tile.y, this.layer)) {
        const tileWorldPos = this.map.tileToWorldXY(tile.x, tile.y);
        this.tileOutline.strokeRect(
          tileWorldPos.x,
          tileWorldPos.y,
          this.map.tileWidth,
          this.map.tileHeight
        );
      }
    });
  }
  update() {
    this.player?.update();
  }
}

function createAnimation(
  anims,
  key,
  spriteSheetKey,
  frameRate,
  startFrame,
  endFrame,
  repeat = -1
) {
  anims.create({
    key: key,
    frames: anims.generateFrameNumbers(spriteSheetKey, {
      start: startFrame,
      end: endFrame,
    }),
    frameRate: frameRate,
    repeat: repeat,
  });
}
