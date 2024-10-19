export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.play(`${texture}_idle`);

    this.on("animationcomplete", (animation) => {
      if (animation.key === `${texture}_attack`) {
        this.play(`${texture}_idle`);
      }
    });

    this.setInteractive();
    this.on("pointerdown", (point) => {
      // this.move(64, 64);
      this.attack();
    });
  }

  move(x, y) {
    this.play(`${this.texture.key}_walk`);

    const tileX = Math.floor(x / 128);
    const tileY = Math.floor(y / 128);
    const targetX = tileX * 128 + 128;
    const targetY = tileY * 128 + 128;
    this.targetPosition = { x: targetX, y: targetY };
    this.scene.physics.moveTo(this, targetX, targetY, 300);
  }

  attack(target) {
    this.play(`${this.texture.key}_attack`);
    // if (target.takeDamege) {
    //   target.takeDamage(this.attackPower);
    // }
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.destroy();
    }
  }

  update() {
    if (this.targetPosition) {
      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetPosition.x,
        this.targetPosition.y
      );

      if (distance <= 4) {
        this.play(`${this.texture.key}_idle`);

        this.body.setVelocity(0, 0);
        this.targetPosition = null;
      }
    }
  }
}
