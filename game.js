let config = {
    width: 667,
	height: 375,
    //backgroundColor: 0x000000,
    version: "1.0",
    title: "Jumping Crab",
    pixelArt: true,
    scene: [PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: { y: 700 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

let game = new Phaser.Game(config);