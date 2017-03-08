var width = 800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO,'', {preload: preload, create: create, update: update});

//Create list of variables needed for the game
var player;
var food;
var cursors;
var topKey;
var bottomKey;
var leftKey;
var rightKey;
var space;
var shootingTimer;
var bulletTrigger = true;
var mouseX;
var mouseY;
var primaryCrosshair;
var speedTrigger = true;	

var speed = 175;
var bulletSpeed = 300;
var score = 0;
var scoreText;

function preload() {
	game.stage.backgroundColor = "#eee";
	game.load.image('player', 'asset/blue-square.png');
	game.load.image('food', 'asset/red-square.png');
	game.load.image('bullet', 'asset/bullet5.png')
	game.load.image('crosshair', 'asset/red-square.png');
}

function create() {
	space = game.input.keyboard.addKey([Phaser.Keyboard.
		SPACEBAR]);

// Initializes game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors=game.input.keyboard.createCursorKeys();
//create wasd controls for plability
	topKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	// topKey = game.input.keyboard.addKeyCapture(Phaser.KeyCode.W);
	bottomKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
	//Create the player sprite
	player = game.add.sprite(width*0.5, height*0.5, 'player');
	//set the anchor point in the center of the sprite
	player.anchor.set(0.5);
	//Enable physics for the player body
	game.physics.enable(player, Phaser.Physics.ARCADE);
	//Have the player collide with the bounds of the world
	player.body.collideWorldBounds=true;

//Create the crosshair, additional requirements in
//external function
	primaryCrosshair = createCrosshair(width*0.5, height*0.3);

	food = game.add.group();
	food.create(width*0.1, height*0.1, 'food');
	food.create(width*0.9, height*0.1, 'food');
	food.create(width*0.1, height*0.9, 'food');
	food.create(width*0.9, height*0.9, 'food');
	for (var i in food.children) {
		food.children[i].anchor.set(0.5);
	}
	game.physics.enable(food, Phaser.Physics.ARCADE);

	scoreText = game.add.text(5,3, score);
	this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

//Adds weapons
	initBullets();
	// shootingTimer = game.time.events.loop(Phaser.Timer.SECOND/5,
	// 	createPlayerBullets);
}

function update() {
	//move the player up and down based on keyboard arrows
	// console.log(addKey);
	if (topKey.isDown || cursors.up.isDown) {
		// game.input.keyboard.isUp(Phaser.Keyboard.W),
		player.body.velocity.y = -speed;
	}
	else if (bottomKey.isDown || cursors.down.isDown) {
		player.body.velocity.y = speed;
	}
	else {
		player.body.velocity.y = 0;
	}

	if (rightKey.isDown || cursors.right.isDown) {
		player.body.velocity.x = speed;
	}
	else if (leftKey.isDown || cursors.left.isDown) {
		player.body.velocity.x = -speed;
	}
	else {
		player.body.velocity.x = 0;
	}

	if (game.input.activePointer.isDown && bulletTrigger==true) {
		console.log("pressed");
		initBullets();
		createPlayerBullets();
		bulletTrigger = false;
	}
	else if (game.input.activePointer.isUp) {
		bulletTrigger = true;
	}
	else {
		//Placeholder
	}

	if (space.isDown && speedTrigger==true) {
		speed = 600;
		console.log("speed");
		speedTrigger = false;
	}
	else if (space.isUp) {
		speed = 175;
		speedTrigger = true;
	}
	else {
		//placeholder
	}

	mouseX = game.input.x;
	mouseY = game.input.y;
	// console.log(mouseX, mouseY);
	controlAiming(primaryCrosshair, mouseX, mouseY);

	game.physics.arcade.overlap(player,food,eatFood);
}

//various functions for controlling the game
function createCrosshair(x,y) {
	var crosshair = game.add.sprite(x,y,"crosshair");
	crosshair.anchor.setTo(0.5,0.5);
	game.physics.arcade.enable(crosshair);
	crosshair.body.collideWorldBounds = true;
	return crosshair;
}

function controlAiming(crosshair, x, y){
	crosshair.x = x;
	crosshair.y = y;
	if(crosshair.x<crosshair.width/2){
		crosshair.x = crosshair.width/2;
	}
	else if (crosshair.x > game.world.width - crosshair.width/2){
		crosshair.x = game.world.width - crosshair.width / 2;
	}

	if(crosshair.y<crosshair.height/2){
		crosshair.y = crosshair.height/2;
	}
	else if (crosshair.y > game.world.height - crosshair.height/2){
		crosshair.y = game.world.height - crosshair.height / 2;
	}
};

function initBullets() {
	playerBullets = game.add.group();
	playerBullets.enableBody = true;
};

function createPlayerBullets() {
	var bullet = playerBullets.getFirstExists(false);
	if (!bullet) {
		bullet = new titanfallTimeCrunch.PlayerBullet(game, player.x,
			player.top)
		playerBullets.add(bullet);
	}
	else {
		// reseting the position of the bullet
		bullet.reset(player.x, player.top);
	}
	// bullet.body.velocity.y = bulletSpeed;
	game.physics.arcade.moveToPointer(bullet, bulletSpeed);
};

function eatFood(player,food) {
	food.kill()
	score = score + 1;
	scoreText.text = score;
};