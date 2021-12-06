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

    }
    create() {
        this.scene.start("Game");
    }

}
export default Loader;