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
  createPlatform({x: 0, y: 550, width: 800, height: 50, scale: 1});
  createPlatform({x: 0, y: 400, width: 400, height: 50, scale: 1});
  createPlatform({x: 400, y: 250, width: 400, height: 50, scale: 1});
  createPlatform({x: 0, y: 100, width: 400, height: 50, scale: 1});


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

// Function to create a platform from its information in the JSON file
function createPlatform(platformInfo) {
  let platform = platforms.create(platformInfo.x, platformInfo.y, undefined);
  platform.body.setSize(platformInfo.width, platformInfo.height);
  platform.setOrigin(0, 0);
  platform.displayWidth = platformInfo.width;
  platform.displayHeight = platformInfo.height;
  platform.setScale(platformInfo.scale);
  platform.refreshBody();
}