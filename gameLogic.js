var width = 800;
var height = 600;

var game = new Phaser.Game(width,height,Phaser.AUTO,'', {preload: preload, create: create, update: update});

//Create list of variables needed for the game
var player;
var bullets;
var enemyBullets;
var playerFireRate = 350;
var playerNextFire = 0;
var shieldGroup;
var shieldTimer = 4;

var enemies;
var enemiesTotal = 0;
var enemiesInit = 0;
var numEnemies = 3;

var type;
var swarm;
var movementTrigger = false;
var enemyTimer=6;
var food;
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

var scoreText;
var end = "Game Over";
var healthText;
var speed = 175;
var enemySpeed = 1;
var bulletSpeed = 400;
var score = 0;

function preload() {
	game.stage.backgroundColor = "#eee";
	game.load.image('crosshair', 'asset/crosshair.png');
	game.load.image('player', 'asset/player.png');
	game.load.image('food', 'asset/red-square.png');
	game.load.image('bullet', 'asset/bullet7.png');
	game.load.image('altBullet', 'asset/bullet5.png');
	game.load.image('shooter', 'asset/enemy.png');
	game.load.image('shield', 'asset/shield.png');
}

function create() {
	space = game.input.keyboard.addKey([Phaser.Keyboard.
		SPACEBAR]);
	shift = game.input.keyboard.addKey([Phaser.Keyboard.
		SHIFT]);

// Initializes game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors=game.input.keyboard.createCursorKeys();
//create wasd controls for movement
	topKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	// topKey = game.input.keyboard.addKeyCapture(Phaser.KeyCode.W);
	bottomKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
	leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);

	//Create the player sprite
initPlayer();

//Create the crosshair, additional requirements in
//external function
	primaryCrosshair = createCrosshair(width*0.5, height*0.3);

	shieldText = game.add.text(150, 565, "Shield: Ready");
	healthText = game.add.text(5, 565, "Health:" + player.health);
	endText = game.add.text(350, 300, "");
	scoreText = game.add.text(5,3, score);
	this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

//Adds the player's weapons
	createBullets();
//Initialize the shield
	shieldGroup = [];


// Adds the enemy swarm
	food = game.add.group();
	food.enableBody = true;
    food.physicsBodyType = Phaser.Physics.ARCADE;
    food.createMultiple(10, 'food');
    food.setAll('anchor.x', 0.5);
    food.setAll('anchor.y', 0.5);
    food.setAll('checkWorldBounds', true)

// Creates enemy bullets (code found in other .js file)
createEnemyBullets();

//code for adding shooters controlled by prototype
	enemies = [];
	enemiesTotal = iterateEnemies(numEnemies);
	for (var i=enemiesInit; i<enemiesTotal; i++) {
		enemies.push(new enemyShooter(i, game, player, enemyBullets));
	}
	enemiesInit = enemiesInit + (enemiesTotal-enemiesInit);
	enemiesTotal=enemiesInit+iterateEnemies(numEnemies);

//Start the timer to add enemies 
	// createSwarm();
	game.time.events.add(Phaser.Timer.SECOND*enemyTimer, generateEnemies);
}

/////////////////////////////////////////////// Start of rest of code
//////////////////////////////////////////////
/////////////////////////////////////////////

function iterateEnemies(number) {
	var counter = Math.floor(Math.random() * number)+1;
	return counter;
}

function generateEnemies() {
	// var type = Math.floor(Math.random() * 3);
	if (player.alive==true) {
		if (enemyTimer >= 2) {
			enemyTimer = enemyTimer-0.5;
		}
		console.log(enemyTimer);
		game.time.events.add(Phaser.Timer.SECOND*enemyTimer, generateEnemies);
	}
	type = 1;
	if (type==0) {
		createSwarm(); 
	};
	if (type==1) {
		for (var i=enemiesInit; i<enemiesTotal; i++) {
			enemies.push(new enemyShooter(i, game, player, enemyBullets));
		}
		enemiesInit = enemiesInit + (enemiesTotal-enemiesInit);
		enemiesTotal=enemiesInit+iterateEnemies(numEnemies);
		type=3;
	}
	if (type==2) {
		createSwarm();
		createShooter();
		// movementTrigger = true;
	}

}

