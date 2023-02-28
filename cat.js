export default class Cat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'cat');

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setPlayer();
    // Create cat's animations
    this.createAnimations();

    // Set cat's initial animation state
    this.anims.play('cat-run');

    this.player = this.scene.physics.add.sprite(100, 450, 'cat');


  }
  preload() {
    this.load.spritesheet('cat', 'assets/dude.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('sky', 'assets/sky.png');
    this.load.image('cat-fall', 'assets/dude.png');
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
   
}


setPlayer() {
  this.player = this.scene.physics.add.sprite(100, 450, 'cat');
  this.player.fallSpeed = 8;
  this.player.jumpSpeed = 4;
  this.player.moveSpeed = 4;
  this.player.setCollideWorldBounds(true);

}

setKeys() {
  this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}       


handlemovement() {
  // Add input handling code
  const vel = this.player.body.velocity;

  if (this.left.isDown) {
    this.player.setVelocityX(-this.moveSpeed);
  } else if (this.right.isDown) {
    if (this.player.body.onFloor()) {
      this.player.anims.play('cat-run');
    }else {
      this.player.anims.play('cat-fall');
      this.player.setVelocityY(this.moveSpeed);
    }
  } else {
    this.player.setVelocityX(0);

    if (this.player.body.onFloor()) {
      this.player.anims.play('cat-run');
      
    }
  } 
  if (this.up.isDown && this.player.body.onFloor()) {
    this.player.setVelocityY(-this.jumpSpeed);
    this.player.anims.play('cat-jump');
  } 
    

} } 


 
