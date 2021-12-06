// import { Global } from "../objects/global";
import { Scene } from "phaser";
class PreLoader extends Scene {
    constructor() {
        super({ key: 'PreLoader' })
    }

    init() { }

    preload() {
        //all preload assetes here
        this.load.image('sky', '/assets/sky.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('start', '/assets/start.jpg');
        this.load.image('logo', '/assets/logo.png');
        this.load.spritesheet('player', '/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('star', '/assets/star.png');
    }
    create() {
        this.scene.start("Loader");
    }
}
export default PreLoader;