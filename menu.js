var difficulty;
var Menu = {
	preload: function() {
		game.load.image('menu', 'asset/menu.png');
		game.load.image('regular', 'asset/regularButton.png');
		game.load.image('hard', 'asset/hard.png');
		game.load.image('instruction', 'asset/instructions.png')
		game.load.audio('electro', 'sound/Elektronomia - Sky High NCS ReleaseQuiet.mp3');
	},
	create: function() {
		this.add.sprite(0,0,'menu');
		this.add.button(123,398,'regular', this.startEasyGame,this);
		this.add.button(503,398,'hard', this.startHardGame, this)
		this.add.button(310,480,'instruction', this.startInstruction, this)
		this.game.scale.pageAlignHorizontally = true;this.game.scale.pageAlignVertically = true;this.game.scale.refresh();
	},
	startEasyGame: function() {
		playerFireRate = 200;
		numEnemies=2;
		enemyTimer = 8;
		enemyFireRate = 4000;
		enemyBulletSpeed = 100;
		swarmSpeed=70;
		rampUp=0.2;
		safeDistance=200;
		difficulty = "regular";
		this.state.start('Game');
	},
	startHardGame: function() {
		difficulty = "hard";
		this.state.start('Game');
	},
	startInstruction: function() {
	this.state.start('Instruction');
	}
};