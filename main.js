var game = new Phaser.Game(width,height,Phaser.AUTO,'');

game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState)
game.state.add('Menu', Menu);
game.state.add('Instruction', Instruction);
game.state.add('SelectTitan', SelectTitan);
game.state.add('Game', Game)

game.state.start('BootState');
// var game = new Phaser.Game(width,height,Phaser.AUTO,'', {preload: preload, create: create, update: update});

