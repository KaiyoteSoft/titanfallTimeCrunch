var width = 800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO,'', {preload: preload, create: create, update: update});

var Bullet = function (game,key) {
	Phaser.Sprite.call(this, game, 0, 0, key);
	this.texture.baseTexture.scaleMode = 
	PIXI.scaleModes.NEAREST;
	this.anchor.set(0.5);
	this.checkWorldBounds=true;
	this.outOfBoundsKill=true;
	this.exists = false;

	this.tracking=false;
	this.scaleSpeed=0;
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet; 

Bullet.prototype.fire = function (x,y,angle,speed,gx,gy) {
	gx=gx||0;
	gy=gy||0;
	this.reset(x,y);
	this.scale.set(1)

	this.game.physics.arcade.velocityFromAngle(angle, speed, 
		this.body.velocity);

	this.angle = angle;
	this.body.gravity.set(gx,gy);
}

Bullet.prototype.update = function () {
	if (this.tracking) {
		this.rotation = Math.atan2(this.body.velocity.y, 
			this.body.velocity.x);
	}
	if (this.scaleSpeed > 0) {
		this.scale.x+= this.scaleSpeed;
		this.scale.y += this.scaleSpeed;
	}
};

var Weapon={}

Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireRate = 100;

    for (var i = 0; i < 64; i++)
    {
        this.add(new Bullet(game, 'bullet5'), true);
    }

    return this;

};


Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {
	if (this.game.time.time < this.nextFire) {
		return;
	}
	var x = source.x+10
	var y = source.y+10;
	this.getFirstExists(false).fire(x,y,0,this.bulletSpeed, 0,0);
	this.nextFire = this.game.time.time + this.fireRate;
};

//Create list of variables needed for the game
var player;
var food;
var cursors;
var topKey;
var bottomKey;
var leftKey;
var rightKey;
var space;
var weapons = []

var speed = 175;
var score = 0;
var scoreText;

function preload() {
	game.stage.backgroundColor = "#eee";
	game.load.image('player', 'asset/blue-square.png');
	game.load.image('food', 'asset/red-square.png');
	game.load.image('bullet', 'asset/bullet5.png')
}

function create() {
//Ads weapons
	weapons.push(new Weapon.SingleBullet(this.game));
	space = game.input.keyboard.addKey([Phaser.Keyboard.
		SPACEBAR]);

// Initializes game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors=game.input.keyboard.createCursorKeys();
//create wasd controls for plability
	topKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
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

	// if (space.isDown) {
	// 	this.weapons[this.currentWeapon].fire(player);
	// }
	game.physics.arcade.overlap(player,food,eatFood);
}

function eatFood(player,food) {
	food.kill()
	score = score + 1;
	scoreText.text = score;
}