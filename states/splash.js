splash.prototype = {
	function loadScripts() {
	},
	function loadBgm() {
	},
	function loadImages() {
	},
	function loadFonts() {
	},

	function preload() {
		var loadingBar = game.add.sprite(game.world.centerX, 400, "loading");
		this.load.setPreloadSprite(loadingBar);

		loadScripts();
		loadBgm();
		loadImages();
		loadFonts();
	},

};