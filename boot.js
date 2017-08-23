var BootState = {
	init: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.scale.refresh();
	},
	preload: function() {
		game.load.image('loading', 'asset/progressBar.png');
	},
	create: function() {
		game.stage.backgroundColor = '#fff';
		var bootingText = game.add.text(game.world.centerX, game.world.centerY, 'Booting...');
		bootingText.anchor.setTo(0.5);
		game.state.start('PreloadState', PreloadState);
	}
};