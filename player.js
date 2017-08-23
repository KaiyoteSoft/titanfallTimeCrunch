function initPlayer() {
	player = game.add.sprite(width*0.5, height*0.5, titan);
	//set the anchor point in the center of the sprite
	player.anchor.set(0.5);
	//Enable physics for the player body
	game.physics.enable(player, Phaser.Physics.ARCADE);
	//Have the player collide with the bounds of the world
	player.body.collideWorldBounds=true;
	player.body.allowRotation = false;
	if (difficulty=="Regular") {
		player.health = 15;
	};
	if (difficulty=="Hard") {
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


