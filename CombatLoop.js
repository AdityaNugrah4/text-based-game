import { 
  equippedWeapon1, equippedWeapon2, equippedArmor, equippedAccessories1, equippedAccessories2, enemies, hpPool, sanityPool, hpPoolText, sanityPoolText, onBattleResultChange,
} from './script.js'

import { currentCharacter2, playerMove2 } from './animation.js'


let xp = 0;
let sanity = 4;
let gold = 50;
let currentWeapon = 0;
let inventoryList = ["stick"];
export let health = 600; // initially 100
let currentHealth; // To track original value of player health
export let monsterHealth; // The one tracking how much monster health change
let currentMonsterHealth; // To track original value of monster health
export let currentMonster;
export let choosenEnemy;
export let battleResultArray = [];
let initialHealth = health;
// add xpText and goldText
//const goldText = 

const playerHealthBar = document.querySelector("#player-health-bar");
const monsterHealthBar = document.querySelector("#enemy-health-bar");
const msgText = document.getElementById("msg-text");
const monstersName = document.getElementById("monsters-name");
const popBattlePage = document.getElementById("pop-up-battle-page");

// Button
const startFight = document.getElementById("start-fight-btn");
const attackBtn = document.getElementById("attack-btn");
const dodgeBtn = document.getElementById("dodge-btn");

playerHealthBar.max = initialHealth;
playerHealthBar.value = health;


const weapons = [
  { name: 'stick', power: 5, penetration: 0.05 },
  { name: 'dagger', power: 30, penetration: 0.1 },
  { name: 'claw hammer', power: 50, penetration: 0.15 },
  { name: 'sword', power: 100, penetration: 0.25 }
];

export const chooseCurrentMonster = (monster) => {
  currentMonster = monster; // To choose specific enemy from textNode
};

const chooseEnemy = () => {
  console.log("chooseEnemy called");
  const limitRandomEnemies = 3;
  if (!currentMonster) { // To handle if condition whether the enemy is predetermined or random
    let trueLimited = Math.min(limitRandomEnemies, enemies.length);
    const randomIndex = Math.floor(Math.random() * trueLimited);
    currentMonster = enemies[randomIndex];
    console.warn("No specific monster chosen.  Selecting random monster: ", currentMonster.name);
    console.log("chooseEnemy: currentMonster set to:", currentMonster); // ADD THIS
  }

  monstersName.textContent = currentMonster.name;
  monsterHealth = currentMonster.health;
  currentMonsterHealth = currentMonster.health;
  currentHealth = health;
  choosenEnemy = currentMonster.name // To trigger choosen enemy at animation.js
  resetHealth();

  if (msgText) {
    msgText.innerText = `The ${currentMonster.name} attacks you!`;
  };

  console.log("currentMonster:", currentMonster.name);
  console.log("choosenEnemy", choosenEnemy);
  console.log("currentMonster.health:", currentMonster.health);
  console.log("Enemies array:", enemies);
};

/* const syncMonsters = () => {   // function to synchronise animation and the enemies that actually encountered in the game
  console.log("syncMonsters called. currentMonster:", currentMonster);
  if (currentMonster) {
    console.log("syncMonsters called with currentMonster:", currentMonster.name);
    currentCharacter2 = currentMonster.name;
    playerMove2 = 'idle';
  } else {
    console.warn("syncMonsters called, but currentMonster is null!");
    currentCharacter2 = null;
    playerMove2 = null;
  }
  console.log("syncMonsters: currentCharacter2:", currentCharacter2, "playerMove2:", playerMove2);
}; */

// initialize buttons
const battlePage = document.getElementById("battle-page");

export const testBattleButton = () => {
  popBattlePage.style.display = 'block';
  attackBtn.style.display = 'none'; // Hide attack button
  dodgeBtn.style.display = 'none'; // Hide dodge button
  chooseEnemy();

  startFight.addEventListener('click', () => {
    console.log("startFight clicked");
    startFight.style.display = 'none'; // Hide start fight button once the fight begins
    attackBtn.style.display = 'block'; // Show attack button
    dodgeBtn.style.display = 'block'; // Show dodge button
  });
  attackBtn.addEventListener('click', () => {
    attackInitiate();//attack animation here
  });
  dodgeBtn.addEventListener('click', () => {
    dodge();//dodge animation here
  });
};

