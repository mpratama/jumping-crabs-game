class Lv01 extends Phaser.Scene {
    constructor() {
        super({
			key: "l01"
		});
    }

    preload(){
		this.load.image('smile', '../assets/senyum.jpg');
		this.load.image('ground', '../assets/platform.png');
		this.load.tilemapTiledJSON('lv01', '../assets/map.json');
		this.load.image('LandTile', '../assets/Land.png');
	}

    create(){
		
		this.tmap = this.make.tilemap({key: 'lv01'});
		this.tile1 = this.tmap.addTilesetImage('Land', 'LandTile');
		this.layer1 = this.tmap.createStaticLayer("00", this.tile1, 0, 0);
		this.layer1.setCollisionByProperty({collides: true});
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.teks = this.add.text(10, 10, "");
		this.player = this.physics.add.image(100, 334.5, 'smile').setInteractive();
		this.physics.world.setBounds(0, 0, 1120, 704);
		this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
		this.cameras.main.setBounds(0, 0, 1120, 704);
		this.cameras.main.setBackgroundColor(0x7fdbda);
		
		this.physics.add.collider(this.player, this.layer1, null, null, this);
		
		this.player.setActive(true);
		this.player.setCollideWorldBounds(true);
		this.player.setVelocity(100, 0);
		this.player.setBounce(1, 0);
		
		this.physics.add.collider(this.player, [this.ground, this.ground2]);
		this.teks = this.add.text(10, 10, "").setScrollFactor(0);
		
	}
	
	update(){
		this.screenpointer = this.input.activePointer;
		
		if (this.screenpointer.isDown && this.player.body.blocked.down){
			this.player.setVelocityY(-300);
		}
		
		this.teks.setText(this.player.body.blocked.down ? "Touching" : "Not touching");
        
	}
}
