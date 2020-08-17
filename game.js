let config = {
    width: 550,
	height: 250,
    //backgroundColor: 0x000000,
    url: "yesbesoklibur.com",
    version: "1.0",
    title: "crabs game",
    pixelArt: true,
    scene: [Lv01],
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: { y: 1000 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

let game = new Phaser.Game(config);