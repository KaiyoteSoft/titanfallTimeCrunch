// var enemy;
var dangerBullets
function enemyShooter(index, game, player, enemyBullets) {
	var x = game.world.randomX;
	var y = game.world.randomY;
	dangerBullets = enemyBullets;
	this.fireRate = 2000;
	this.nextFire = 0;
	this.alive = true;
	this.health = 1;

	this.enemy = game.add.sprite(x,y,'shooter');
	this.enemy.anchor.set(0.5);
	this.enemy.name = index.toString();
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
	if (game.time.now > this.nextFire && dangerBullets.countDead() > 0) {
		this.nextFire = game.time.now + this.fireRate;
		var dangerBullet = dangerBullets.getFirstDead();
		dangerBullet.reset(this.enemy.x, this.enemy.y);
		dangerBullet.rotation = game.physics.arcade.moveToObject(dangerBullet, player, 200);
	}
}