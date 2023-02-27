// This code is the class wich represents the protagonist of the game, it will govern the movement of the player and the interaction with the game world.
class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'cat');
  
      // Add the cat sprite to the game
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      // Set up the cat's properties
      this.setCollideWorldBounds(true);
      this.setBounce(0.2);
      this.setGravityY(300);
  
      // Add the cat's animations
      scene.anims.create({
        key: 'left',
        frames: scene.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
  
      scene.anims.create({
        key: 'turn',
        frames: [ { key: 'cat', frame: 4 } ],
        frameRate: 20
      });
  
      scene.anims.create({
        key: 'right',
        frames: scene.anims.generateFrameNumbers('cat', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });
    }
  
    update(cursors) {
      // Add cat movement
      if (cursors.left.isDown) {
        this.setVelocityX(-160);
        this.anims.play('left', true);
      } else if (cursors.right.isDown) {
        this.setVelocityX(160);
        this.anims.play('right', true);
      } else {
        this.setVelocityX(0);
        this.anims.play('turn');
      }
  
      if (cursors.up.isDown && this.body.touching.down) {
        this.setVelocityY(-330);
      }
    }
  }
  