const updateFight = () => { //need to edit

};

const attackInitiate = () => {
  msgText.innerText = ""; // Reset message text before adding new message

  // Let the player attack first
  const monsterDefeated = playerAttack();
  // Only let the monster attack if it’s still alive
  if (!monsterDefeated && monsterHealth > 0) {
    monstersAttack();
  }
};

const playerAttack = () => { // Player attack loop
  msgText.innerText = "";
  const damage = Math.floor((1 - currentMonster.defense) * weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1);
  
  if (isMonsterHit()) {
    monsterHealth = Math.max(monsterHealth - damage, 0);
    msgText.innerText += ` You hit the ${currentMonster.name} for ${damage} damage.`;

  } else {
    msgText.innerText += " You miss.";
  }

  if (monsterHealth <= 0) {
    result(); // Result of the battle
    // Reset health and proceed with the game (e.g., move to the next location)
  }
  // This part to handle monster health bar on the page
  const healthPercentage = (monsterHealth/currentMonsterHealth) * 100;
  monsterHealthBar.style.width = `${healthPercentage}%`; 
  console.log((monsterHealth/currentMonsterHealth) * 100 + '%');
};

const monstersAttack = () => { // Monsters attack loop
  const damage = Math.floor(getMonsterAttackValue(currentMonster.level))
  health = Math.max(health - damage, 0);

  /*const computedStyle = getComputedStyle(playerHealthBar);
  const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
  playerHealthBar.style.setProperty('--width', width - Math.floor(damage* (width/health)));
  playerHealthBar.setAttribute('data-label', `${health}`)
  console.log(`${width - (damage* Math.floor(width/health))}`)*/

  if (health <= 0) {
    result();
  }

  const healthPercentage = (health/currentHealth) * 100;
  playerHealthBar.style.width = `${healthPercentage}%`;
  console.log(`${healthPercentage}%`);

};

const result = () => {
  // Reset battleResult (this triggers onBattleResultChange, but holdNextText is null so nothing happens)
  battleResult.length = 0;
  if (health <= 0) {
    battleResultArray.push('lose');
    msgText.innerText = `You were defeated by the ${currentMonster.name}.`;
    
    // this is where hp and sanity subtracted
    /* hpPool -= 1;
    hpText.innerText = health;
    sanityPool -= 1;
    sanityText.innerText = sanity; */
    setTimeout(() => {
      popBattlePage.style.display = 'none';
      resetHealth();
      currentMonster = null;
      startFight.style.display = 'block';
    }, 3000); // 3 second delay to close the page
    
  } else if (monsterHealth <= 0) {
    battleResultArray.push('won');
    msgText.innerText += ` You defeated the ${currentMonster.name}!`;
    defeatMonster();
    setTimeout(() => {
      popBattlePage.style.display = 'none';
      resetHealth();
      currentMonster = null;
      startFight.style.display = 'block';
    }, 3000);
  } // need to add if hp or sanity less than 0 = game over
};

const resultHandler = {
  set(target, property, value, receiver) {
    const result = Reflect.set(target, property, value, receiver);
    // to check if the property is numeric (an index) or the "length" property.
    if (!isNaN(property) || property === "length") {
      // Whenever a change occurs, call the function that triggers your nextText logic.
      onBattleResultChange();
    }
    return result;
  }
};

export let battleResult = new Proxy (battleResultArray, resultHandler);

const resetHealth = () => {
  health = initialHealth;
  monsterHealthBar.style.width = '100%'
  playerHealthBar.style.width = '100%'
};

// 
const playerLoseBattle = () => {

};

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp)); // need to change level to attack as a base for monster attack multiplier value
  console.log(hit);
  return hit > 0 ? hit : 0;
};

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
};

function dodge() {
  msgText.innerText = "You dodge the attack from the " + currentMonster.name;
};

function defeatMonster() { // edit
  gold += Math.floor(currentMonster.level * 6.7);
  xp += currentMonster.level;
  // add gold text and xp text
};

console.log(battleResultArray);
// need to add story and need to make sure the battle page can re-trigger again