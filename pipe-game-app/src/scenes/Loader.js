import { Scene } from "phaser";
import { Global } from "../objects/global";
console.log(Global.uid);
class Loader extends Scene {
    constructor() {
        super({ key: 'Loader' });
    }
    init() {
        this.load.on('progress', this.onProgress.bind(this));
    }
    onProgress() { }
    preload() {
        /* this.load.addFile('flowFont', '../../assets/font/Starjedi.ttf') */
        this.load.audio('audio', './assets/audio/audio.mp3');
        this.load.image('startBGWhite', './assets/web/BG01.png');
        this.load.image('PipeWrong', './assets/PipeWrong.png');
        this.load.image('bgOverImg', './assets/web/BGoverlay.png');
        this.load.atlas('ui', './assets/json/ui.png', './assets/json/ui.json')
        this.load.atlas('items', './assets/json/items.png', './assets/json/items.json')
        this.load.atlas('button', './assets/json/buttons.png', './assets/json/buttons.json')
    }
    create() {
        this.scene.start("Game");
    }

}
export default Loader;