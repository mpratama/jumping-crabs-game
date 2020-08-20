class PlayScene extends Phaser.Scene {
    constructor() {
        super({
			key: "playScene"
		});
    }

    preload(){
    	this.load.bitmapFont('tikitropic', '../assets/tiki_tropic.png', '../assets/tiki_tropic.xml');
		this.load.tilemapTiledJSON('lv01', '../assets/map.json');
		this.load.image('LandTile', '../assets/Land.png');
		this.load.image('buah', '../assets/cherry.png');
		this.load.image('bg', '../assets/bg.png');
		this.load.spritesheet('char', '../assets/piting2.png', {frameWidth: 30, frameHeight: 42});
	}

    create(){
    	this.firstCutScene = localStorage.getItem("played");
    	this.flying = false;
    	this.movedir = 0;
    	this.jumptext_clicked = false;
		
		this.bg = this.add.image(0, 0, 'bg').setOrigin(0).setScrollFactor(0);
		this.t01 = this.add.bitmapText(10, 1390, 'tikitropic', "I Don't like this soda can!").setFontSize(23).setVisible(false);
		this.t02 = this.add.bitmapText(10, 1390, 'tikitropic', "I have to find my shell").setFontSize(23).setVisible(false);
		this.tmap = this.make.tilemap({key: 'lv01'});
		this.tile1 = this.tmap.addTilesetImage('Land', 'LandTile');
		this.layer0 = this.tmap.createStaticLayer("00", this.tile1, 0, 0);
		this.layer1 = this.tmap.createStaticLayer("01", this.tile1, 0, 0);
		this.jumptext = this.add.bitmapText(540, 310, 'tikitropic', 'jump !').setScrollFactor(0).setVisible(false).setInteractive();
		this.pwUp = this.tmap.getObjectLayer('powerups').objects;
		this.layer1.setCollisionByProperty({collides: true});

		this.jumptext.on('pointerdown', ()=> {
			this.jumptext_clicked = true;
		});

		this.jumptext.on('pointerup', ()=> {
			this.jumptext_clicked = false;
		});

		//this.player = this.physics.add.sprite(80, 1420, "char", 0);
		this.player = this.physics.add.sprite(1362, 108, "char", 0);
		this.player.body.setSize(30,32);
		this.player.body.setOffset(0,9);
		//this.player.body.setAllowGravity(false);

		

		this.buah1 = this.physics.add.image(this.pwUp[0].x, this.pwUp[0].y, 'buah');
		this.buah2 = this.physics.add.image(this.pwUp[1].x, this.pwUp[1].y, 'buah');
		this.buah3 = this.physics.add.image(this.pwUp[2].x, this.pwUp[2].y, 'buah');
		this.buah4 = this.physics.add.image(this.pwUp[3].x, this.pwUp[3].y, 'buah');
		this.buah5 = this.physics.add.image(this.pwUp[4].x, this.pwUp[4].y, 'buah');
		this.buah6 = this.physics.add.image(this.pwUp[5].x, this.pwUp[5].y, 'buah');
		//this.buah7 = this.physics.add.image(this.pwUp[6].x, this.pwUp[6].y, 'buah');

		this.fruits = this.add.group([this.buah1, this.buah2, this.buah3, this.buah4, this.buah5, this.buah6]);
		for (var i=0; i<this.fruits.getChildren().length; i++){
			this.fruits.getChildren()[i].body.setAllowGravity(false);
		}

		this.pl01 = this.add.zone(0, 500, 500, 30);

		this.animWalk = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('char', {
                frames: [4,5]
            }),
            frameRate: 8,
            repeat: -1,
        });
        this.animJump = this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('char', {
                frames: [6]
            }),
        });

        this.deadZone = this.add.zone(0, 1540, 2560, 1);
        this.deadZone.setOrigin(0);
        this.physics.add.existing(this.deadZone);
        this.deadZone.body.setAllowGravity(false);

		this.physics.world.setBounds(0, 0, 2560, 1600);
		//this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
		this.cameras.main.setBounds(0, 0, 2560, 1600);
		
		this.physics.add.collider(this.player, this.layer1, null, null, this);
		this.physics.add.collider(this.fruits, this.layer1, null, null, this);

		this.physics.add.overlap(this.player, this.fruits, () => {
			this.fruits.setAlpha(0.5)
			for (var i=0; i<this.fruits.getChildren().length; i++){
				this.fruits.getChildren()[i].body.enable = false;
			}
			this.accel();
			setTimeout(() => {
				for (var i=0; i<this.fruits.getChildren().length; i++){
					this.fruits.getChildren()[i].body.enable = true;
				}
				this.fruits.setAlpha(1);
			}, 5000);

		}, null, this);

		this.physics.add.overlap(this.player, this.deadZone, () => {
			localStorage.setItem("played", true);
			this.deadZone.destroy();
			this.cameras.main.stopFollow();
			this.player.body.destroy();
			this.cameras.main.flash(1000, 254, 145, 202);
			this.player.setVisible(false);
			setTimeout(() => this.scene.restart(), 1000);
		}, null, this);
		
		this.player.setActive(true);
		this.player.setCollideWorldBounds(true);
		//this.player.setVelocity(70, 0);
		this.player.body.useDamping = true;
		this.player.setBounce(1, 0);

		this.cutscene = this.tweens.createTimeline();
		this.cutscene.add({
			targets: this.cameras.main,
			scrollX: 0,
			scrollY: 1420,
			ease: 'Power1',
			duration: 3000
		});
		this.cutscene.add({
			delay: 1000,
			targets: this.t01,
			y: 1360,
			ease: 'Bounce',
			duration: 1000,
			onStart: () => {
				this.t01.setVisible(true);
			}
		});
		this.cutscene.add({
			targets: this.t01,
			y: 1360,
			duration: 2000,
			onComplete: () => {
				this.t01.destroy();
			}
		});
		this.cutscene.add({
			delay: 1000,
			targets: this.t02,
			y: 1360,
			ease: 'Bounce',
			duration: 1000,
			onStart: () => {
				this.t02.setVisible(true);
			}
		});
		this.cutscene.add({
			targets: this.t02,
			y: 1360,
			duration: 2000,
			onComplete: () => {
				this.t02.destroy();
			}
		});
		this.cutscene.add({
			targets: this.cameras.main,
			scrollX: 0,
			scrollY: 1420,
			duration: 1000,
			onComplete: () => {
				this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
				this.player.setVelocity(70,0);
				this.jumptext.setVisible(true);
			}
		});

		this.firstPlayCheck();
		
	}
	
	update(){
		this.animWalkCheck();
		this.jumpCheck();      
		this.facingCheck();
	}

	firstPlayCheck() {
		if (this.firstCutScene != "true") {
			this.cutscene.play();
			console.log("First cutscene");
		} else if (this.firstCutScene == "true") {
			this.jumptext.setVisible(true);
			this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
			this.player.setVelocity(70, 0);
		}
	}

	animWalkCheck() {
		if (this.player.body.blocked.down && this.player.anims.isPlaying == false){
			this.player.play('walk');
		}
	}

	jumpCheck() {
		if (this.jumptext_clicked && this.player.body.blocked.down){
			if (this.flying){
				this.player.setVelocityY(-370);
			}else if (!this.flying){
				this.player.setVelocityY(-310);
			}
		}
	}

	facingCheck() {

		if (this.player.body.facing == 13 || this.player.body.blocked.right){
			this.player.setFlipX(true);
			this.movedir = -1;
		} else if (this.player.body.facing == 14 || this.player.body.blocked.left){
			this.player.setFlipX(false);
			this.movedir = 1;
		} else if (this.player.body.blocked.none) {
			this.player.play('jump');
			this.player.anims.stop();
		}
	}

	accel(){
		this.flying = true;
		this.player.setVelocityX(200 * this.movedir);
		setTimeout(() => {
			this.flying = false;
			/*this.player.body.setAccelerationX(70);
			this.player.body.setDragX(0.99);*/
			this.player.setVelocityX(70 * this.movedir);
		}, 5000);
	}
}
