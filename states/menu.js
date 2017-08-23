var difficulty;
var titan;
var Menu = {
	preload: function() {
	},
	create: function() {
		this.add.sprite(0,0,'menu');
		this.add.button(123,398,'regular', this.startEasyGame,this);
		this.add.button(503,398,'hard', this.startHardGame, this)
		this.add.button(310,480,'instruction', this.startInstruction, this)
	},
	startEasyGame: function() {
		playerFireRate = playerFireRate-100;
		numEnemies=2;
		enemyTimer = 8;
		enemyFireRate = 4000;
		enemyBulletSpeed = 100;
		swarmSpeed=70;
		rampUp=0.2;
		safeDistance=200;
		difficulty = "Regular";
		this.state.start('SelectTitan');
	},
	startHardGame: function() {
		difficulty = "Hard";
		this.state.start('SelectTitan');
	},
	startInstruction: function() {
	this.state.start('Instruction');
	}
};