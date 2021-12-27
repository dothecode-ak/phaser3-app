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
        const platforms = this.physics.add.staticGroup();
        platforms.create(this.game.canvas.width * 0.5, this.game.canvas.height * 0.97, 'ground').setScale(4);
        platforms.create(200, this.game.canvas.height * 0.65, 'ground').setScale(2)
        platforms.create(50, this.game.canvas.height * 0.30, 'ground').setScale(2).refreshBody();
        platforms.create(900, this.game.canvas.height * 0.50, 'ground').setScale(2);
        //center green bar


        //set the logo
        this.logo = this.add.image(this.game.canvas.width * 0.5, this.game.canvas.height * 0.09, 'logo').setScale(2);


        // create the player

        const player = this.physics.add.sprite(this.game.canvas.width * 0.5, this.game.canvas.height * .90, 'player').setScale(3.5);
        player.setBounce(0.39);
        player.setCollideWorldBounds(true);

        // animation
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
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
        const stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 70, y: 0, stepX: 100 },

        })
        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            child.setScale(3);
        })
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '70px', fill: '#000' });

        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.player = player;

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