// food = game.add.group();
// food.enableBody = true;
// food.physicsBodyType = Phaser.Physics.ARCADE;
// food.createMultiple(10, 'food');
// food.setAll('anchor.x', 0.5);
// food.setAll('anchor.y', 0.5);
// food.setAll('checkWorldBounds', true)

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
	var x = game.world.randomX;
	var y = 0

	this.swarm = game.add.sprite(x, y, 'food');
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
	this.swarm.rotation = game.physics.arcade.moveToObject(this.swarm, player, 100);
}