import * as Phaser from 'phaser';
import Loader from './scenes/Loader';
import PreLoader from './scenes/Preloader';
import HueRotatePostFX from './lib/HueRotatePostFX'
import Game from './scenes/Game';
import Start from './scenes/Start';
import * as mobileData from 'mobile-device-detect';
import { Global } from './objects/global';
import { api_url } from './api/api';
console.log(api_url.GAME_TOKEN);
console.log(api_url.CREATE_USER);
console.log(api_url.WEBSERVICES);
console.log(mobileData);

let DEFAULT_WIDTH = 1242;
let DEFAULT_HEIGHT = 2208;

Global.isMobile = mobileData.isMobile;
if (Global.isMobile) {
    Global.viewMode = "portrait"

} else {
    Global.viewMode = "landscape"
}

const config = {
    type: Phaser.AUTO,
    transparent: false,
    scale: {
        parent: 'game-sec',
        mode: (Global.isMobile) ? Phaser.Scale.ENVELOP : Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    dom: {
        createContainer: true
    },
    scene: [PreLoader, Loader, Game, Start],
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
    pipeline: { HueRotatePostFX }
}

window.addEventListener('load', () => {

    const game = new Phaser.Game(config)
})
