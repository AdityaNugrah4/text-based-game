import { battleResultArray, monsterHealth, health, currentMonster, choosenEnemy,testBattleButton } from './CombatLoop.js'
import { enemies } from './script.js';
const canvas = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const CANVAS_WIDTH  = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 500;
const canvasWidth2 = canvas2.width = 500;
const canvasHeight2 = canvas2.height = 500; 

const spriteData = {
    'adventurer': {
        src: "./images/adventurer-v1.5-Sheet.png",
        spriteWidth: 50,
        spriteHeight: 37,
        dx: 0,
        dy: 110,
        dWidth: 500,
        dHeight: 400,
        frames: {
            idle: [
                {x: 0, y: 0},
                {x: 50, y: 0},
                {x: 100, y: 0},
                {x: 150, y: 0}
            ],
            attack1: [
                {x: 150, y: 185},
                {x: 200, y: 185},
                {x: 250, y: 185},
                {x: 300, y: 185},
                {x: 0, y: 222},
                {x: 50, y: 222},
                {x: 100, y: 222},
                {x: 150, y: 222},
                {x: 200, y: 222},
                {x: 250, y: 222},
                {x: 300, y: 222},
            ],
            attack2: [
                {x: 100, y: 482},
                {x: 150, y: 482},
                {x: 200, y: 482},
                {x: 250, y: 482},
                {x: 300, y: 482},
                {x: 0, y: 520},
                {x: 50, y: 520},
                {x: 100, y: 520},
                {x: 150, y: 520},
                {x: 200, y: 520},
            ],
            hurt: [
                {x: 55, y: 444},
                {x: 110, y: 444},
                {x: 150, y: 444},
            ],
            lose: [
                {x: 200, y: 297},
                {x: 250, y: 297},
                {x: 300, y: 297},
                {x: 0, y: 334},
                {x: 50, y: 334},
                {x: 100, y: 334},
                {x: 150, y: 334},
                {x: 200, y: 334},
                {x: 250, y: 334},
            ]
        }
    },
    'Gorgon':  {
        idle: "./images/Gorgon_Idle.png",
        attack1: "./images/Gorgon_Attack_1.png",
        attack2: "./images/Gorgon_Attack_2.png",
        hurt: "./images/Gorgon_Hurt.png",
        dead: "./images/Gorgon_Dead.png",
        spriteWidth: 130,
        spriteHeight: 130,
        dx: 0,
        dy: -150,
        dWidth: 500,
        dHeight: 650,
        frames: {
            idle: [
                {x: 780, y: 0},
                {x: 652, y: 0},
                {x: 524, y: 0},
                {x: 396, y: 0},
                {x: 268, y: 0},
                {x: 140, y: 0},
                {x: 12, y: 0}
            ],
            attack1: [
                {x: 1940, y: 0},
                {x: 1800, y: 0},
                {x: 1660, y: 0},
                {x: 1532, y: 0},
                {x: 1404, y: 0},
                {x: 1276, y: 0},
                {x: 1148, y: 0},
                {x: 1020, y: 0},
                {x: 896, y: 0},
                {x: 768, y: 0},
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: -10, y: 0}
            ],
            attack2: [
                {x: 768, y: 0},
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            hurt: [
                {x: 276, y: 0},
                {x: 148, y: 0},
                {x: 20, y: 0}
            ],
            dead: [
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ]
        }
    },
    'Red Wolf': {
        idle: "./images/Red_Wolf_Idle.png",
        attack1: "./images/Red_Wolf_Attack_1.png",
        attack2: "./images/Red_Wolf_Attack_2.png",
        hurt: "./images/Red_Wolf_Hurt.png",
        dead: "./images/Red_Wolf_Dead.png",
        spriteWidth: 130,
        spriteHeight: 130,
        dx: 0,
        dy: -250,
        dWidth: 500,
        dHeight: 750,
        frames: {
            idle: [
                {x: 896, y: 0},
                {x: 768, y: 0},
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            attack1: [
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            attack2: [
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            dead: [
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            hurt: [
                {x: 128, y: 0},
                {x: 0, y: 0}
            ]
        },   
    },
    'Karasu Tengu': {
        idle: "./images/Karasu_Tengu_Idle.png",
        attack1: "./images/Karasu_Tengu_Attack_1.png",
        attack2: "./images/Karasu_Tengu_Attack_2.png",
        hurt: "./images/Karasu_Tengu_Hurt.png",
        dead: "./images/Karasu_Tengu_Dead.png",
        spriteWidth: 130,
        spriteHeight: 130,
        dx: 0,
        dy: -200,
        dWidth: 500,
        dHeight: 700,
        frames: {
            idle: [
                {x: 640, y: 0},
                {x: 508, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            attack1: [
                {x: 640, y: 0},
                {x: 508, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            attack2: [
                {x: 384, y: 0},
                {x: 254, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            dead: [
                {x: 640, y: 0},
                {x: 508, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            hurt: [
                {x: 254, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ]
        }
    },
    'Kitsune': {
        idle: "./images/Kitsune_Idle.png",
        attack1: "./images/Kitsune_Attack_1.png",
        attack2: "./images/Kitsune_Attack_2.png",
        hurt: "./images/Kitsune_Hurt.png",
        dead: "./images/Kitsune_Dead.png",
        spriteWidth: 130,
        spriteHeight: 130,
        dx: 0,
        dy: -200,
        dWidth: 500,
        dHeight: 700,
        frames: {
            idle: [
                {x: 896, y: 0},
                {x: 764, y: 0},
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            attack1: [
                {x: 1152, y: 0},
                {x: 1024, y: 0},
                {x: 896, y: 0},
                {x: 766, y: 0},
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0},
            ],
            attack2: [
                {x: 1152, y: 0},
                {x: 1024, y: 0},
                {x: 896, y: 0},
                {x: 766, y: 0},
                {x: 640, y: 0},
                {x: 512, y: 0},
                {x: 384, y: 0},
                {x: 256, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0},
            ],
            hurt: [
                {x: 128, y: 0},
                {x: 0, y: 0},
                {x: 128, y: 0},
                {x: 0, y: 0}
            ],
            //nedd to add death animation
        }
    },
    'Skeleton': {
        idle: "./images/Skeleton_Idle.png",
        attack1: "./images/Skeleton_Attack.png",
        hurt: "./images/Skeleton_Take Hit.png",
        dead: "./images/Skeleton_Death.png",
        spriteWidth: 100,
        spriteHeight: 100,
        dx: 0,
        dy: 0,
        dWidth: 500,
        dHeight: 500,
        frames: {
            idle: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            attack1: [
                {x: 1050, y: 0},
                {x: 900, y: 0},
                {x: 750, y: 0},
                {x: 600, y: 0},
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            hurt: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            dead: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ]
        }
    },
    'Flying Eye': {
        idle: "./images/Flyeye_Flight.png",
        attack1: "./images/Flyeye_Attack.png",
        hurt: "./images/Flyeye_Take Hit.png",
        dead: "./images/Flyeye_Death.png",
        spriteWidth: 100,
        spriteHeight: 100,
        dx: 0,
        dy: 0,
        dWidth: 500,
        dHeight: 500,
        frames: {
            idle: [
                {x: 1050, y: 0},
                {x: 900, y: 0},
                {x: 750, y: 0},
                {x: 600, y: 0},
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            attack1: [
                {x: 1050, y: 0},
                {x: 900, y: 0},
                {x: 750, y: 0},
                {x: 600, y: 0},
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            hurt: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            dead: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ]
        }
    },
    'Goblin': {
        idle: "./images/Goblin_Idle.png",
        attack1: "./images/Goblin_Attack.png",
        hurt: "./images/Goblin_Take Hit.png",
        dead: "./images/Goblin_Death.png",
        spriteWidth: 120,
        spriteHeight: 100,
        dx: 0,
        dy: 0,
        dWidth: 500,
        dHeight: 500,
        frames: {
            idle: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            attack1: [
                {x: 1050, y: 0},
                {x: 900, y: 0},
                {x: 750, y: 0},
                {x: 600, y: 0},
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            hurt: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            dead: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ]
        }
    },
    'Mushtoom': {
        idle: "./images/Mushroom_Idle.png",
        attack1: "./images/Mushroom_Attack.png",
        hurt: "./images/Mushroom_Take Hit.png",
        dead: "./images/Mushroom_Death.png",
        spriteWidth: 106,
        spriteHeight: 100,
        dx: 0,
        dy: 0,
        dWidth: 500,
        dHeight: 500,
        frames: {
            idle: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            attack1: [
                {x: 1050, y: 0},
                {x: 900, y: 0},
                {x: 750, y: 0},
                {x: 600, y: 0},
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            hurt: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ],
            dead: [
                {x: 450, y: 0},
                {x: 300, y: 0},
                {x: 150, y: 0},
                {x: 0, y: 0},
            ]
        }
    }
};

let currentCharacter1 = "adventurer";
let playerMove1 = "idle";

export let currentCharacter2;
export let playerMove2;

let gameFrame1 = 0;
let attackFrame1 = 0;
let gameFrame2 = 0;
let attackFrame2= 0;
const staggerFrames = 6;
const spriteAnimations = [];

const loadAnimation = (src) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
    });
}
console.log(spriteAnimations);

const loadedImages = {};

const preloadImages = async () => {
    for (const character in spriteData) {
        const data = spriteData[character];
        if (typeof data.src === "string") {
            loadedImages[character] = await loadAnimation(data.src);
        } else {
            loadedImages[character] = {};
            for (const action in data) {
                if (
                    action !== "frames" && 
                    action !== "spriteWidth" && 
                    action !== "spriteHeight" &&
                    action !== "dx" &&
                    action !== "dy" &&
                    action !== "dWidth" &&
                    action !== "dHeight"
                ) {
                    loadedImages[character][action] = await loadAnimation(data[action]);
                }
            }            
        }
    }
}

function animate1() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
    const characterData = spriteData[currentCharacter1];
    let frames = characterData.frames[playerMove1];
    const spriteWidth = characterData.spriteWidth;
    const spriteHeight = characterData.spriteHeight;
    const dx = characterData.dx;
    const dy = characterData.dy;
    const dWidth = characterData.dWidth;
    const dHeight = characterData.dHeight;

    // Determine which image to use, (If spriteData uses a string source for idle but an object for actions, the following code picks the correct image.)
    let img =
      typeof characterData.src === "string"
        ? loadedImages[currentCharacter1]
        : loadedImages[currentCharacter1][playerMove1];

    let frameX, frameY;
    if (health <= 0) {
        setTimeout(() => {
            // These two are written to prevent the frames of the adventurer to speed up everytime the enemies changes
            currentCharacter2 = null;
            playerMove2 = null;
            frames = null;
            currentCharacter1 = null;
            playerMove1 = null;
        }, 4000);
    } else if (playerMove1 === "attack1" || playerMove1 === "attack2" || playerMove1 === "hurt") {
      // Calculate elapsed frames since the attack started
      const elapsed = gameFrame1 - attackFrame1;
      // Determine the current frame of the attack animation
      let frameIndex = Math.floor(elapsed / staggerFrames);
      
      // If reached (or exceeded) the end of the attack animation, switch back to idle.
      if (frameIndex >= frames.length) {
        playerMove1 = "idle"; // Optional, can reset frameIndex to 0 or let the idle animation loop naturally.
        frames = characterData.frames["idle"];
        img = // If your idle animation uses a different image source
          typeof characterData.src === "string"
            ? loadedImages[currentCharacter1]
            : loadedImages[currentCharacter1]["idle"];
        frameIndex = Math.floor(gameFrame1 / staggerFrames) % frames.length; // Recalculate the frame using the idle animation logic
        };
        frameX = frames[frameIndex].x;
        frameY = frames[frameIndex].y;
    } else {
      // For the idle (or any looping) animation, use the modulo operation:
        const position = Math.floor(gameFrame1 / staggerFrames) % frames.length;
        frameX = frames[position].x;
        frameY = frames[position].y;
    }
  
    ctx.drawImage(img, frameX, frameY, spriteWidth, spriteHeight, dx, dy, dWidth, dHeight);
  
    gameFrame1++;
    requestAnimationFrame(animate1);
}  

function animate2 () {
    ctx2.clearRect(0, 0, canvasWidth2, canvasHeight2);
    if (!currentCharacter2 || !playerMove2) { // to check if the monsters value are null
        console.log('Both currentCharacter2 and playerMove2 are null')
        return;
    }
    
    const characterData = spriteData[currentCharacter2];
    let frames = characterData.frames[playerMove2];
    const spriteWidth = characterData.spriteWidth;
    const spriteHeight = characterData.spriteHeight;
    const dx = characterData.dx;
    const dy = characterData.dy;
    const dWidth = characterData.dWidth;
    const dHeight = characterData.dHeight;

    let img =
        typeof characterData.src === "string"
            ? loadedImages[currentCharacter2]
            : loadedImages[currentCharacter2][playerMove2];
    let frameX, frameY;

    if (monsterHealth <= 0) {
        playerMove2 = 'hurt';
        const elapsed = gameFrame2 - attackFrame2;
        let frameIndex = Math.floor(elapsed / staggerFrames);
        if (frameIndex >= frames.length) {
            frameIndex = frames.length - 2

            frameX = frames[frameIndex].x;
            frameY = frames[frameIndex].y;

            if (frameIndex = frames.length - 1) {
                playerMove2 = 'dead';
                const elapsed = gameFrame2 - attackFrame2;
                let frameIndex = Math.floor(elapsed / staggerFrames);
                if (frameIndex >= frames.length) {
                    frameIndex = frames.length - 2
                }
            }
        };
        
        frameX = frames[frameIndex].x;
        frameY = frames[frameIndex].y;
        
        setTimeout(() => {
            // These two are written to prevent the frames of the adventurer to speed up everytime the enemies changes
            currentCharacter2 = null;
            playerMove2 = null;
            frames = null;
            currentCharacter1 = null;
            playerMove1 = null;
        }, 4000);

    } else if (playerMove2 === "attack1" || playerMove2 === "attack2" ||  playerMove2 === 'hurt') {
        const elapsed = gameFrame2 - attackFrame2;
        let frameIndex = Math.floor(elapsed / staggerFrames);

        if (frameIndex >= frames.length) {
            playerMove2 = "idle"; 
            frames = characterData.frames["idle"];
            img =
            typeof characterData.src === "string"
                ? loadedImages[currentCharacter2]
                : loadedImages[currentCharacter2]["idle"];
            frameIndex = Math.floor(gameFrame2 / staggerFrames) % frames.length;
        };
        frameX = frames[frameIndex].x;
        frameY = frames[frameIndex].y;
        
    } else {
        const position = Math.floor(gameFrame2 / staggerFrames) % frames.length;
        frameX = frames[position].x;
        frameY = frames[position].y;
    }
    /* const position = Math.floor(gameFrame / staggerFrames) % frameCount;
    const frameX = frames[position].x;
    const frameY = frames[position].y; */
    ctx2.drawImage(img, frameX, frameY, spriteWidth, spriteHeight, dx, dy, dWidth, dHeight);
    gameFrame2++;
    requestAnimationFrame(animate2);
};

// To initiate battle and player attack move
const startFight = document.getElementById("start-fight-btn");
const attackBtn = document.getElementById("attack-btn");
const dodgeBtn = document.getElementById("dodge-btn");
startFight.addEventListener('click', () => {
    currentCharacter1 = 'adventurer';
    playerMove1 = 'idle';
    currentCharacter2 = choosenEnemy;
    playerMove2 = 'idle';
    console.log("animate2 called. currentCharacter2:", currentCharacter2, "playerMove2:", playerMove2, "currentMonster", currentMonster);
    preloadImages().then(() => {
        animate1();
        animate2();
    });
});

attackBtn.addEventListener('click', () => {
    const playerAttack = ['attack1', 'attack2'];
    const randomPlayer = Math.floor(Math.random() * playerAttack.length)
    if (playerMove1 !== 'attack1' && playerMove1 !== 'attack2') {
        playerMove1 = playerAttack[randomPlayer];
        attackFrame1 = gameFrame1; // record the frame when the attack started
    };

    //const monsterKey = currentCharacter2
    const monster = spriteData[currentCharacter2];
    const monstersAttack = ['attack1'];
    if (monster.frames.attack2) {
        monstersAttack.push('attack2')
    } else {
        console.log(monstersAttack);
    };
    console.log(monstersAttack)
    const randomMonsters = Math.floor(Math.random() * monstersAttack.length);
    if (playerMove2 !== 'attack1' && playerMove2 !== 'attack2') {
        playerMove2 = monstersAttack[randomMonsters];
        attackFrame2 = gameFrame2; // record the frame when the attack started
    };
});

dodgeBtn.addEventListener('click', () => {
    if (playerMove1 !== 'hurt') {
    playerMove1 = 'hurt'; // need to modify animate1 ()
    attackFrame1 = gameFrame1; // record the frame when the attack started
    };
    if (playerMove2 !== 'hurt') {
    playerMove2 = 'hurt'; // need to modify animate1 ()
    attackFrame2 = gameFrame2; // record the frame when the attack started
    }
      
});

// For tomorow:
// modifies animate2() if (palyerMove2) to playerMove2 specification
// make a delay (like holdnextText) so animate2 happen after animate1 finish (not at the same time)
// in CombatLoop, create a variable to detect whether the enemy is attack ir not
// add delay between animation and health getting reduced

/* Only for archive

function animate1 () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    const characterData = spriteData[currentCharacter1];
    const frames = characterData.frames[playerMove1];
    const frameCount = frames.length;

    const position = Math.floor(gameFrame / staggerFrames) % frameCount;
    const frameX = frames[position].x;
    const frameY = frames[position].y;

    const spriteWidth = characterData.spriteWidth;
    const spriteHeight = characterData.spriteHeight;

    const dx = characterData.dx;
    const dy = characterData.dy;
    const dWidth = characterData.dWidth;
    const dHeight = characterData.dHeight;

    const img =
        typeof characterData.src === "string"
            ? loadedImages[currentCharacter1]
            : loadedImages[currentCharacter1][playerMove1];
    ctx.drawImage(img, frameX, frameY, spriteWidth, spriteHeight, dx, dy, dWidth, dHeight); // need to change the dx, dy, dwidth, dheight

    gameFrame++;
    requestAnimationFrame(animate1);
};  */

