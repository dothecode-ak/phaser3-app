import { Scene } from "phaser";
class Start extends Scene {
    constructor() {
        super({ key: 'Start' });
    }
    init() { }
    create() {
        this.startBg = this.add.image(0, 0, 'startBGWhite').setOrigin(0);
        this.overBG = this.add.image(0, 0, 'bgOverImg').setScale(4);
        this.startBtn = this.add.sprite(0, 0, 'button', "Start", "StartRoll", "Start").setScale(0.73);
        this.startBtn.x = this.game.canvas.width * 0.5;
        this.startBtn.y = this.game.canvas.height * 0.67;
        this.startBtn.setInteractive({ cursor: 'pointer' });
        this.startBtn.on('pointerdown', () => { this.gameScreen(this); });
        this.flow = this.add.image(0, 0, 'ui', 'Title').setScale(0.77);
        this.flow.x = this.game.canvas.width * 0.5;
        this.flow.y = this.game.canvas.height * 0.42;
        //mute button
        this.muteBtn = this.add.sprite(0, 0, 'button', 'Mute');
        this.muteBtn.x = this.game.canvas.width * 0.5;
        this.muteBtn.y = this.game.canvas.height * 0.20;
        this.muteBtn.setInteractive({ cursor: 'pointer' });
    }

    gameScreen() {
        this.scene.start("Game");
    }
}

export default Start;