class Cat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'cat');

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Set cat's properties
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);

    // Initialize cat's movement properties
    this.moveSpeed = 200;
    this.jumpSpeed = 400;
    this.fallSpeed = 800;

    // Create cat's animations
    this.createAnimations();

    // Set cat's initial animation state
    this.anims.play('cat-run');
  }

  createAnimations() {
    // Create cat's animations
    this.anims.create({
      key: 'cat-run',
      frames: this.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'cat-jump',
      frames: [{ key: 'cat', frame: 4 }],
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: 'cat-fall',
      frames: [{ key: 'cat', frame: 5 }],
      frameRate: 10,
      repeat: 0
    });
  }

  update() {
    // Update cat's sprite state based on its movement
    if (this.body.velocity.y < 0) {
      this.anims.play('cat-jump', true);
    } else if (this.body.velocity.y > 0) {
      this.anims.play('cat-fall', true);
    } else if (this.body.velocity.x !== 0) {
      this.anims.play('cat-run', true);
    } else {
      this.anims.stop();
      this.setTexture('cat', 0);
    }

    // Check for collision with the ground
    const onGround = this.body.blocked.down;

    // Horizontal movement
    if (this.scene.cursors.left.isDown) {
      this.setVelocityX(-this.moveSpeed);
      this.flipX = true;
    } else if (this.scene.cursors.right.isDown) {
      this.setVelocityX(this.moveSpeed);
      this.flipX = false;
    } else {
      this.setVelocityX(0);
    }

    // Jumping
    if (onGround && this.scene.cursors.up.isDown) {
      this.setVelocityY(-this.jumpSpeed);
    }

    // Falling
    if (!onGround && this.body.velocity.y > 0) {
      this.setGravityY(this.fallSpeed);
    } else {
      this.setGravityY(0);
    }
  }
}


export function loadCat(scene) {
  scene.load.spritesheet('cat', 'assets/cat.png', { frameWidth: 32, frameHeight: 32 });
}