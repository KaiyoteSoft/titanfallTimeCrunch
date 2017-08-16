var swarmSpeed = 100;
var safeDistance=100;
var rampUp = 0.5;

function iterateEnemies(number) {
	var counter = Math.floor(Math.random() * number)+1;
	return counter;
};

function generateEnemies() {
	type = Math.floor(Math.random() * 3);
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
	var randTrigger = Math.floor(Math.random()*2);
	// var randTrigger = 1;
	if (randTrigger==0) {
		safeSpace = Math.floor(Math.random() * 500)+safeDistance;
		console.log(safeSpace);
	}
	if (randTrigger==1) {
		safeSpace = Math.floor(Math.random()*-500)-safeDistance;
		console.log(safeSpace);
	}

	this.swarm = game.add.sprite(player.x+safeSpace, player.y+safeSpace, 'food');
	this.swarm.anchor.set(0.5);
	this.swarm.name = index.toString();
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
    var damage = swarmGroup[swarm.name].damage();
    if (damage==true) {
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
	endText.text = end + "\n Ctrl+R to restart";
	bullets.removeAll();
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