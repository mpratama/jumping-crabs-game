class Level01 extends Phaser.Scene {
    constructor() {
        super({
            key: 'level01'
        });
    }

    preload() {
        this.load.image('landscapex', 'assets/landscape.png');
        this.load.image('rogueLike', 'assets/roguelikeSheet_transparent.png');
        this.load.tilemapTiledJSON('peta', 'assets/peta.json');
        this.load.spritesheet('kontrol', 'assets/control.png', {frameHeight: 50, frameWidth: 50})
        this.load.spritesheet('char', 'assets/charx.png', {frameHeight: 16, frameWidth:16});
    }
    
    create() {
        //this.cameras.main.setSize(400, 300);
        this.content = ["Kamu menyentuh pohon\nos narok beh\nom fuarrr\nvat vat hanarun."];
        this.content2 = ["qwertyuioplkjhgfdsazxcvbnmnbvcxzasdfghjklpoiuytrew09876"]; //bisa muat 50-55 char perbaris
        this.xax = 0;
        this.panah = this.add.group();
        this.cameras.main.setRoundPixels(true);
        this.lvl1 = this.make.tilemap({key: 'peta'});
        this.tiles = this.lvl1.addTilesetImage('landscape', 'landscapex');
        this.tiles2 = this.lvl1.addTilesetImage('roguelikeSheet_transparent', 'rogueLike');
        this.layer = this.lvl1.createStaticLayer("dasar", [this.tiles, this.tiles2], 0, 0);
        this.layer2 = this.lvl1.createStaticLayer("non_walk", [this.tiles, this.tiles2], 0, 0);

        
        this.layer2.setCollisionByProperty({collides: true});

        this.animasiJalan = this.anims.create({
            key: 'jalan',
            frames: this.anims.generateFrameNumbers('char', {
                frames: [1, 2]
            }),
            frameRate: 8,
            repeat: -1,
        });

        this.orang = this.physics.add.sprite(396, 190, "char", 0);
        this.layer3 = this.lvl1.createStaticLayer("atas_pohon", [this.tiles, this.tiles2], 0, 0);
        this.kotak = this.add.graphics().fillStyle(0x000000, 1).fillRect(10, 5, 480, 80).setScrollFactor(0).setVisible(false);
        this.dialogBox = this.add.bitmapText(20, 10,"gem", "", 17).setScrollFactor(0);
        this.physics.add.collider(this.orang, this.layer2, null, null, this);
        //this.orang.play('jalan');
        this.cameras.main.startFollow(this.orang, true, 0.09, 0.09);
        this.cameras.main.setBounds(0, 0, 640, 400);
        this.kiri = this.add.sprite(50, 220, 'kontrol', 0).setInteractive().setAlpha(0.5).setScrollFactor(0);
        this.bawah = this.add.sprite(50, 300, 'kontrol', 2).setInteractive().setAlpha(0.5).setScrollFactor(0);
        this.atas = this.add.sprite(550, 220, 'kontrol', 3).setInteractive().setAlpha(0.5).setScrollFactor(0);
        this.kanan = this.add.sprite(550, 300, 'kontrol', 1).setInteractive().setAlpha(0.5).setScrollFactor(0);
        this.panah.addMultiple([this.kiri, this.bawah, this.atas, this.kanan]);

        this.kiri.on('pointerdown', () => {
            this.orang.setVelocityX(-60);
            this.orang.play('jalan');
        });

        this.kiri.on('pointerup', () => {
            this.orang.setVelocity(0);
            this.orang.anims.stop();
        });

        this.bawah.on('pointerdown', () => {
            this.orang.setVelocityY(60);
            this.orang.play('jalan');
        });

        this.bawah.on('pointerup', () => {
            this.orang.setVelocity(0);
            this.orang.anims.stop();
        });

        this.atas.on('pointerdown', () => {
            this.orang.setVelocityY(-60);
            this.orang.play('jalan');
        });

        this.atas.on('pointerup', () => {
            this.orang.setVelocity(0);
            this.orang.anims.stop();
        });

        this.kanan.on('pointerdown', () => {
            this.orang.setVelocityX(60);
            this.orang.play('jalan');
        });

        this.kanan.on('pointerup', () => {
            this.orang.setVelocity(0);
            this.orang.anims.stop();
        });
        //this.jam = new Phaser.Time.Clock(this);
        //this.nextLine();
        
    }

    cobafunc(nganu) {
        if (nganu.x == 300 || nganu.x == 100) {
            console.log("perfect " + this.xax);
            this.xax += 1;
        }
    }

    menganu() {
        //console.log("sueti");
        let anu = this.time.delayedCall(5000, () => {
            console.log("asd");
            return 0;
        }, [], this);
        this.dialogBox.setText(this.dialog);
    }

    updateLine(teks){
        if (line.length < teks[index].length) {
            line = teks[index].substr(0, line.length + 1);
            this.dialogBox.setText(line);
        }
        else {
            this.time.addEvent({
                delay: 1500,
                callback: this.nextLine,
                callbackScope: this,
                args: [teks]
            });
            index++;
        }
    }

    nextLine(teks){
        //this.index++;
        let panahan = this.panah.getChildren();
        for (let i in panahan) {
            panahan[i].setVisible(false);
        }
        this.kotak.setVisible(true);
        this.orang.anims.stop();
        if (index < teks.length){
            line = "";
            this.time.addEvent({
                repeat: teks[index].length,
                delay: 30,
                callback: this.updateLine,
                callbackScope: this,
                args: [teks]
            });
        }
        else {
            this.kotak.setVisible(false);
            console.log("done");
            line = "";
            this.dialogBox.setText("");
            index = 0;
            this.panah.toggleVisible();
        }
    }

    update() {
        //console.log(this.orang.x + " " + this.orang.y)
        
    }

}
