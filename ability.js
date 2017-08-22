var typeDefense;
var damageCounter;

function Shield(index, game, player) {
	this.alive = true;
	if (titan=="ronin") {
		typeDefense = 'block';
		damageCounter = 1000;
	};
	if (titan=="tone") {
		typeDefense = 'shield';
		damageCounter = 4;
	}

	this.shield = game.add.sprite(player.x, player.y, typeDefense);
	this.shield.anchor.set(0.5);
	this.shield.name = index.toString();
	console.log(this.shield.name);
	game.physics.enable(this.shield, Phaser.Physics.ARCADE);
	this.shield.body.immovable = false;
	this.shield.body.collideWorldBounds = true;
	if (titan=="tone") {
		this.shield.body.bounce.setTo(1,1);
		game.physics.arcade.velocityFromRotation(this.shield.rotation, 100, this.shield.body.velocity)
		game.physics.arcade.moveToPointer(this.shield, 80);
		this.health = 4;

	};
	if (titan=='ronin') {
		this.health = 1000;
	}
	this.shield.rotation = game.physics.arcade.angleToPointer(this.shield);
}

Shield.prototype.damage = function() {
	this.health -= 1;
	if (this.health<=0) {
		this.alive=false;
		this.shield.kill();
		return true;
	}
	return false;
}

Shield.prototype.update = function() {
	this.shield.x = player.x;
	this.shield.y = player.y;
}

function damageShield(shield, enemyBullets) {
	enemyBullets.kill();
	var destroyed = shieldGroup[shield.name].damage();
	if (destroyed==true) {
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
	for (var i=0; i<damageCounter; i++) {
		shieldGroup[shield.name].damage();
	}
	shieldGroup = [];
	shieldText.text = "Shield: Ready";
}