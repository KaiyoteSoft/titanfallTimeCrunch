var randNum;
var PreloadState = {
	preload: function() {
		var fontStyle = {font:"16px Courier", align:"center"};

//Load the progress bar
		var loadingBar = game.add.sprite(game.world.centerX, game.world.centerY-150, 'loading');
		loadingBar.anchor.setTo(0.5);
		game.load.setPreloadSprite(loadingBar);
		var readyText = game.add.text(game.world.centerX, game.world.centerY-185, "Loading...");
		readyText.anchor.setTo(0.5);	

		var preloadText = game.add.text(game.world.centerX, game.world.centerY-270,"Preloading assets. This will take a few minutes the first time.", fontStyle);
		var preloadText2 = game.add.text(game.world.centerX, game.world.centerY-240, "But after this, the game will load almost instantly!", fontStyle);
		var preloadText3 = game.add.text(game.world.centerX, game.world.centerY-50, "Inspiration for this game came from the first person/mech shooter Titanfall.", fontStyle);
		var preloadText4 = game.add.text(game.world.centerX, game.world.centerY-20, "Therefore, the titan classes are named after mechs from the game.", fontStyle);
		var preloadText5 = game.add.text(game.world.centerX, game.world.centerY+10, "It's important to note that SPACE fires bullets,", fontStyle);
		var preloadText6 = game.add.text(game.world.centerX, game.world.centerY+40, "even though you aim with the mouse.", fontStyle);
		var preloadText7 = game.add.text(game.world.centerX, game.world.centerY+100, "Titans have varying abilities, be sure to test them out.", fontStyle);
		var preloadText8 = game.add.text(game.world.centerX, game.world.centerY+130, "Visit the INSTRUCTIONS tab in the menu if you have any questions!", fontStyle);


		preloadText.anchor.setTo(0.5);
		preloadText2.anchor.setTo(0.5);
		preloadText3.anchor.setTo(0.5);
		preloadText4.anchor.setTo(0.5);
		preloadText5.anchor.setTo(0.5);
		preloadText6.anchor.setTo(0.5);
		preloadText7.anchor.setTo(0.5);
		preloadText8.anchor.setTo(0.5);

		game.load.image('menu', 'asset/menu.png');
		game.load.image('regular', 'asset/regularButton.png');
		game.load.image('hard', 'asset/hard.png');
		game.load.image('instruction', 'asset/instructions.png')
		game.load.audio('electro', 'sound/Elektronomia - Sky High NCS ReleaseQuiet.mp3');

		game.load.image('controls', 'asset/controlsInstruction2.jpg');
		game.load.image('menuButton', 'asset/menuButton.png');
		game.load.image('toneCard', 'asset/toneCard.png');
		game.load.image('roninCard', 'asset/roninCard.png');

		game.load.image('crosshair', 'asset/crosshair.png');
		game.load.image('tone', 'asset/player.png');
		game.load.image('ronin', 'asset/player2.png');
		game.load.image('food', 'asset/zombie.png');
		game.load.image('bullet', 'asset/bullet7.png');
		game.load.image('altBullet', 'asset/bullet5.png');
		game.load.image('shooter', 'asset/enemy.png');
		game.load.image('shield', 'asset/shield2.png');
		game.load.image('block', 'asset/block.png');
	},
	create: function() {
		randNum = Math.floor(Math.random() * 7);

		// game.stage.backgroundColor = '#ebebeb';

		game.state.start('Menu');

	}
};