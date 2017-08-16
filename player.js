function initPlayer() {
	player = game.add.sprite(width*0.5, height*0.5, 'player');
	//set the anchor point in the center of the sprite
	player.anchor.set(0.5);
	//Enable physics for the player body
	game.physics.enable(player, Phaser.Physics.ARCADE);
	//Have the player collide with the bounds of the world
	player.body.collideWorldBounds=true;
	player.body.allowRotation = false;
	if (difficulty=="regular") {
		player.health = 15;
	};
	if (difficulty=="hard") {
		player.health=10;
	}
};

function createBullets() {
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
}

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

		bullet.rotation = game.physics.arcade.moveToPointer(bullet, bulletSpeed);
    }
}

function Shield(index, game, player) {
	var shieldTrigger = true;
	this.alive = true;
	this.health = 4;
	
	this.shield = game.add.sprite(player.x, player.y, 'shield');
	this.shield.anchor.set(0.5);
	this.shield.name = index.toString();
	game.physics.enable(this.shield, Phaser.Physics.ARCADE);
	this.shield.body.immovable = false;
	this.shield.body.collideWorldBounds = true;
	this.shield.rotation = game.physics.arcade.angleToPointer(this.shield);
	if (shieldTrigger==true) {
		game.physics.arcade.moveToPointer(this.shield, 80);
		shieldTrigger = false;
	}
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
