var Instruction = {
	preload: function() {
		game.stage.backgroundColor = "#e6e6e6";
	},

	create: function() {
		var fontStyle = { font:"25px ", align:"center"};
		this.add.sprite(10,130,'controls');
		this.add.button(600,510,'menuButton',this.startMenu, this);
		var instructionText = game.add.text(10,10,"- Your goal is to get the highest score possible by killing enemies.",fontStyle);
		var instructionText2 = game.add.text(10,40,"- Zombies will kill you instantly if you touch them. Stay away from the edge.",fontStyle);
		var instructionText3 = game.add.text(10,85,"* Your shield will move toward your mouse at the moment of deployment.",fontStyle);
		var instructionText4 = game.add.text(10,115,"* Constant motion makes you a more difficult target for shooters.", fontStyle);
		// var instructionText = game.add.text(350,300,"Hello world");
	},
	startMenu: function() {
		game.state.start('Menu');
	}
};