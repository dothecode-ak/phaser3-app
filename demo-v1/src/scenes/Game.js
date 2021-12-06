import { Scene } from "phaser";
import { Global } from "../objects/global";
import HueRotatePostFX from '../lib/HueRotatePostFX'
class Game extends Scene {
    constructor() {
        super({ key: 'Game' });
        this.player = null,
            this.cursors = null,
            this.score = 0,
            this.scoreTxt = null
    }
    init() {

    }
    create() {

        this.sky = this.add.image(this.game.canvas.width * 0.5, this.game.canvas.height * 0.5, 'sky').setScale(4);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(this.game.canvas.width * 0.5, this.game.canvas.height * 0.97, 'ground').setScale(4);
        this.platforms.create(50, this.game.canvas.height * 0.30, 'ground').setScale(2);
        this.platforms.create(1200, this.game.canvas.height * 0.50, 'ground').setScale(2);
        //center green bar
        this.platforms.create(100, this.game.canvas.height * 0.65, 'ground').setScale(2);
        //set the logo
        this.logo = this.add.image(this.game.canvas.width * 0.5, this.game.canvas.height * 0.09, 'logo').setScale(2);


        // create the player

        this.player = this.physics.add.sprite(100, 450, 'player').setScale(1.7);
        this.player.setBounce(0.3);
        this.player.setCollideWorldBounds(true);

        // animation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: "turn",
            frames: [{ key: 'player', frame: 4 }],
            frameRate: 20,

        })
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        this.cursors = this.input.keyboard.createCursorKeys();


        //set the stars

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        })
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
        })
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // this.player = player;

        this.cameras.main.setPostPipeline(HueRotatePostFX);
    }
    update() {
        const cursors = this.cursors;
        const player = this.player;

        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }
    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
    }
}

export default Game;