function createSwarm() {
    for (var y = 0; y < 3; y++)
    {
        for (var x = 0; x < 5; x++)
        {
            var enemy = food.create(x * 40, y * 42, 'food');
            enemy.anchor.setTo(0.5, 0.5);
        }
    }
    // if (food.countDead > 0){
    // var xPos = Math.floor(Math.random() * 800);
    // swarm = food.getFirstDead();
    // swarm.reset(xPos, 50);
	// };
}

function descend(playerx, playery) {
	var x = playerx - player.width/2;
	var y = playery - player.height/2;
	if (x >= food.x) {
		food.x += enemySpeed;
	};
	if (x < food.x) {
		food.x -=enemySpeed;
	}
	if (y >= food.x) {
		food.y += enemySpeed;
	}
	if (y < food.y) {
		food.y -= enemySpeed;
	}

}


function update() {
//Updates the crosshair and the swarm movement
	mouseX = game.input.x;
	mouseY = game.input.y;
	controlAiming(primaryCrosshair, mouseX, mouseY);

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
// rotate the player towards the pointer
	player.rotation = game.physics.arcade.angleToPointer(player);

// fires the bullet (semi-automatic) if the mouse is clicked
	if (game.input.activePointer.isDown && bulletTrigger==true) {
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

//adds shield if shift is pressed
	if (shift.isDown && speedTrigger==true && shieldGroup.length == 0) {
		for (i=0;i<1;i++) {
			shieldGroup.push(new Shield(i, game, player))
			game.time.events.add(Phaser.Timer.SECOND*shieldTimer, killShield);

		}
	
		shieldText.text = "Shield: Deployed";
		speedTrigger = false;
	}
	else if (shift.isUp) {
		// speed = 175;
		speedTrigger = true;
	}
	else {
		//placeholder
	}
	
	if (typeof food !== "undefined") {
		descend(player.x, player.y);
	};

//check if the shooter group is alive 
    for (var i = 0; i < enemies.length; i++)
    {
        if (enemies[i].alive)
        {
            game.physics.arcade.collide(player, enemies[i].enemy);
            game.physics.arcade.overlap(bullets, enemies[i].enemy, collisionHandler2, null, this);
            enemies[i].update();
        }
    }
    for (var i=0;i<shieldGroup.length;i++) {
	    if (shieldGroup[i].alive) {
			game.physics.arcade.overlap(enemyBullets, shieldGroup[i].shield, damageShield, null, this);
	    }
	}

	game.physics.arcade.overlap(player,food,eatFood);
	game.physics.arcade.overlap(enemyBullets, player, endGame, null, this);
    game.physics.arcade.overlap(bullets, food, collisionHandler, null, this);
}

//various functions for controlling the game
function collisionHandler(bullets, enemy) {
    bullets.kill();
    enemy.kill();
    movementTrigger = false;
}

function collisionHandler2(enemy, bullets) {
    bullets.kill();
    var destroyed = enemies[enemy.name].damage();
    if (destroyed == true) {
    	score = score+1;
    	scoreText.text = score;
    }
    // enemyBullets.removeAll();
}

function damageShield(shield, enemyBullets) {
	enemyBullets.kill();
	var damage = shieldGroup[shield.name].damage();
	if (damage==true) {
		console.log("Shield destroyed");
		shieldGroup = [];
		shieldText.text = "Shield: Ready";
	}
}

function killShield() {
	for (var i=0;i<shieldGroup.length;i++) {
		if (shieldGroup[i].alive) {
			killShield2(shieldGroup[i].shield);
		}
	}
}

function killShield2(shield) {
	for (var i=0; i<4; i++) {
		shieldGroup[shield.name].damage();
	}
	shieldGroup = [];
	shieldText.text = "Shield: Ready";
}

function eatFood(player,food) {
	player.health = 0;
	healthText.text = "Health: "+player.health;
	player.kill()
	endText.text = end;
	bullets.removeAll();
};

function endGame(player, enemyBullets) {
	enemyBullets.kill();
	player.health = player.health - 1;
	healthText.text = "Health: "+player.health;
	if (player.health <=0) {
		player.kill();
		endText.text = end;
		bullets.removeAll();
	}
};

