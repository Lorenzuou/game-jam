
import { Cat } from './cat.js';

// Initialize Phaser3
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

function preload() {
  this.load.spritesheet('cat', 'assets/dude.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
  // Create cat instance
  const cat = new Cat(this, 100, 450);

  // Add input handling code
  const cursors = this.input.keyboard.createCursorKeys();
  this.input.on('pointerdown', () => {
    if (cat.body.onFloor()) {
      cat.setVelocityY(-cat.jumpHeight);
    }
  });
}

function update() {
  // Call cat update method with cursors object
  cat.update(cursors);
  #draw the cat
  cat.draw();

  //draw background
  this.add.image(400, 300, 'sky');
  
}