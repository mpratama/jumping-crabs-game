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
		this.load.spritesheet('char', '../assets/piting2.png', {frameWidth: 30, frameHeight: 42});
	}

    create(){
    	this.mlem = 0;
    	this.mlom = 0;
		
		this.tmap = this.make.tilemap({key: 'lv01'});
		this.tile1 = this.tmap.addTilesetImage('Land', 'LandTile');
		this.layer1 = this.tmap.createStaticLayer("00", this.tile1, 0, 0);
		this.layer1.setCollisionByProperty({collides: true});
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.teks = this.add.text(10, 10, 0);

		this.player = this.physics.add.sprite(100, 500, "char", 0);
		this.player.body.setSize(30,25);
		this.player.body.setOffset(0,16);
		this.animasiJalan = this.anims.create({
            key: 'jalan',
            frames: this.anims.generateFrameNumbers('char', {
                frames: [0,1]
            }),
            frameRate: 8,
            repeat: -1,
        });
        this.animasiLoncat = this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('char', {
                frames: [2]
            }),
        });
        //this.player.play('jalan');

		this.physics.world.setBounds(0, 0, 1120, 704);
		this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
		this.cameras.main.setBounds(0, 0, 1120, 704);
		this.cameras.main.setBackgroundColor(0x7fdbda);
		
		this.physics.add.collider(this.player, this.layer1, null, null, this);
		
		this.player.setActive(true);
		this.player.setCollideWorldBounds(true);
		this.player.setVelocity(60, 0);
		this.player.setBounce(1, 0);
		
		this.physics.add.collider(this.player, [this.ground, this.ground2]);
		
	}
	
	update(){
		if (this.mlom == 1) {
			this.player.setVelocityX(100);
			setTimeout(() => {
				this.player.setVelocityX(60);
			}, 2000);
			this.mlom = 0;
		}
		this.animJalanCheck();
		this.jumpCheck();      
		this.bumpCheck();  
	}

	animJalanCheck() {
		if (this.player.body.blocked.down && this.player.anims.isPlaying == false){
			this.player.play('jalan');
		}
	}

	jumpCheck() {
		this.screenpointer = this.input.activePointer;
		
		if (this.screenpointer.isDown && this.player.body.blocked.down){
			if (this.mlem == 0){
				this.player.setVelocityY(-300);
			} else if (this.mlem == 1) {
				this.player.setVelocityY(-600);
			}
		}
	}

	bumpCheck() {
		if (this.player.body.blocked.right || this.player.body.blocked.left) {
			if (this.player.body.facing == 13 || ((this.player.body.facing == 11 && this.player.body.blocked.left) || (this.player.body.facing == 12 && this.player.body.blocked.left)) ) {
				this.player.setFlipX(false);
			} else if (this.player.body.facing == 14 || ((this.player.body.facing == 11 && this.player.body.blocked.right) || (this.player.body.facing == 12 && this.player.body.blocked.right)) ){
				this.player.setFlipX(true);
			}
			
		} else if (this.player.body.blocked.none) {
			this.player.play('jump');
			this.player.anims.stop();
		}
	}
}
