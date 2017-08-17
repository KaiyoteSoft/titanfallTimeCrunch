var PreloadState = {
	preload: function() {
//Load the progress bar
		var loadingBar = game.add.sprite(game.world.centerX, game.world.centerY, 'loading');
		loadingBar.anchor.setTo(0.5);
		game.load.setPreloadSprite(loadingBar);

		game.load.image('menu', 'asset/menu.png');
		game.load.image('regular', 'asset/regularButton.png');
		game.load.image('hard', 'asset/hard.png');
		game.load.image('instruction', 'asset/instructions.png')
		game.load.audio('electro', 'sound/Elektronomia - Sky High NCS ReleaseQuiet.mp3');

		game.load.image('controls', 'asset/controlsInstruction.png');
		game.load.image('menu', 'asset/menuButton.png');

		game.load.image('crosshair', 'asset/crosshair.png');
		game.load.image('player', 'asset/player.png');
		game.load.image('food', 'asset/zombie.png');
		game.load.image('bullet', 'asset/bullet7.png');
		game.load.image('altBullet', 'asset/bullet5.png');
		game.load.image('shooter', 'asset/enemy.png');
		game.load.image('shield', 'asset/shield2.png');
	},
	create: function() {
		game.state.start('Menu');
	}
};