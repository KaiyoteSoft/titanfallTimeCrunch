var width = 800;
var height = 600;
// var name; 

//Create list of variables needed for the game
var background;
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
		if (randNum==0) {
			background = '#FFC2C2';
		}
		if (randNum==1) {
			background = '#FFFFC3';
		}
		if (randNum==2) {
			background = '#F5C3FF';
		}
		if (randNum==3) {
			background = '#C3D2FF';
		}
		if (randNum==4) {
			background = '#C3F5FF';
		}
		if (randNum==5) {
			background = '#C6FFC3';
		}
		if (randNum==6) {
			background = '#FFC3F5';
		}
		game.stage.backgroundColor = background;

		// game.add.sprite(0,0,background);

	},

	create: function() {
		// localStorage.setItem("hardHighScore", 0);
		if (difficulty=="Regular") {
			var highScore = localStorage.getItem('regularHighScore');
			var highName = localStorage.getItem('nameRegular');
			if (highScore==null) {
				localStorage.setItem('regularHighScore',0);
			}
			if (highName==null) {
				localStorage.setItem('nameRegular','Anon');
			}
		}
		if (difficulty=="Hard") {
			var highScore = localStorage.getItem('hardHighScore');
			var highName = localStorage.getItem('nameHard');
			if (highScore==null) {
				localStorage.setItem('hardHighScore',0);
			}
			if (highName==null) {
				localStorage.setItem('nameHard','Anon');
			}
		}

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
		difficultyText = game.add.text(650,3,'');
		highScoreText = game.add.text(game.world.centerX, 23, 'High Score ('+highName+': '+highScore+')');
		highScoreText.anchor.setTo(0.5)
		// this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();

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
		// swarmTotal = iterateEnemies(numEnemies);
		// initSwarm();

		game.time.events.add(Phaser.Timer.SECOND*enemyTimer, generateEnemies);
	//loads music
		music = game.add.audio('electro');
		music.play();

		if (difficulty=='Regular') {
			game.time.events.add(Phaser.Timer.SECOND*40, increaseDifficulty);
		}
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
			if (titan=='ronin' && speedTrigger==true) {
				fire();
			};
			if (titan=='tone') {
				fire();
			}
			bulletTrigger = false;

		}
		else if (space.isUp) {
			bulletTrigger = true;
		}
		else {
			//Placeholder
		}

	//adds shield if shift is pressed
	if (titan=="tone") {
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
	};
//adds block around player if titan is ronin
	if (titan=="ronin") {
		if (shift.isDown && speedTrigger==true && shieldGroup.length==0) {
			for (var i=0;i<1;i++) {
				shieldGroup.push(new Shield(i, game, player));
			}
			speed=130;
			shieldText.text = "Barrier: Deployed";
			speedTrigger=false;
		}
		else if (shift.isUp) {
			shieldText.text = "Barrier: Ready";
			speedTrigger = true;
			speed = 175;
			killShield();
		}
		else {}
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
				if (titan=='ronin') {
					shieldGroup[i].update();
				};
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


		game.physics.arcade.overlap(enemyBullets, player, this.endGame, null, this);
	},

	//various functions for controlling the game

	endGame: function(player, enemyBullets) {
		enemyBullets.kill();
		player.health = player.health - 1;
		healthText.text = "Health: "+player.health;
		if (player.health <=0) {
			music.mute = true;
			// game.sound.stopAll();
			player.kill();
			endText.text = end + "\n Ctrl+R to restart";
			levelText.text = "Difficulty: "+difficulty;
			bullets.removeAll();
			if (difficulty=="Hard") {
				var highScore = parseInt(localStorage.getItem("hardHighScore"));
				if (score > highScore) {
					setScore('hard');
				}
			}
			if (difficulty=="Regular") {
				var highScore = parseInt(localStorage.getItem("regularHighScore"));
				if (score > highScore) {
					setScore('regular');
				}
			}
		}
	}
};

function setScore(level) {
	var name = prompt("You have a new high score! Please enter a name:", "");
	if (name==null || name =="") {
		name='Anon';
		if (level=="hard") {
			localStorage.setItem("nameHard", name);
			localStorage.setItem("hardHighScore", score);
		};
		if (level=="regular") {
			localStorage.setItem("nameRegular", name);
			localStorage.setItem("regularHighScore", score);
		};
	}
	else {
		if (level=="hard") {
			localStorage.setItem("nameHard", name);
			localStorage.setItem("hardHighScore", score);
		};
		if (level=="regular") {
			localStorage.setItem("nameRegular", name);
			localStorage.setItem("regularHighScore", score);
		};
	}
}
