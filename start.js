// Initialize Phaser
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};
var game = new Phaser.Game(config);

// Declare global variables
var player;
var platforms;
var lastJumpTime = 0;
var jumpDelay = 500; // milliseconds


function preload() {
  // Load assets
  this.load.image('sky', 'https://www.phaser.io/examples/v3/assets/skies/space3.png');
}

function create() {
  // Add background
  this.add.image(400, 300, 'sky');

  // Add platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'platform').setScale(2).refreshBody();
  platforms.create(800, 400, 'platform');
  platforms.create(50, 250, 'platform');
  platforms.create(750, 220, 'platform');

  // Add player
  player = this.physics.add.sprite(0, 0, 'player');
  player.setBounce(0);
  player.setCollideWorldBounds(true);
  player.setGravityY(200);

  // Add keyboard controls
  cursors = this.input.keyboard.createCursorKeys();

  // Add collisions
  this.physics.add.collider(player, platforms);
  player.setCollideWorldBounds(true);

}

function update() {
  // Add keyboard controls
  if (cursors.left.isDown) {
      player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
      player.setVelocityX(160);
  } else {
      player.setVelocityX(0);
  }
  

  if (cursors.up.isDown && player.body.touching.down && (Date.now() - lastJumpTime > jumpDelay)) {
    player.setVelocityY(-330);
    lastJumpTime = Date.now();
  }
}