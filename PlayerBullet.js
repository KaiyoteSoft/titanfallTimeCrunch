var titanfallTimeCrunch = titanfallTimeCrunch || {};

titanfallTimeCrunch.PlayerBullet = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, "bullet");

	this.anchor.setTo(0.5);
	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
}

titanfallTimeCrunch.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
titanfallTimeCrunch.PlayerBullet.prototype.constructor = titanfallTimeCrunch.PlayerBullet;