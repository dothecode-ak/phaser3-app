import { Scene } from "phaser"

class Start extends Scene {
    constructor() {
        super({ key: 'Start' });
    }
    init() {

    }
    create() {
        this.sky = this.add.image(this.game.canvas.width * 0.5, this.game.canvas.height * 0.5, 'sky').setScale(4);
        this.start = this.add.sprite(this.game.canvas.width * 0.5, this.game.canvas.height * 0.9, 'start', this.b).setScale(0.3);
        this.start.setInteractive({ cursor: 'pointer' });
        this.start.on('pointerdown', () => { this.gameStatus(this); });
    }

    gameStatus() {
        this.scene.start("Game");
    }
}

export default Start;