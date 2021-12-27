import * as Phaser from 'phaser';
import Loader from './scenes/Loader';
import PreLoader from './scenes/Preloader';

import Start from './scenes/Start';
import Game from './scenes/Game';
import * as mobileData from 'mobile-device-detect';
import { Global } from './objects/global';
//import { api_url } from './api/api';
/* console.log(api_url.GAME_TOKEN);
console.log(api_url.CREATE_USER);
console.log(api_url.WEBSERVICES); */
console.log(mobileData);

let DEFAULT_WIDTH = 2208;
let DEFAULT_HEIGHT = 1242;

Global.isMobile = mobileData.isMobile;
if (Global.isMobile) {
    DEFAULT_WIDTH = 1242;
    DEFAULT_HEIGHT = 2208;
    Global.viewMode = "portrait"

} else {
    Global.viewMode = ""
}

const config = {
    type: Phaser.AUTO,
    transparent: true,
    scale: {
        parent: 'game-sec',
        mode: (Global.isMobile) ? Phaser.Scale.AUTO : Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    dom: {
        createContainer: true
    },
    scene: [Loader, Start, Game],
    fps: {
        target: 60,
        forceSetTimeOut: true,
        smoothStep: false,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
}

window.addEventListener('load', () => {

    const game = new Phaser.Game(config)
})
