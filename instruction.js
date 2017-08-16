var Instruction = {
	preload: function() {
		game.stage.backgroundColor = "#e6e6e6";
		game.load.image('controls', 'asset/controlsInstruction.png');
		game.load.image('menu', 'asset/menuButton.png');
	},

	create: function() {
		this.add.sprite(100,50,'controls');
		this.add.button(600,510,'menu',this.startMenu, this);
		// var instructionText = game.add.text(350,300,"Hello world");
	},
	startMenu: function() {
		game.state.start('Menu');
	}
};