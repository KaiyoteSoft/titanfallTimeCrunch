var width = 800;
var height = 600;


//Create list of variables needed for the game
var player;
var bullets;
var enemyBullets;
var playerNextFire = 0;
var playerFireRate = 350;
var shieldGroup;
var shieldTimer = 4;

var enemies;
var enemiesTotal = 0;
var enemiesInit = 0;
var numEnemies = 3;

var type;
var swarm;
var swarmGroup;
var swarmInit = 0;
var swarmTotal = 2;

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

var Game = {
	preload: function() {
		game.stage.backgroundColor = "#eee";
		game.load.image('crosshair', 'asset/crosshair.png');
		game.load.image('player', 'asset/player.png');
		game.load.image('food', 'asset/zombie.png');
		game.load.image('bullet', 'asset/bullet7.png');
		game.load.image('altBullet', 'asset/bullet5.png');
		game.load.image('shooter', 'asset/enemy.png');
		game.load.image('shield', 'asset/shield2.png');
		game.load.image('loading', 'asset/progressBar.png');

		// game.load.script('splash', 'states/splash.js');
	},

	create: function() {
	//Add the different game states
		// game.state.add("splash", splash);
		// game.state.start("splash");

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
		levelText = game.add.text(5,40, '');
		scoreText = game.add.text(5,3, score);
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

	//Adds the player's weapons
		createBullets();
	//Initialize the shield
		shieldGroup = [];
	//Create the swarm group

	// Creates enemy bullets (code found in other .js file)
	createEnemyBullets();

	//code for adding shooters controlled by prototype
		enemies = [];
		enemiesTotal = iterateEnemies(numEnemies);
		initShooter();

	//Start the timer to add enemies 
		swarmGroup = [];
		// initSwarm();

		game.time.events.add(Phaser.Timer.SECOND*enemyTimer, generateEnemies);
	//loads music
		music = game.add.audio('electro');
		music.play();
	},

//generateEnemies() and iterateEnemies() is in enemySwarm.js

	update: function() {
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
	// Checks for hit detection on the shield
	    for (var i=0;i<shieldGroup.length;i++) {
		    if (shieldGroup[i].alive) {
				game.physics.arcade.overlap(enemyBullets, shieldGroup[i].shield, damageShield, null, this);
		    }
		}
	// And hit detection on the swarm group 
		for (var i=0;i<swarmGroup.length;i++) {
			if (swarmGroup[i].alive) {
				game.physics.arcade.overlap(bullets, swarmGroup[i].swarm, collisionHandler, null, this);
				game.physics.arcade.overlap(swarmGroup[i].swarm, player, eatFood, null, this);
				swarmGroup[i].update();
			}
		}


		game.physics.arcade.overlap(player,food,eatFood);
		game.physics.arcade.overlap(enemyBullets, player, this.endGame, null, this);
	    game.physics.arcade.overlap(bullets, food, collisionHandler, null, this);
	},

	//various functions for controlling the game

	endGame: function(player, enemyBullets) {
		enemyBullets.kill();
		player.health = player.health - 1;
		healthText.text = "Health: "+player.health;
		if (player.health <=0) {
			music.pause();
			music.mute = true;
			player.kill();
			endText.text = end + "\n Ctrl+R to restart";
			levelText.text = "Difficulty: "+difficulty;
			bullets.removeAll();
		}
	}

};

