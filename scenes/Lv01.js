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
		//console.log(map);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.teks = this.add.text(10, 10, "");
		this.gambar = this.physics.add.image(100, 334.5, 'smile').setInteractive();
		this.physics.world.setBounds(0, 0, 1120, 704);
		this.cameras.main.startFollow(this.gambar, true, 0.09, 0.09);
		this.cameras.main.setBounds(0, 0, 1120, 704);
		
		this.physics.add.collider(this.gambar, this.layer1, null, null, this);
		//this.plane = this.add.group();

		//this.ground = this.physics.add.image(200, 359, 'ground');
		//this.ground2 = this.physics.add.image(400, 339, 'ground');
		
		this.gambar.setActive(true);
		this.gambar.setCollideWorldBounds(true);
		this.gambar.setVelocity(100, 0);
		this.gambar.setBounce(1, 0);

		// this.ground.body.allowGravity = false;
		// this.ground.setImmovable(true);
		// this.ground2.body.allowGravity = false;
		// this.ground2.setImmovable(true);

		this.physics.add.collider(this.gambar, [this.ground, this.ground2]);
		this.teks = this.add.text(10, 10, "").setScrollFactor(0);
	}
	
	update(){
		if (this.cursors.up.isDown && this.gambar.body.blocked.down){
			this.gambar.setVelocityY(-300);
		}
		
		this.teks.setText(this.gambar.body.blocked.down ? "Touching" : "Not touching");
        
	}
}
