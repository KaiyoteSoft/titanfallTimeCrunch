var game = new Phaser.Game(width,height,Phaser.AUTO,'');

game.state.add('Menu', Menu);
game.state.add('Instruction', Instruction);
game.state.add('Game', Game)

game.state.start('Menu');
// var game = new Phaser.Game(width,height,Phaser.AUTO,'', {preload: preload, create: create, update: update});

