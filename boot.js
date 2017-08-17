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
		game.state.start('PreloadState', PreloadState);
	}
};