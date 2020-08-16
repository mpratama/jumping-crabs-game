class BootScene extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {

        //load splash music & bitmaptext ke memory
        this.load.audio('splash', ['music/splash2.mp3', 'music/splash2.ogg']);
        this.load.bitmapFont('gem', 'assets/gem.png', 'assets/gem.xml');
    }

    create() {
        //musik latar
        //this.scene.start("menuScene");
        //this.scene.start("level01");
        this.lagu = this.sound.add('splash');

        //bitmap teks "Pratama Software"
        this.judul = this.add.bitmapText(game.config.width / 2, 0, 'gem', 'Pratama Software', 25).setOrigin(0.5).setCenterAlign().setAlpha(0);

        //timeline utk event bitmap teks
        this.animJudul = this.tweens.createTimeline();

        this.animJudul.add({
            //dari atas turun ke bawah sambil play lagu
            targets: this.judul,
            y: 170,
            duration: 2000,
            alpha: 1,
            ease: 'Elastic',
            onStart: () => {
                this.lagu.play();
            }
        });

        //setelah turun diam 4000millisecond
        this.animJudul.add({
            targets: this.judul,
            y: 170,
            duration: 1000,           
        });

        //fadeout, setelah tween selesai dilanjut ke Menu Scene
        this.animJudul.add({
            targets: this.judul,
            y: 340,
            duration: 2000,
            alpha: 0,
            ease: 'Power1',
            onComplete: () => {
                this.scene.start("menuScene");
            }
        });

        //memulai animasi teks judul
        this.animJudul.play();
    }
}
