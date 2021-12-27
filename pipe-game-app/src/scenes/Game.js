import { Scene } from "phaser";
import item_map from "../objects/items-map";
console.log(item_map);
class Game extends Scene {
    constructor() {
        super({ key: 'Game' });

    }
    init() {
        this.setTime = 10;
        this.tapConuter = 0;
    }
    create() {
        this.currentAngle = 0;
        this.AngleCounter = 0;
        this.currentItem = null;
        var audio = this.sound.add('audio');
        audio.play();
        //start the timer function
        const level_1_Yellow_items = [{ item: 'p2', angle: 360 }, { item: 'p1', angle: 90 }, { item: 'p1', angle: 90 }, { item: 'p2', angle: 360 }, { item: 'p2', angle: 90 }, { item: 'p1', angle: 180 }, { item: 'p1', angle: 90 }, { item: 'p2', angle: 360 }, { item: 'p2', angle: 270 }, { item: 'p1', angle: 180 }, { item: 'p1', angle: 180 }, { item: 'p2', angle: 180 }];
        const rotationAngleArray = ['90', '180', '270', '360'];
        const Yellow_items_angle = []
        // function shuffle(Yellow_items) {
        //     for (let i = Yellow_items.length - 1; i > 0; i--) {
        //         let j = Math.floor(Math.random() * (i + 1));
        //         let temp = Yellow_items[i];
        //         Yellow_items[i] = Yellow_items[j];
        //         Yellow_items[j] = temp;
        //     }
        //     return Yellow_items;
        // }
        // const randomYellowItems = Yellow_items;
        // console.log(randomYellowItems);
        this.setTimerFn();
        this.GameBg = this.add.image(0, 0, 'startBGWhite').setOrigin(0);
        //left setup
        this.overGameBG = this.add.image(0, 0, 'bgOverImg').setScale(2);
        this.overGameBG.x = -this.game.canvas.width * .3193;
        this.overGameBG.alpha = 0.60;

        //right setup
        this.rightOverGameBG = this.add.image(0, 0, 'bgOverImg').setScale(2);
        this.rightOverGameBG.x = this.game.canvas.width * 0.96;
        this.rightOverGameBG.alpha = 1.90;
        //left setup
        this.gameMusicBtn = this.add.sprite(0, 0, 'button', 'Mute');
        this.gameMusicBtn.x = this.game.canvas.width * 0.15;
        this.gameMusicBtn.y = this.game.canvas.height * 0.20;
        this.gameMusicBtn.setInteractive({ cursor: 'pointer' });

        this.gameMusicBtn.on("pointerup", () => {
            this.sound.mute = !this.sound.mute;
            if (this.sound.mute) {
                this.gameMusicBtn = this.add.sprite(0, 0, 'button', 'Mute');
                this.gameMusicBtn.x = this.game.canvas.width * 0.15;
                this.gameMusicBtn.y = this.game.canvas.height * 0.20;
            }
            else {
                this.gameMusicBtn = this.add.sprite(0, 0, 'button', 'MuteActive');
                this.gameMusicBtn.x = this.game.canvas.width * 0.15;
                this.gameMusicBtn.y = this.game.canvas.height * 0.20;
            }
        });
        //flow ui
        this.flowGmame = this.add.image(0, 0, 'ui', 'Title').setScale(0.42);
        this.flowGmame.x = this.game.canvas.width * 0.15;
        this.flowGmame.y = this.game.canvas.height * 0.335;
        var level_style = {
            color: '#ffffff',
            fontSize: "39px",
            fontFamily: 'flowFont'
        }
        // level text add
        this.levelTxt = this.add.text(0, 0, 'LEVEL', level_style);
        this.levelTxt.x = this.game.canvas.width * 0.10;
        this.levelTxt.y = this.game.canvas.height * 0.39;
        //level number
        this.levelNumber = this.add.text(0, 0, '01', level_style);
        this.levelNumber.x = this.game.canvas.width * 0.175;
        this.levelNumber.y = this.game.canvas.height * 0.39;

        // tap box
        this.tapBox = this.add.image(0, 0, 'ui', 'Tap').setScale(0.8);
        this.tapBox.x = this.game.canvas.width * 0.08;
        this.tapBox.y = this.game.canvas.height * 0.53;

        // tap count
        this.tapCount = this.add.text(0, 0, "00" + this.tapConuter, level_style).setScale(0.8);
        this.tapCount.x = this.game.canvas.width * 0.0639;
        this.tapCount.y = this.game.canvas.height * 0.52;
        //timer bg
        this.timerBox = this.add.image(0, 0, 'ui', 'Time').setScale(0.8);
        this.timerBox.x = this.game.canvas.width * 0.23;
        this.timerBox.y = this.game.canvas.height * 0.53;
        // timer count
        this.timerCount = this.add.text(0, 0, this.setTime, level_style).setScale(0.8);
        this.timerCount.x = this.game.canvas.width * 0.206;
        this.timerCount.y = this.game.canvas.height * 0.52;

        //restart button
        this.restartButton = this.add.image(0, 0, 'button', 'Restart').setScale(0.8);
        this.restartButton.x = this.game.canvas.width * 0.15;
        this.restartButton.y = this.game.canvas.height * 0.72;
        this.restartButton.setInteractive({ cursor: 'pointer' });
        this.restartButton.on('pointerdown', () => { this.reStartGame(this); });

        //create the game sheet
        let squarecount = 0;
        let item_count = 0;
        this["square" + squarecount] = this.add.image(this.game.canvas.width * 0.333, this.game.canvas.height * 0.3, 'PipeWrong');

        // this["item" + item_count] = this.add.image(this.game.canvas.width * 0.333, this.game.canvas.height * 0.3, 'items');
        let differenceX = this["square" + squarecount].displayWidth
        let differenceY = this["square" + (squarecount)].y;
        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 4; y++) {
                squarecount++;
                item_count++;
                this["square" + squarecount] = this.add.image(0, 0, 'PipeWrong').setScale(1);
                this["square" + squarecount].x = this["square" + (squarecount - 1)].x + differenceX;
                this["square" + squarecount].y = differenceY;

                if (x == 0) {
                    this["item" + item_count] = this.add.image(this["square" + squarecount].x, this["square" + squarecount].y, 'items', level_1_Yellow_items[y].item).setScale(1).setAngle(level_1_Yellow_items[y].angle);
                    this["item" + item_count].name = 'item' + item_count;
                    this["item" + item_count]
                        .setInteractive()
                        .on("pointerdown", this.itemSetAngle.bind(this, item_count, level_1_Yellow_items[y].angle));

                }
                else if (x == 1) {
                    this["item" + item_count] = this.add.image(this["square" + squarecount].x, this["square" + squarecount].y, 'items', level_1_Yellow_items[y + 4].item).setScale(1).setAngle(level_1_Yellow_items[y + 4].angle);
                    this["item" + item_count].name = 'item' + item_count;
                    this["item" + item_count].setInteractive({ cursor: 'pointer' });
                    this["item" + item_count]
                        .setInteractive()
                        .on("pointerdown", this.itemSetAngle.bind(this, item_count, level_1_Yellow_items[y].angle));
                }
                else if (x == 2) {
                    this["item" + item_count] = this.add.image(this["square" + squarecount].x, this["square" + squarecount].y, 'items', level_1_Yellow_items[y + 8].item).setScale(1).setAngle(level_1_Yellow_items[y + 8].angle);
                    this["item" + item_count].name = 'item' + item_count;
                    this["item" + item_count].setInteractive({ cursor: 'pointer' });
                    this["item" + item_count]
                        .setInteractive()
                        .on("pointerdown", this.itemSetAngle.bind(this, item_count, level_1_Yellow_items[y].angle));
                }

            }
            squarecount = 0;
            differenceY += this["square" + squarecount].displayHeight;
        }
        this["square0"].destroy();

    }
    reStartGame() {
        this.setTime = 0;
        clearInterval(this.setId)
        this.scene.start("Game");
    }
    setTimerFn() {
        this.setId = setInterval(() => {
            this.setTime--;
            // console.log(this.setTime);
            this.timerCount.text = this.setTime;
        }, 1000)

    }
    tapCount() {
        this.tapConuter++;
        this.tapConuter.text = this.tapConuter;
        console.log('TAP', this.tapConuter);
    }
    update() {
        //game over logic
        if (this.setTime == 0) {
            clearInterval(this.setId)
        }
        if (this.setTime < 10) {
            this.timerCount.text = "00:" + "0" + this.setTime;
        }
        else {
            this.timerCount.text = "00:" + this.setTime;
        }
        // this.itemSetAngle.bind(this);
    }
    itemSetAngle(itm, ang) {
        console.log(itm, ang, " hh");
        this.currentItem = itm;
        this.AngleCounter++;
        if (this.AngleCounter > 1) {
            if (this.currentItem === itm) {
                console.log(":aaaaa")
                this.currentAngle += 90;
                if (this.currentAngle == 360) this.currentAngle = 0
                console.log(this.currentAngle, " ths.currentAngkle")
                this["item" + itm].setAngle(this.currentAngle)
            } else {
                this.AngleCounter = 0;
            }
        } else {

            let prevAngle = ang + 90
            if (prevAngle == 360) prevAngle = 0;
            this["item" + itm].setAngle(prevAngle)
            this.currentAngle = prevAngle;
            console.log(prevAngle, " prevangle")
        }





    }


}

export default Game;