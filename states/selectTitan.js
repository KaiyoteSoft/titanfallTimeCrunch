var SelectTitan = {
	preload: function() {

	},
	create: function() {
		var fontStyle = { font:"40px Courier", align:"center"};
		game.stage.backgroundColor = "#eee";
		var titanText = game.add.text(game.world.centerX, 50, "Select Titan:", fontStyle);
		titanText.anchor.setTo(0.5);
		this.add.button(100,100, 'toneCard', this.selectTone, this);
		this.add.button(450,100, 'roninCard', this.selectRonin, this);
	},
	selectTone: function() {
		titan="tone";
		this.state.start('Game');
	},
	selectRonin: function() {
		titan="ronin";
		playerFireRate=playerFireRate+75;
		bulletSpeed = bulletSpeed+150;
		speed=speed+35;
		this.state.start('Game');
	}
}