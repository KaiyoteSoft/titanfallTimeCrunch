var enemyFireRate = 2500;
var enemyBulletSpeed = 200;

function increaseDifficulty() {
	enemyFireRate = 3000;
	enemyBulletSpeed = 150;
	swarmSpeed = 85;
	difficultyText.text="Level Two";
}

function initShooter() {
	for (var i=enemiesInit; i<enemiesTotal; i++) {
		enemies.push(new enemyShooter(i, game, player, enemyBullets));
	}
	enemiesInit = enemiesInit + (enemiesTotal-enemiesInit);
	enemiesTotal=enemiesInit+iterateEnemies(numEnemies);
}


function createEnemyBullets() {
//Adds the enemy weapons 
	enemyBullets = game.add.group();
	enemyBullets.enableBody = true;
	enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
	enemyBullets.createMultiple(100, 'altBullet');
	enemyBullets.setAll('anchor.x', 0.5);
	enemyBullets.setAll('anchor.y', 1);
	enemyBullets.setAll('outOfBoundsKill', true);
	enemyBullets.setAll('checkWorldBounds', true);
};


var dangerBullets
function enemyShooter(index, game, player, enemyBullets) {
	var x = game.world.randomX;
	var y = game.world.randomY;
	dangerBullets = enemyBullets;
	// this.fireRate = 2000;
	this.nextFire = game.time.now+1000;
	this.alive = true;
	this.health = 1;

	this.enemy = game.add.sprite(x,y,'shooter');
	this.enemy.anchor.set(0.5);
	this.enemy.name = index.toString();
	// console.log(this.enemy.name);
	game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
	this.enemy.body.immovable = false;
	this.enemy.body.collideWorldBounds=true;
	this.enemy.body.bounce.setTo(1,1);

	this.enemy.angle = game.rnd.angle();
	game.physics.arcade.velocityFromRotation(this.enemy.rotation, 100, this.enemy.body.velocity)
}

enemyShooter.prototype.damage = function() {
	this.health -= 1;
	if (this.health <= 0) {
		this.alive=false;
		this.enemy.kill();
		return true;
	}
	return false;
}

enemyShooter.prototype.update = function() {
	this.enemy.rotation = game.physics.arcade.angleBetween(this.enemy, player);
	if (game.time.now > this.nextFire && dangerBullets.countDead() > 0) {
		this.nextFire = game.time.now + enemyFireRate;
		var dangerBullet = dangerBullets.getFirstDead();
		dangerBullet.reset(this.enemy.x, this.enemy.y);
		dangerBullet.rotation = game.physics.arcade.moveToObject(dangerBullet, player, enemyBulletSpeed);
	}
}

function collisionHandler2(enemy, bullets) {
    bullets.kill();
    var destroyed = enemies[enemy.name].damage();
    if (destroyed == true) {
    	score = score+1;
    	scoreText.text = "Score: "+score;
    }
    // enemyBullets.removeAll();
}