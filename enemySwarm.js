var swarmSpeed = 100;
var posValue = 200;
var negValue = -200;
var safeDistance;
var safeDistance2;
var rampUp = 0.5;

function iterateEnemies(number) {
	var counter = Math.floor(Math.random() * number)+1;
	return counter;
};

function generateEnemies() {
	type = Math.floor(Math.random() * 3);
	// type = 1;
	if (player.alive==true) {
		if (enemyTimer >= 2) {
			enemyTimer = enemyTimer-0.5;
		}
		game.time.events.add(Phaser.Timer.SECOND*enemyTimer, generateEnemies);
	}
	// type = 1;
	if (type==0) {
		initSwarm();
	};
	if (type==1) {
		initShooter();
		type=3;
	}
	if (type==2) {
		initShooter();
		initSwarm();
		// movementTrigger = true;
	}
};

function initSwarm() {
	// Adds the enemy swarm
	for (var i=swarmInit; i<swarmTotal;i++) {
		swarmGroup.push (new enemySwarm(i, game, player))
	}
	swarmInit = swarmInit + (swarmTotal-swarmInit);
	swarmTotal = swarmInit+iterateEnemies(numEnemies);
}

function enemySwarm(index, game, player) {
	this.alive = true;
	this.health = 1;
	var safeSpace;
	var safeSpace2;
	var safeSpace3;
	var safeSpace4;
	var maxDistance;
	var randTrigger = Math.floor(Math.random()*2);
	var randTrigger2 = Math.floor(Math.random()*2);
	// var randTrigger = 1;

	if (randTrigger2==0) {
		maxDistance = 500;
	};
	if (randTrigger2==1) {
		maxDistance = -500;
	};
	if (randTrigger==0) {
		maxDistance2 = 500;
	}
	if (randTrigger==1) {
		maxDistance2 = -500;
	}

	safeSpace = Math.floor(Math.random() * maxDistance);
	if (safeSpace>=0) {
		safeDistance = posValue;
		safeSpace3 = safeSpace+safeDistance;
	}
	if (safeSpace<0) {
		safeDistance = negValue;
		safeSpace3 = safeSpace+safeDistance;
	}

	// if (safeSpace3 < 150 && safeSpace3 > 0) {
	// 	console.log('X Position: ' + safeSpace3);
	// }
	// if (safeSpace3 > -150 && safeSpace3 < 0) {
	// 	console.log('X position: ' + safeSpace3);
	// }

	safeSpace2 = Math.floor(Math.random()*maxDistance2);
	if (safeSpace2>=0) {
		safeDistance2 = posValue;
		safeSpace4 = safeSpace2+safeDistance2;
	}
	if (safeSpace2<0) {
		safeDistance2 = negValue;
		safeSpace4 = safeSpace2+safeDistance2;
	}

	// if (safeSpace4 < 150 && safeSpace4 > 0) {
	// 	console.log('Y position: ' + safeSpace4);
	// }
	// if (safeSpace4 > -150 && safeSpace4 < 0) {
	// 	console.log('Y position: ' + safeSpace4);
	// }

	// if (randTrigger==1) {
	// 	safeSpace = Math.floor(Math.random()*-500)-safeDistance;
	// 	// console.log(safeSpace);
	// }

	this.swarm = game.add.sprite(player.x+safeSpace3, player.y+safeSpace4, 'food');
	this.swarm.anchor.set(0.5);
	this.swarm.name = index.toString();
	// console.log(this.swarm.name);
	game.physics.enable(this.swarm, Phaser.Physics.ARCADE);
	this.swarm.body.immovable = false;
	this.swarm.body.collideWorldBounds = true;
}

enemySwarm.prototype.damage = function() {
	this.health -= 1;
	if (this.health<=0) {
		this.alive = false;
		this.swarm.kill();
		return true;
	}
	return false;
}

enemySwarm.prototype.update = function() {
	this.swarm.rotation = game.physics.arcade.moveToObject(this.swarm, player, swarmSpeed);
}

function collisionHandler(swarm, bullets) {
    bullets.kill();
    var destroyed = swarmGroup[swarm.name].damage();
    if (destroyed==true) {
    	score = score+1;
    	scoreText.text = "Score: "+score;
    }
    // enemy.kill();
    // movementTrigger = false;
}

function eatFood(food,player) {
	player.health = 0;
	healthText.text = "Health: "+player.health;
	player.kill()
	music.mute = true;
	// game.sound.stopAll();
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
};


// food = game.add.group();
// food.enableBody = true;
// food.physicsBodyType = Phaser.Physics.ARCADE;
// food.createMultiple(10, 'food');
// food.setAll('anchor.x', 0.5);
// food.setAll('anchor.y', 0.5);
// food.setAll('checkWorldBounds', true)

// function createSwarm() {
//     for (var y = 0; y < 3; y++)
//     {
//         for (var x = 0; x < 5; x++)
//         {
//             var enemy = food.create(x * 40, y * 42, 'food');
//             enemy.anchor.setTo(0.5, 0.5);
//         }
//     }
//     // if (food.countDead > 0){
//     // var xPos = Math.floor(Math.random() * 800);
//     // swarm = food.getFirstDead();
//     // swarm.reset(xPos, 50);
// 	// };
// }

// function descend(playerx, playery) {
// 	var x = playerx - player.width/2;
// 	var y = playery - player.height/2;
// 	if (x >= food.x) {
// 		food.x += enemySpeed;
// 	};
// 	if (x < food.x) {
// 		food.x -=enemySpeed;
// 	}
// 	if (y >= food.x) {
// 		food.y += enemySpeed;
// 	}
// 	if (y < food.y) {
// 		food.y -= enemySpeed;
// 	}

// }