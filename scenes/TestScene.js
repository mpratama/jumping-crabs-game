//import Phaser from 'phaser';
import Phaser from '../phaser.js';
import senyum from '../assets/senyum.jpg';
import tanah from '../assets/platform.png';
import tile from '../assets/Land.png';
//import map01 from '../assets/map.json';
//const map = require('../assets/map.json');

export default class TestScene extends Phaser.Scene {
	constructor(){
		super({key: "bootScene"});
	}
	
	preload(){
		this.load.image('smile', senyum);
		this.load.image('ground', tanah);
		this.load.json('lv02', "../assets/map.json");
		this.load.image('tileset', tile);
	}
	
	create(){
		//console.log(map);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.teks = this.add.text(10, 10, "");
		this.gambar = this.physics.add.image(100, 334.5, 'smile').setInteractive();
		//this.plane = this.add.group();

		this.ground = this.physics.add.image(10, 359, 'ground');
		//this.ground2 = this.physics.add.image(400, 339, 'ground');

		this.gambar.setCollideWorldBounds(true);
		this.gambar.setVelocity(100, 0);
		this.gambar.setBounce(1, 0);

		this.ground.body.allowGravity = false;
		this.ground.setImmovable(true);
		//this.ground2.body.allowGravity = false;
		//this.ground2.setImmovable(true);
		
		this.gambar.once('pointerdown', () => {
			this.teks.setText("Terpencot");
		});

		this.physics.add.collider(this.gambar,this.ground);
	}

	update(){
		if (this.cursors.up.isDown && this.gambar.body.touching.down){
			this.gambar.setVelocityY(-100);
		}
        
	}
}