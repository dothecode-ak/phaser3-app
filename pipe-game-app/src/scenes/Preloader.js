// import { Global } from "../objects/global";
import { Scene } from "phaser";
class PreLoader extends Scene {
    constructor() {
        super({ key: 'PreLoader' })
    }
    init() { }
    preload() {
        //all preload assetes here
        // this.load.image('loader', './.png');
    }
    create() {

        //this.scene.start("Loader");
    }
}
export default PreLoader;