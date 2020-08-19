class PlayScene extends Phaser.Scene {
    constructor() {
        super({
			key: "playScene"
		});
    }

    preload(){
		this.load.tilemapTiledJSON('lv01', '../assets/map.json');
		this.load.image('LandTile', '../assets/Land.png');
		this.load.image('bg', '../assets/bg.png');
		this.load.spritesheet('char', '../assets/piting2.png', {frameWidth: 30, frameHeight: 42});
	}

    create(){
    	this.mlem = 0;
    	this.mlom = 0;
		
		this.bg = this.add.image(0, 0, 'bg').setOrigin(0).setScrollFactor(0);
		this.tmap = this.make.tilemap({key: 'lv01'});
		this.tile1 = this.tmap.addTilesetImage('Land', 'LandTile');
		this.layer0 = this.tmap.createStaticLayer("00", this.tile1, 0, 0);
		this.layer1 = this.tmap.createStaticLayer("01", this.tile1, 0, 0);
		this.layer1.setCollisionByProperty({collides: true});
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.teks = this.add.text(10, 10, 0);

		this.player = this.physics.add.sprite(80, 1420, "char", 0);
		this.player.body.setSize(30,25);
		this.player.body.setOffset(0,16);

		this.pl01 = this.add.zone(0, 500, 500, 30);

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

        this.deadZone = this.add.zone(0, 1540, 2560, 1);
        this.deadZone.setOrigin(0);
        this.physics.add.existing(this.deadZone);
        this.deadZone.body.setAllowGravity(false);

		this.physics.world.setBounds(0, 0, 2560, 1600);
		this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
		this.cameras.main.setBounds(0, 0, 2560, 1600);
		
		this.physics.add.collider(this.player, this.layer1, null, null, this);
		this.physics.add.overlap(this.player, this.deadZone, () => {
			//this.deadZone.active = false;
			this.deadZone.destroy();
			this.cameras.main.stopFollow();
			this.player.body.destroy();
			this.cameras.main.flash(800, 255, 0, 0);
			this.player.setVisible(false);
			setTimeout(() => this.scene.restart(), 5000);
		}, null, this);
		
		this.player.setActive(true);
		this.player.setCollideWorldBounds(true);
		this.player.setVelocity(60, 0);
		this.player.setBounce(1, 0);
		
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
