var width = 800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO,'', {preload: preload, create: create, update: update});

//Create list of variables needed for the game
var player;
var bullets;
var enemyBullets;
var playerFireRate = 350;
var playerNextFire = 0;

var enemies;
var enemiesTotal = 0;
var enemiesAlive = 0;

var type;
var movementTrigger = false;
var enemyTimer=2;
var food;
var shooter; 
var opponent;
var livingEnemies;
var cursors;
var topKey;
var bottomKey;
var leftKey;
var rightKey;
var space;
var shift;
var firingTimer = 1500;
var bulletTrigger = true;
var mouseX;
var mouseY;
var primaryCrosshair;
var speedTrigger = true;	

var end = "Game Over";
var speed = 175;
var enemySpeed = 1;
var bulletSpeed = 400;
var score = 0;
var scoreText;

function preload() {
	game.stage.backgroundColor = "#eee";
	game.load.image('player', 'asset/blue-square.png');
	game.load.image('food', 'asset/red-square.png');
	game.load.image('bullet', 'asset/bullet6.png');
	game.load.image('altBullet', 'asset/bullet5.png');
	game.load.image('crosshair', 'asset/red-square.png');
	game.load.image('shooter', 'asset/green-square.png');
}

function create() {
	space = game.input.keyboard.addKey([Phaser.Keyboard.
		SPACEBAR]);
	shift = game.input.keyboard.addKey([Phaser.Keyboard.
		SHIFT]);

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

//Enemies are called 'food' in this game
//Calls the functions to create enemies

	scoreText = game.add.text(5,3, score);
	this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

//Adds the player's weapons
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

// Adds the enemy shooter
	shooter = game.add.group();
	shooter.enableBody = true;
	shooter.physicsBodyType = Phaser.Physics.ARCADE;
	shooter.createMultiple(10, 'shooter');
	shooter.setAll('checkWorldBounds', true);

//Adds the enemy weapons 
	enemyBullets = game.add.group();
	enemyBullets.enableBody = true;
	enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	enemyBullets.createMultiple(100, 'altBullet');
	enemyBullets.setAll('anchor.x', 0.5);
	enemyBullets.setAll('anchor.y', 1);
	enemyBullets.setAll('outOfBoundsKill', true);
	enemyBullets.setAll('checkWorldBounds', true);

//code for adding shooters controlled by prototype
	enemies = [];
	enemiesTotal = 5;
	enemiesAlive = 5;
	for (var i=0; i<enemiesTotal; i++) {
		enemies.push(new enemyShooter(i, game, player, enemyBullets));
	}

//Start the timer to add enemies 
// createShooter();
// game.time.events.add(Phaser.Timer.SECOND*enemyTimer, generateEnemies);

}

function generateEnemies() {
	// var type = Math.floor(Math.random() * 3);
	type = 1;
	if (type==0) {
		createSwarm(); 
	};
	if (type==1) {
		createShooter();
		// movementTrigger = true;
	}
	if (type==2) {
		createSwarm();
		createShooter();
		// movementTrigger = true;
	}

}

function createShooter() {
	opponent = shooter.getFirstDead();
    opponent.reset(300, 50);
    var tween = game.add.tween(opponent).to( { x: 400 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
}

function createSwarm() {
	food = game.add.group();
	food.enableBody = true;
    food.physicsBodyType = Phaser.Physics.ARCADE;

    for (var y = 0; y < 3; y++)
    {
        for (var x = 0; x < 5; x++)
        {
            var enemy = food.create(x * 40, y * 42, 'food');
            enemy.anchor.setTo(0.5, 0.5);
        }
    }

    var xPos = Math.floor(Math.random() * 800);
    food.x = xPos;
    food.y = 50;
}


function descend(playerx, playery) {
	var x = playerx;
	var y = playery;
	var centerx = food.x + 100;
	var centery = food.y + 60;
	if (centerx < x) {
		food.x += enemySpeed;
	};
	if (centerx > x) {
		food.x -=enemySpeed;
	}
	if (centery < y) {
		food.y += enemySpeed;
	}
	if (centery > y) {
		food.y -= enemySpeed;
	}

}

function update() {

	//move the player up and down based on keyboard arrows
	if (topKey.isDown || cursors.up.isDown) {
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

// fires the bullet (semi-automatic) if the mouse is clicked
	if (game.input.activePointer.isDown && bulletTrigger==true) {
		// console.log("pressed");
		// enemyFires();
		bulletTrigger = false;
	}
	else if (game.input.activePointer.isUp) {
		bulletTrigger = true;
	}
	else {
		//Placeholder
	}

//fires if the space bar is pressed
	if (space.isDown && bulletTrigger==true) {
		fire();
		bulletTrigger = false;
	}
	else if (space.isUp) {
		bulletTrigger = true;
	}
	else {
		//Placeholder
	}

// makes the player go faster
// if the shift is pressed
	if (shift.isDown && speedTrigger==true) {
		speed = 600;
		speedTrigger = false;
	}
	else if (shift.isUp) {
		speed = 175;
		speedTrigger = true;
	}
	else {
		//placeholder
	}


//timer for the enemy firing
	if (game.time.now > firingTimer && typeof opponent !== "undefined") {
		// var randNum = Math.floor(Math.random() * 4);
		// console.log(randNum);
		enemyFires();
	}

//Updates the crosshair and the swarm movement
	mouseX = game.input.x;
	mouseY = game.input.y;
	controlAiming(primaryCrosshair, mouseX, mouseY);
	
	if (typeof food !== "undefined") {
		descend(player.x, player.y);
	};

//check if the shooter group is alive 
	enemiesAlive = 0;

    for (var i = 0; i < enemies.length; i++)
    {
    	// console.log(enemies[i].alive);
        // if (typeof enemies[i].alive =='undefined')
        if (enemies[i].alive)
        {
            enemiesAlive++;
            // game.physics.arcade.collide(player, enemies[i].tank);
            // game.physics.arcade.overlap(bullets, enemies[i].tank, bulletHitEnemy, null, this);
            enemies[i].update();
        }
    }

	game.physics.arcade.overlap(player,food,eatFood);
	game.physics.arcade.overlap(enemyBullets, player, endGame, null, this);
    game.physics.arcade.overlap(bullets, food, collisionHandler, null, this);
    game.physics.arcade.overlap(bullets, shooter, collisionHandler2, null, this);
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

function fire() {
    if (game.time.now > playerNextFire && bullets.countDead() > 0)
    {
        playerNextFire = game.time.now + playerFireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x - 8, player.y - 8);

        game.physics.arcade.moveToPointer(bullet, bulletSpeed);
    }

}

function collisionHandler(bullets, enemy) {
    bullets.kill();
    enemy.kill();
    movementTrigger = false;
}

function collisionHandler2(bullets, shooter) {
    bullets.kill();
    shooter.kill();
    enemyBullets.removeAll();
}


function enemyFires() {
	enemyBullet = enemyBullets.getFirstExists(false);

	if (enemyBullet) {
		enemyBullet.reset(opponent.body.x, opponent.body.y);
		enemyBullet.rotation = game.physics.arcade.moveToObject(enemyBullet, player, 500);
		game.physics.arcade.moveToObject(enemyBullet, player, 120);
		firingTimer = game.time.now + 2000;
	}
}

function eatFood(player,food) {
	player.kill()
	score = score + 1;
	scoreText.text = end;
	bullets.removeAll();
};

function endGame(enemyBullets, player) {
	enemyBullets.kill();
	player.kill();
	scoreText.text = end;
	bullets.removeAll();
}

