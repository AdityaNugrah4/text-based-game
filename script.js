// list i need to built:
// - inventory system
// - player stats
// - combat system (using 20 side dice)
// - map
// - story (with secret path to achieve different ending)
// - add weapon and armor
// - player class based on equipment

// Game title - Path: Select

import {
  battleResultArray, testBattleButton, battleResult, currentMonster,
  chooseCurrentMonster
} from './CombatLoop.js'

let playerStats = {
  str : 0,
  dex : 0,
  int : 0,
  cha : 0,
  wis : 0,
  con : 0,
};
let inventory = [];
export let equippedWeapon1 = null;
export let equippedWeapon2 = null;
export let equippedArmor = null;
export let equippedAccessories1 = null;
export let equippedAccessories2 = null;
export let hpPool = 0;
export let sanityPool = 0;
export const hpPoolText = document.getElementById("health-pool");
export const sanityPoolText = document.getElementById("sanity-pool");

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const createButton = document.getElementById("customize-button");
const createCharacter = document.getElementById("create-character");
const text = document.getElementById("text");
const strText = document.querySelector("#str-Text");
const dexText = document.querySelector("#dex-Text");
const intText = document.querySelector("#int-Text");
const wisText = document.querySelector("#wis-Text");
const conText = document.querySelector("#con-Text");
const chaText = document.querySelector("#cha-Text");
export const weaponList = [
    {name: 'dagger', hand: 1, type: 'weapon', attack: 5, iconIndex: 0,criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 0, y: 335},
    {name: 'one-handed sword', hand: 1,  type: 'weapon',attack: 15, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 47, y: 335},
    {name: 'bastard sword', hand: 1,  type: 'weapon',attack: 15, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 144, y: 335},
    {name: 'katana', hand: 2,  type: 'weapon',attack: 25, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 0, y: 383},
    {name: 'war axe', hand: 2, type: 'weapon', attack: 35, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1',  x: 528, y: 287},
    {name: 'spear', hand: 2, type: 'weapon', attack: 30, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 240, y: 335},
    {name: 'recurve bow', hand: 2, type: 'weapon', attack: 20, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 528, y: 432},
    {name: 'warhammer', hand: 2, type: 'weapon', attack: 30, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 336, y: 383},
    {name: 'wooden wand', hand: 1, type: 'weapon', attack: 30, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 0, y: 526},
    {name: 'zweihander', hand: 2, type: 'weapon', attack: 45, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 528, y: 383},
    {name: 'wizard staff', hand: 2, type: 'weapon', attack: 45, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 144, y: 526},
    {name: 'round wooden shield', hand: 1, type: 'weapon', attack: 45, criticalRate: 0, criticalDmg: 0, defense: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, freezeDmg: 0, lightningDmg: 0, spriteSheet: 'spriteSheetW1', x: 337, y: 526},
    // need to add special or ability bonus to the weaponList
];
export const armorList = [
    {name: 'padded armor', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 32},
    {name: 'splint mail', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 0},
    {name: 'mage robe', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 128},
    {name: 'half-plate armor', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 256},
    {name: 'wizard cloth', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 64},
    {name: 'plate armor', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 160},
    {name: 'robe of solomon', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 192},
    {name: 'scale of níðhöggr', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 224},
    {name: 'plate of cronus', type: 'armor', addedHealth: 0, defense: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0, spriteSheet: 'spriteSheetAmor', x: 32, y: 96},
    //this for for armor
];
export const enemies = [
    {name: 'Mushtoom', level: 2, health: 20, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Goblin', level: 2, health: 20, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Flying Eye', level: 3, health: 20, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Skeleton', level: 3, health: 20, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Gorgon', level: 8, health: 50, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Red Wolf', level: 8, health: 50, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Karasu Tengu', level: 8, health: 50, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
    {name: 'Kitsune', level: 10, health: 70, attack: 0, defense: 0, criticalRate: 0, criticalDmg: 0, penetrationDmg: 0, stunDmg: 0, bleedDmg: 0, poisonDmg: 0, fireDmg: 0, lightningDmg: 0, resStun: 0, resBleed: 0, resPoison: 0, resFire: 0, resFreeze: 0, resLightning: 0},
];
const items = [
  {name: 'health potion', type: 'consumable', hp: 1, spriteSheet: 'spriteSheetW1', x: 528, y: 192},
  {name: 'sanity potion', type: 'consumable', sanity: 1, spriteSheet: 'spriteSheetW1', x: 384, y: 192},
  {name: 'rope', type: 'equipment', spriteSheet: 'spriteSheetW1', x: 143, y: 287},
  {name: 'shovel', type: 'equipment', spriteSheet: 'spriteSheetW1', x: 102, y: 287},
  {name: 'pickaxe', type: 'equipment', spriteSheet: 'spriteSheetW1', x: 240, y: 287 },
  {name: 'key', type: 'equipment', spriteSheet: 'spriteSheetW1', x: 528, y: 143},
  {name: 'book of knowledge', type: 'consumable', int: 5,spriteSheet: 'spriteSheetW1', x: 336, y: 576},
  {name: 'stamina book', type: 'consumable', con: 5,spriteSheet: 'spriteSheetW1', x: 432, y: 576},
  {name: 'strength book', type: 'consumable', str: 5, spriteSheet: 'spriteSheetW1', x: 384, y: 576},
  {name: 'the ring', type: 'equipment', spriteSheet: 'spriteSheetW1', x: 289, y: 91},

];

// Load icon 
const canvasList = {
  weapon1: {
    canvas: document.getElementById("weapon1-canvas"),
    spriteSheet: new Image(),
    spriteSrc: './images/roguelikeitemsx3.png',
    width: 50,
    height: 50,
    spriteWidth: 49,
    spriteHeight: 49,
  },
  weapon2: {
    canvas: document.getElementById("weapon2-canvas"),
    spriteSheet: new Image(),
    spriteSrc: './images/roguelikeitemsx3.png',
    width: 50,
    height: 50,
    spriteWidth: 49,
    spriteHeight: 49,
  },
  armor: {
    canvas: document.getElementById("armor-canvas"),
    spriteSheet: new Image(),
    spriteSrc: './images/armor_sheet_32x32.png',
    width: 50,
    height: 50,
    spriteWidth: 32,
    spriteHeight: 32,
  },
  accessories1: {
    canvas: document.getElementById("wearable-acccessories1-canvas"),
    spriteSheet: new Image(),
    spriteSrc: './images/roguelikeitemsx3.png',
    width: 50,
    height: 50,
    spriteWidth: 49,
    spriteHeight: 49,
  },
  accessories2: {
    canvas: document.getElementById("wearable-acccessories2-canvas"),
    spriteSheet: new Image(),
    spriteSrc: './images/roguelikeitemsx3.png',
    width: 50,
    height: 50,
    spriteWidth: 49,
    spriteHeight: 49,
  },
};

// To initialise canvas ctx and images
Object.values(canvasList).forEach(config => {
  config.ctx = config.canvas.getContext('2d');
  config.spriteSheet.src = config.spriteSrc;
});

const renderIcon = (type, xPos, yPos) => {
  const config = canvasList[type];
  if (!config || !config.ctx) {
    console.error(`invalid type: ${type}`);
    return;
  }
  config.spriteSheet.onload = () => {
    config.ctx.clearRect(0, 0 ,config.width, config.height);
    config.ctx.drawImage( config.spriteSheet, xPos, yPos, config.spriteWidth, config.spriteHeight, 0, 0, config.width, config.height);
  };
  config.spriteSheet.src = config.spriteSrc
};
// Load icon end here ---

// Toggle hide and show inventory
const inventoryButton = () => {
    let x = document.getElementById("inventory");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
};
button2.addEventListener('click', () => {inventoryButton();});
const inventoryCloseBtn = document.getElementById("inventory-close-button");
inventoryCloseBtn.addEventListener('click', () => {inventoryButton()});

// Toggle show character creation modal
const toggleToShow = () => {
  let x = document.getElementById('pop-up-character-customization-menu');
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};

// This is Equipment System
// const inventoryItems = []; // To store equipments and items
// function itemAdd () {}; // To add and update equipments and items
// function itemFinds () {}; // To find equipments and items from the array
// inventory: how to limit how many object inside array based on how many inventory <div> exists
// --Equipment system end here--

// function(3)
const selectWeaponOption = document.getElementById("weapon-select");
const selectArmorOption = document.getElementById("armor-select");
const selectedWeaponEquip1 = document.getElementById("weapon1");
const selectedArmorEquip = document.getElementById("armor");
const addEquipMessage = document.getElementById("add-equip-message");

weaponList.forEach((weapon, index) => {
  let option = document.createElement("option");
  option.value = index;
  option.text = weapon.name;
  selectWeaponOption.appendChild(option);
});
armorList.forEach((armor, index) => {
  let option = document.createElement("option");
  option.value = index;
  option.text = armor.name;
  selectArmorOption.appendChild(option);
});
// function(3) end here --

// function(2)  to check if name has been selected (done)
const givenName = ['Henry', 'Charles', 'Winston', 'Jean', 'Genghis', 'Liu', 'Yamato', 'Cao Cao'];
const surname = ['Einstein', 'Bonaparte', 'Voltaire', 'Bach', 'Li', 'Mao', 'Zhou', 'Ieyasu', 'Satou'];
const selectGivenName = document.getElementById("given-name");
const selectSurname = document.getElementById("surname");
// These to loop through the array and create option elements for both Given Name and Surname option
givenName.forEach((optionText, index) => {
  let option = document.createElement("option");
  option.value = optionText;
  option.text = optionText;
  selectGivenName.appendChild(option);
});
surname.forEach((optionText, index) => {
  let option = document.createElement("option");
  option.value = optionText;
  option.text = optionText;
  selectSurname.appendChild(option);
});
// function(2) end here --

// Function(4)
// Limiting the value of stat inside a group of input
const inputsStats = document.querySelectorAll(".stat-input");
const totalSumElement = document.getElementById("sum-stats");
const maxInputsStats = 48; // Max point allocation

const calculateSumStats = () => {
  let sumStats = 0;
  inputsStats.forEach(input => {
    const value = parseFloat(input.value) || 0;
    sumStats += value;
  });
  if (sumStats > maxInputsStats) {
    sumStats = maxInputsStats;
  }
  totalSumElement.textContent = sumStats;
// Points allocation based on how much left points that can be distributed
  const remaining = maxInputsStats - sumStats;
  inputsStats.forEach(input => {
    const value = parseFloat(input.value) || 0;
    input.max = Math.min(30, remaining + value);
  });
};

inputsStats.forEach(input => {
  input.addEventListener("input", calculateSumStats);
});

// Handling input value changes with wheel and arrow keys
const inputsStatsAll = [
  document.getElementById("str-input"),
  document.getElementById("dex-input"),
  document.getElementById("int-input"),
  document.getElementById("cha-input"),
  document.getElementById("wis-input"),
  document.getElementById("con-input"),
];

inputsStatsAll.forEach(input => {
  input.addEventListener("keydown", (event) =>{
    // Allow only one character input
    if (input.value.length >= 1 && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
    // Handle ArrowUp and ArrowDown for increasing/decreasing values
    if (event.key === "ArrowUp") {
      event.preventDefault();
      input.value = Math.min(input.max || 30, parseFloat(input.value) + 1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      input.value = Math.max(input.min || 1, parseFloat(input.value) - 1);
    }
    calculateSumStats();
  });
});

inputsStatsAll.forEach(input => {
  input.addEventListener("wheel", (event) => {
    event.preventDefault();
    const newValue = parseFloat(input.value) + (event.deltaY < 0 ? 1 : -1);
    input.value = Math.max(input.min || 0, Math.min(input.max || 30, newValue));
    calculateSumStats();
  });
});
// function(4) end here --
// Function to add inventory slots
// inventory capacities based on player CON
const inventoryContainer = document.getElementById('storage-inventory');
let inventoryCanvases = []; // To store canvas elements
let counterCon = 0; // To track how many slots have been added
let currentStatSlots = 0; // Tracks how many slots were added based on stats
let itemInventoryMap = {}; // Map to track which item is associated with each slot

// Function to add inventory slots dynamically
const addInventorySlots = (count) => {
  for (let i = 0; i < count; i++) {
    const newDiv = `<div class="stored"><canvas id="slot-${counterCon}" width="50" height="50"></canvas></div>`;
    inventoryContainer.insertAdjacentHTML('beforeend', newDiv);
    const canvasInsideInventory = inventoryContainer.lastElementChild.querySelector('canvas'); // Get last added canvas
    inventoryCanvases.push(canvasInsideInventory); // Store the canvas in inventoryCanvases array

    // Initialize the map with null (empty slot)
    itemInventoryMap[`slot-${counterCon}`] = null;
    counterCon++;
  }
};

const addInventorySlotByStats = () => {
  const totalSlotsNeeded = Math.floor(playerStats.con / 3); // Total slots needed based on player CON
  const newSlots = totalSlotsNeeded - currentStatSlots; // Only add the slots that haven’t added yet

  if (newSlots > 0) {
    addInventorySlots(newSlots);
    currentStatSlots += newSlots; // Update the number of slots added for stats
  }
};
// End here --

// all function combined
createCharacter.addEventListener('click', () => {
  toggleToShow();
});

createButton.addEventListener('click', () => {
  // Function(3) armor & weapon
  const selectedWeaponIndex = selectWeaponOption.value;
  const selectedArmorIndex = selectArmorOption.value;
  addEquipMessage.textContent = ''; // To clear previous message
  if (selectedWeaponIndex === "" || selectedArmorIndex === "") {
    alert('Please choose armor and weapon');
    return false;
  }
  // Get weapon and armor by index
  // Get weapon and armor as object to inventory
  const selectedWeaponObject = weaponList[selectedWeaponIndex];
  const selectedArmorObject = armorList[selectedArmorIndex];
  // Set the content of the 'weapon' and 'armor' divs
  // Store the selected equipment in object
  equippedWeapon1 = selectedWeaponObject;
  equippedArmor = selectedArmorObject;
  // Render icon
  renderIcon('weapon1', selectedWeaponObject.x, selectedWeaponObject.y);
  renderIcon('armor', selectedArmorObject.x, selectedArmorObject.y);
  // Load icon end here --

  // Function(2) to check if name has been selected (done)
  let addNameMessage = document.getElementById("name-add-message");
  addNameMessage.textContent = ''; // Clear previous messages
  if (selectGivenName.value === "" || selectSurname.value === "") {
    alert('Please choose both Given Name and Surname');
    return false;
  }
  const selectedGivenName = selectGivenName.value;
  const selectedSurname = selectSurname.value;
  const playerNameSelected = document.getElementById("player-name-selected");
  playerNameSelected.textContent = `Name: ${selectedGivenName} ${selectedSurname}`

  // Function(4) to add point to stats
  const strValue = parseFloat(document.getElementById("str-input").value);
  const dexValue = parseFloat(document.getElementById("dex-input").value);
  const intValue = parseFloat(document.getElementById("int-input").value);
  const chaValue = parseFloat(document.getElementById("cha-input").value);
  const wisValue = parseFloat(document.getElementById("wis-input").value);
  const conValue = parseFloat(document.getElementById("con-input").value);
  const inputs = [strValue, dexValue, intValue, chaValue, wisValue, conValue];
  
  // Filter out invalid stats (NaN or 0)
  const statsValue = inputs.filter(stat => !isNaN(stat) && stat > 0);
  const totalStats = statsValue.reduce((acc, stat) => acc + stat, 0);
  let addStatsMessage = document.getElementById("point-add-message");
  addStatsMessage.textContent = ''; // Clear previous messages
  
  // To prevent any of the stats value left 0
  // remember to change this back
  if (isNaN(strValue) || isNaN(dexValue) || isNaN(intValue) || isNaN(chaValue) || isNaN(wisValue) || isNaN(conValue) || strValue <= 0 || dexValue <= 0 || intValue <= 0 || chaValue <= 0 || wisValue <= 0 || conValue <= 0) {
    alert('Please fill all the stats');
    return false;
  }

  // Check if the sum of valid stats is 48
  if (statsValue.length === 0 || totalStats !== 48) {
    alert(`You have allocated ${totalStats} points, but you need to allocate exactly 48 points`);
    return false;
  }

  // Update character stats
  playerStats.str = strValue; strText.innerText = playerStats.str;
  playerStats.dex = dexValue; dexText.innerText = playerStats.dex;
  playerStats.int = intValue; intText.innerText = playerStats.int;
  playerStats.cha = chaValue; chaText.innerText = playerStats.cha;
  playerStats.wis = wisValue; wisText.innerText = playerStats.wis;
  playerStats.con = conValue; conText.innerText = playerStats.con;
  hpPool += 5; hpPoolText.innerText = hpPool;
  sanityPool += 5; sanityPoolText.innerText = sanityPool;
  //condition where a div is added every time the value of a Con can be divided by 3. You would also need to increment con (e.g., by 1 each time) and check if it is divisible by 3. If it is divisible by 3, you add the div element to the DOM.
  // Check and add a div each time con is divisible by 3
  // Use a loop to add divs for each multiple of 3 (if con is updated many times)
  addInventorySlots(6);
  addInventorySlotByStats();
  // To close both pop-up customize charater and create charatcer button
  document.getElementById('pop-up-character-customization-menu').style.display = 
  (document.getElementById('pop-up-character-customization-menu').style.display === "none") ? "block" : "none";
  document.getElementById('create-character').style.display = 
  (document.getElementById('create-character').style.display === "none") ? "block" : "none";
  // To close the page
  let x = document.getElementById('pop-up-character-customization-menu');
  x.style.display = "none";
  //showTextNode(1); // To show the story after creating palyer stats
  storyText.innerText = ""

  startGame();
  storyTextOption();
  return true;
});

// Function to always checks and update every time player stats change
function updatePlayerStats (newStrAdded, newDexAdded, newIntAdded, newChaAdded, newWisAdded, newConAdded) { // This function need to be updated
  // Update the global stats value
  playerStats.str = newStrAdded; //added later
  playerStats.dex = newDexAdded; //added later
  playerStats.int = newIntAdded; //added later
  playerStats.cha = newChaAdded; //added later
  playerStats.wis = newWisAdded; //added later
  playerStats.con = newConAdded;

  let counterCon = 0;
  for (let i = 3; i <= con; i += 3) {
    const newDiv = `<div class="stored"><canvas></canvas></div>`;
    inventoryContainer.insertAdjacentHTML('beforeend', newDiv);
    counterCon++;
  }
  console.log('Equipped Weapon 1:', equippedWeapon1);
  console.log('Equipped Weapon 2:', equippedWeapon2);
  console.log('Equipped Armor:', equippedArmor);
  console.log('Equipped Accessories1:', equippedAccessories1);
  console.log('Equipped Accessories2:', equippedAccessories2);
  console.log(inventory)

};

// Function to render icons in inventory
const renderIconInventoryCanvas = () => {
  // Loop through all canvas slots based on itemInventoryMap
  for (let slotId in itemInventoryMap) {
    const item = itemInventoryMap[slotId]; // Get the item associated with this slot
    const canvasSlot = document.getElementById(slotId); // Get corresponding canvas element

    if (!canvasSlot) {
      console.error(`Canvas for ${slotId} not found`);
      continue;
    }

    const ctx = canvasSlot.getContext('2d');
    ctx.clearRect(0, 0, canvasSlot.width, canvasSlot.height); // Clear canvas

    if (!item) {
      // Slot is empty, skip rendering
      continue;
    }

    let config, spriteSheet, spriteX, spriteY;

    // Determine sprite configuration based on item type
    if (item.type === 'weapon') {
      config = canvasList.weapon1;
    } else if (item.type === 'armor') {
      config = canvasList.armor;
    } else if (item.type === 'consumable') {
      config = canvasList.accessories1;
    } else if (item.type === 'consumable') {
      config = canvasList.accessories2;
    } else if (item.type === 'equipment') {
      config = canvasList.accessories1;
    } else { 
      console.warn(`Unknown item type for item ${item.name}`);
      continue;
    }

    spriteSheet = config.spriteSheet; // The sprite sheet image object
    spriteX = item.x;                 // X position in the sprite sheet
    spriteY = item.y;                 // Y position in the sprite sheet

    // Draw the item sprite onto the canvas
    ctx.drawImage(
      spriteSheet,
      spriteX, spriteY,                      // Source X, Y in sprite sheet
      config.spriteWidth, config.spriteHeight, // Width and height of sprite in sheet
      0, 0,                                  // Destination X, Y in canvas
      canvasSlot.width, canvasSlot.height     // Scale to fit canvas size
    );
  }
};
// Render icon to inventory end here ---

// Render icon back in equipped slot
function updateEquippedSlotDisplay() {
  if (equippedWeapon1) {
    renderIcon(equippedWeapon1, "weapon1-canvas");
  }
  if (equippedWeapon2) {
    renderIcon(equippedWeapon2, "weapon2-canvas");
  }
  if (equippedArmor) {
    renderIcon(equippedArmor, "armor-canvas");
  }
  if (equippedAccessories1) {
    renderIcon(equippedAccessories1, "wearable-accessories1-canvas");
  }
  if (equippedAccessories2) {
    renderIcon(equippedAccessories2, "wearable-accessories2-canvas");
  }
}
// Render icon back in equipped slot end here---

// Move equipment and items to inventory
canvasList.weapon1.canvas.addEventListener('click', () => {
  if (equippedWeapon1 && equippedWeapon1.name) {
    let weaponMove = equippedWeapon1; // Move the whole object
    addItemToInventory(weaponMove); // Add weapon to inventory
    equippedWeapon1 = {};  // Clear the equipped weapon (move it out)

    // Clear the canvas
    const { ctx, width, height } = canvasList.weapon1;
    ctx.clearRect(0, 0, width, height);

    renderIconInventoryCanvas(); // Re-render the inventory icons
  }
});

canvasList.weapon2.canvas.addEventListener('click', () => {
  if (equippedWeapon2 && equippedWeapon2.name) {
    let weaponMove = equippedWeapon2; // Move the whole object
    addItemToInventory(weaponMove); // Add weapon to inventory
    equippedWeapon2 = {};  // Clear the equipped weapon (move it out)

    // Clear the canvas
    const { ctx, width, height } = canvasList.weapon2;
    ctx.clearRect(0, 0, width, height);

    renderIconInventoryCanvas(); // Re-render the inventory icons
  }
});

// Move Armor to Inventory on Click
canvasList.armor.canvas.addEventListener('click', () => {
  if (equippedArmor && equippedArmor.name) {
    let armorMove = equippedArmor; // Move the whole object
    addItemToInventory(armorMove); // Add armor to inventory
    equippedArmor = {};  // Clear the equipped armor

    // Clear the canvas
    const { ctx, width, height } = canvasList.armor;
    ctx.clearRect(0, 0, width, height);

    renderIconInventoryCanvas(); // Re-render the inventory icons
  }
});

// Function to add an item to the first available empty slot in the inventory
const addItemToInventory = (item) => {
  if (!item || !item.name) {  // Check if item is valid
    console.error('Invalid item, cannot add to inventory.');
    return;
  }

  // Find the first available slot in the inventory
  const emptySlotId = Object.keys(itemInventoryMap).find(slotId => itemInventoryMap[slotId] === null);

  if (!emptySlotId) {  // If no available slot found
    console.log('No available inventory slots.');
    return;
  }

  // Add the item to the inventory array and update itemInventoryMap
  inventory.push(item);
  itemInventoryMap[emptySlotId] = item;

  console.log(`Item "${item.name}" added to slot ${emptySlotId} in inventory.`);
  renderIconInventoryCanvas();  // Update the inventory display
};


// Helper function to check if the item is currently equipped
const itemIsCurrentlyEquipped = (item) => {
  return (
    item === equippedWeapon1 ||
    item === equippedWeapon2 ||
    item === equippedArmor ||
    item === equippedAccessories1 ||
    item === equippedAccessories2
  );
};

// Function to Equip weapon, armor, or accessories from inventory
const isEquippedSlotAvailable = (slot) => slot === null; // Utility function
const equipItem = (name, type) => {
  const itemIndex = inventory.findIndex(item => item.name === name && item.type === type);
  if (itemIndex === -1) {
    console.log(`Item ${name} of type ${type} not found in inventory.`);
    return;
  }

  const item = inventory[itemIndex];

  if (type === 'weapon') {
    if (item.hand === 2) { // Two-handed weapon
      openWeaponSwitch(item);
      return;
    } else if (item.hand === 1) { // One-handed weapon
      console.log("Equipping a one-handed weapon.");
      console.log("Current equipped weapons:", equippedWeapon1, equippedWeapon2);
      if (equippedWeapon1 && equippedWeapon1.hand === 2) {
        openWeaponSwitch2HandModal(item);
        return;
      } else if (!equippedWeapon1 || Object.keys(equippedWeapon1).length === 0) {
        openWeaponSwitchEquipped1(item);
        return;
      } else if (!equippedWeapon2 || Object.keys(equippedWeapon2).length === 0) {
        openWeaponSwitchEquipped2(item);
        return;
      } else {
        console.log(`Both weapon slots are occupied. Opening modal for weapon: ${item.name}`);
        // If both slots are occupied, open a modal
        openWeaponReplaceModal(item);
        return; // Wait for modal selection
      }
      console.log("New state after equipping:", equippedWeapon1, equippedWeapon2);
    }
  } else if (type === 'armor') {
    if (equippedArmor) addItemToInventory(equippedArmor);
    equippedArmor = item;
    renderIcon('armor', item.x, item.y);
  } else if (type === 'accessory') {
    if (!equippedAccessories1) {
      equippedAccessories1 = item;
      renderIcon('accessories1', item.x, item.y);
    } else if (!equippedAccessories2) {
      equippedAccessories2 = item;
      renderIcon('accessories2', item.x, item.y)
    } else {
      openAccessoriesModal(item);
    }
  } else if (type === 'consumable') {
    openConsumableModal(item);
    return;
  } else if (type === 'equipment') {
    console.warn(`Cannot equip ${item} type "${type}".`);
    inventory.splice(itemIndex, 1);
    openEquipmentModal(item);
    return;
  } else {
    console.log(`Invalid type "${type}".`);
    return;
  };

  inventory.splice(itemIndex, 1);
  console.log("After inventory update, equippedWeapon1:", equippedWeapon1);
  console.log("After inventory update, equippedWeapon2:", equippedWeapon2);
  renderIconInventoryCanvas(); // Update inventory display
};

// Function to UnEquip weapon, armor, or accessories from inventory
const unequipItemByType = (type) => {
  if (type === 'weapon') {
    if (equippedWeapon1) {
      console.log(`Unequipping "${equippedWeapon1.name}" from Weapon Slot 1.`);
      addItemToInventory(equippedWeapon1);
      equippedWeapon1 = null;
    } else if (equippedWeapon2) {
      console.log(`Unequipping "${equippedWeapon2.name}" from Weapon Slot 2.`);
      addItemToInventory(equippedWeapon2);
      equippedWeapon2 = null;
    } else {
      console.log("No weapons currently equipped.");
    }
  } else if (type === 'armor') {
    if (equippedArmor) {
      console.log(`Unequipping "${equippedArmor.name}".`);
      addItemToInventory(equippedArmor);
      equippedArmor = null;
    } else {
      console.log("No armor currently equipped.");
    }
  } else if (type === 'accessory') {
    if (equippedAccessories1) {
      console.log(`Unequipping "${equippedAccessories1.name}" from Accessories Slot 1.`);
      addItemToInventory(equippedAccessories1);
      equippedAccessories1 = null;
    } else if (equippedAccessories2) {
      console.log(`Unequipping "${equippedAccessories2.name}" from Accessories Slot 2.`);
      addItemToInventory(equippedAccessories2);
      equippedAccessories2 = null;
    } else {
      console.log("No accessories currently equipped.");
    }
  } else {
    console.log(`Invalid type "${type}".`);
  }
  updateEquippedSlotDisplay();  // Update equipped slots
  renderIconInventoryCanvas();  // Update inventory UI
};
// Remove equipment and items and here --

// Equipping item from inventory
inventoryContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.tagName === 'CANVAS' && target.id.startsWith('slot-')) {
    const slotId = target.id;
    handleCanvasClick(slotId);

    const item = itemInventoryMap[slotId];
    if (!item) {
      console.log(`No item in slot ${slotId}`);
      return;
    }

    equipItem(item.name, item.type); // Equip the item

    // Do not call addItemToInventory() here after equipping
    itemInventoryMap[slotId] = null; // Clear the map only
    const ctx = target.getContext('2d');
    ctx.clearRect(0, 0, target.width, target.height); // Clear canvas
  }
});

// To handle if (item.hand === 2)
const openWeaponSwitch = (item) => {
  const modal =`
  <div id="weapon-modal" class="modal-page">
    <a id="equipment-modal-text">Do you want to switch current weapon with "${item.name}"?</a>
    <div>
      <button id="yes-btn" class="consumable-modal-button">Replace Weapon1</button>
      <button id="cancel-btn" class="consumable-modal-button">Cancel</button>
      <button id="delete-btn" class="consumable-modal-button">Delete</button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);
  const yesBtn = document.getElementById("yes-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const deleteBtn = document.getElementById("delete-btn");
  yesBtn.addEventListener('click', () => {
    [equippedWeapon1, equippedWeapon2].forEach(weapon => {
      console.log("Equipping a two-handed weapon.");
      console.log("Current equipped weapons:", equippedWeapon1, equippedWeapon2);
      if (weapon) {
        console.log(`Unequipping weapon: ${weapon.name}`);
        addItemToInventory(weapon)
      };
    });

    equippedWeapon1 = item;
    equippedWeapon2 = null; // Lock slot 2
    console.log("New state after equipping:", equippedWeapon1, equippedWeapon2);
    renderIcon('weapon1', item.x, item.y);
    renderIcon('weapon2', null); // To clear icon
    inventory.splice(item, 1);
    console.log("After inventory update, equippedWeapon1:", equippedWeapon1);
    console.log("After inventory update, equippedWeapon2:", equippedWeapon2);
    renderIconInventoryCanvas(); // Update inventory display
    closeModalPage();
  });
  cancelBtn.addEventListener('click', () => {
    closeModalPage();
  });
  deleteBtn.addEventListener('click', () => {
    deleteItemFromInventory(item);
    closeModalPage();
  });

  const modalstyle = document.getElementById("weapon-modal");
  modalstyle.style.display = 'block';
};

// To handle if (equippedWeapon1 && equippedWeapon1.hand === 2)
const openWeaponSwitch2HandModal = (item) => {
  const modal = `
  <div id="weapon-modal" class="modal-page">
    <a id="equipment-modal-text">You are equipped with a two-handed weapon. Do you want to switch it with "${item.name}"?</a>
    <div>
      <button id="yes-btn" class="consumable-modal-button">Replace Weapon</button>
      <button id="cancel-btn" class="consumable-modal-button">Cancel</button>
      <button id="delete-btn" class="consumable-modal-button">Delete</button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);
  const yesBtn = document.getElementById("yes-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const deleteBtn = document.getElementById("delete-btn");
  yesBtn.addEventListener('click', () => {
    addItemToInventory(equippedWeapon1);
    equippedWeapon1 = item;
    renderIcon('weapon1', item.x, item.y);
    inventory.splice(item, 1);
    closeModalPage();
  });
  cancelBtn.addEventListener('click', () => {
    closeModalPage();
    addItemToInventory(item);
  });
  deleteBtn.addEventListener('click', () => {
    deleteItemFromInventory(item);
    closeModalPage();
  });

  const modalstyle = document.getElementById("weapon-modal");
  modalstyle.style.display = 'block';
};

// To handle if both equipped slots are full
const openWeaponReplaceModal = (item) => {
  const modal = `
  <div id="weapon-modal" class="modal-page">
    <a id="equipment-modal-text">Do you want to switch current weapon with "${item.name}"?</a>
    <div>
      <button id="weapon1-btn" class="consumable-modal-button">Replace Weapon1</button>
      <button id="weapon2-btn" class="consumable-modal-button">Replace Weapon2</button>
      <button id="delete-btn" class="consumable-modal-button">Delete</button>
      <button id="cancel-btn" class="consumable-modal-button">Cancel</button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);
  const weapon1 = document.getElementById("weapon1-btn");
  const weapon2 = document.getElementById("weapon2-btn");
  const cancel = document.getElementById("cancel-btn");
  const deleteBtn = document.getElementById("delete-btn");
  weapon1.addEventListener('click', () => {
    addItemToInventory(equippedWeapon1);
    equippedWeapon1 = item;
    inventory.splice(item, 1);
    closeModalPage();
    renderIcon('weapon1', item.x, item.y);
  });
  weapon2.addEventListener('click', () => {
    addItemToInventory(equippedWeapon2);
    equippedWeapon2 = item;
    inventory.splice(item, 1);
    closeModalPage();
    renderIcon('weapon2', item.x, item.y);
  });
  cancel.addEventListener('click', () => {
    closeModalPage();
    addItemToInventory(item);
  });
  deleteBtn.addEventListener('click', () => {
    deleteItemFromInventory(item);
    closeModalPage();
  });
  const modalstyle = document.getElementById("weapon-modal");
  modalstyle.style.display = 'block';
};

// To handle if (!equippedWeapon1 || Object.keys(equippedWeapon1).length === 0)
const openWeaponSwitchEquipped1 = (item) => {
  const modal =`
  <div id="weapon-modal" class="modal-page">
    <a id="equipment-modal-text">Do you want to switch current weapon with "${item.name}"?</a>
    <div>
      <button id="yes-btn" class="consumable-modal-button">Replace Weapon</button>
      <button id="cancel-btn" class="consumable-modal-button">Cancel</button>
      <button id="delete-btn" class="consumable-modal-button">Delete</button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);
  const yesBtn = document.getElementById("yes-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const deleteBtn = document.getElementById("delete-btn");
  yesBtn.addEventListener('click', () => {
    console.log(`Before assigning: equippedWeapon1 =`, equippedWeapon1);
    equippedWeapon1 = JSON.parse(JSON.stringify(item)); // Assign a deep clone
    console.log("After assigning to equippedWeapon1:", equippedWeapon1);

    renderIcon('weapon1', item.x, item.y); // Render item on the canvas
    console.log("After rendering icon, equippedWeapon1:", equippedWeapon1);
    inventory.splice(item, 1);
    console.log("After inventory update, equippedWeapon1:", equippedWeapon1);
    console.log("After inventory update, equippedWeapon2:", equippedWeapon2);
    renderIconInventoryCanvas(); // Update inventory display
    closeModalPage();
  });
  cancelBtn.addEventListener('click', () => {
    closeModalPage();
    addItemToInventory(item);
  });
  deleteBtn.addEventListener('click', () => {
    deleteItemFromInventory(item);
    closeModalPage();
  });
  const modalstyle = document.getElementById("weapon-modal");
  modalstyle.style.display = 'block';
};

// To handle if (!equippedWeapon2 || Object.keys(equippedWeapon2).length === 0)
const openWeaponSwitchEquipped2 = (item) => {
  const modal =`
  <div id="weapon-modal" class="modal-page">
    <a id="equipment-modal-text">Do you want to switch current weapon with "${item.name}"?</a>
    <div>
      <button id="yes-btn" class="consumable-modal-button">Replace Weapon</button>
      <button id="cancel-btn" class="consumable-modal-button">Cancel</button>
      <button id="delete-btn" class="consumable-modal-button">Delete</button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);
  const yesBtn = document.getElementById("yes-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  const deleteBtn = document.getElementById("delete-btn");
  yesBtn.addEventListener('click', () => {
    console.log(`Before assigning: equippedWeapon2 =`, equippedWeapon2);
    equippedWeapon2 = JSON.parse(JSON.stringify(item)); // Assign a deep clone
    console.log("After assigning to equippedWeapon2:", equippedWeapon2);
  
    renderIcon('weapon2', item.x, item.y); // Render item on the canvas
    console.log("After rendering icon, equippedWeapon2:", equippedWeapon2);
    inventory.splice(item, 1);
    console.log("After inventory update, equippedWeapon1:", equippedWeapon1);
    console.log("After inventory update, equippedWeapon2:", equippedWeapon2);
    renderIconInventoryCanvas(); // Update inventory display
    closeModalPage();
  });
  cancelBtn.addEventListener('click', () => {
    closeModalPage();
    addItemToInventory(item);
  });
  deleteBtn.addEventListener('click', () => {
    deleteItemFromInventory(item);
    closeModalPage();
  });
  const modalstyle = document.getElementById("weapon-modal");
  modalstyle.style.display = 'block';
};

// To handle if (type === 'accessory')
const openAccessoriesModal = (item) => {
  const modal = document.getElementById('acessoriesModal');
  modal.style.display = 'block';

  document.getElementById('replaceAccessories1').onclick = () => {
    addItemToInventory(equippedAccessories1);
    equippedAccessories1 = item;
    modal.style.display = 'none';
    finalizeEquip();
  };

  document.getElementById('replaceAccessories2').onclick = () => {
    addItemToInventory(equippedAccessories2);
    equippedAccessories2 = item;
    modal.style.display = 'none';
    finalizeEquip();
  };
};

const finalizeEquip = (item) => {
  inventory.splice(item, 1);
  renderIconInventoryCanvas();
  closeModalPage();
};

function handleCanvasClick(canvasId) {
  console.log(`Canvas with ID ${canvasId} clicked!`);
  console.log('Current Inventory:', inventory);
  console.log('Current itemInventoryMap:', itemInventoryMap);
}

// To handle if (type === 'equipment')
const openEquipmentModal = (item) => {
  const modal = `
  <div id="equipment-modal" class="modal-page">
    <a id="equipment-modal-text">Cannot equip "${item.name}" item.</a>
    <div>
      <button id="equipment-close-btn" class="consumable-modal-button">Close</button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);
  const closeBtn = document.getElementById("equipment-close-btn");
  closeBtn.addEventListener('click', () => {
    addItemToInventory(item);
    closeModalPage();
  });

  const modalstyle = document.getElementById("equipment-modal");
  modalstyle.style.display = 'block';
};

// To handle else if (type === 'consumable')
const applyConsumableEffect = (item) => {
  switch (item.name) {
    case 'book of knowledge':
      playerStats.int += item.int;
      intText.innerText = playerStats.int;
      break;

    case 'stamina book':
      playerStats.con += item.con;
      conText.innerText = playerStats.con;
      break;

    case 'strength book':
      playerStats.str += item.str;
      strText.innerText = playerStats.str;
      break;

    case 'health potion':
      hpPool += item.hp;
      hpPoolText.innerText = hpPool;
      break;

    case 'sanity potion':
      sanityPool += item.sanity;
      sanityPoolText.innerText = sanityPool;
      break;

    default:
      console.log("Unknown consumable item");
  }
};

const mainBody = document.getElementById("main-body");
const openConsumableModal = (item) => {
  const modal = `
  <div id="consumable-modal" class="modal-page">
    <a id="consumable-modal-text">Do you want to consume ${item.name}?</a>
    <div>
      <button id="consumable-modal-yes" class="consumable-modal-button">Yes</button>
      <button id="consumable-modal-no" class="consumable-modal-button">No</button>
      <button id="delete-btn" class="consumbale-modal-button">Delete Consumable<button>
    </div>
  </div>
  `;
  mainBody.insertAdjacentHTML('beforeend', modal);

  const yesBtn = document.getElementById("consumable-modal-yes");
  const noBtn = document.getElementById("consumable-modal-no");
  const deleteBtn = document.getElementById("delete-btn");
  yesBtn.addEventListener('click', () => {
    applyConsumableEffect(item);
    inventory.splice(item, 1);
    closeModalPage();
  });
  noBtn.addEventListener('click', () => {
    closeModalPage();
  });
  deleteBtn.addEventListener('click', () => {
    deleteItemFromInventory(item);
    inventory.splice(item, 1);
    closeModalPage();
  })
  const modalstyle = document.getElementById("consumable-modal");
  modalstyle.style.display = 'block';
};

// To delete item from inventory
const deleteItemFromInventory = (item) => {
  inventory.splice(item, 1);
  renderIconInventoryCanvas();
};

// To close Modal Page
const closeModalPage = () => {
  const modalWeapon = document.getElementById("weapon-modal");
  const modalEquipment = document.getElementById("equipment-modal");
  const modalConsumable = document.getElementById("consumable-modal");
  const allModals = [modalWeapon, modalEquipment, modalConsumable];
  allModals.forEach((modal) => {
    if (modal) {
      modal.remove(); // Removes the modal from the DOM if it exists
    }
  });
}

console.log("Final State:");
console.log("Equipped Weapon 1:", equippedWeapon1);
console.log("Equipped Weapon 2:", equippedWeapon2);

console.log('Equipped Weapon 1:', equippedWeapon1);
console.log('Equipped Weapon 2:', equippedWeapon2);
console.log('Equipped Armor:', equippedArmor);
console.log('Equipped Accessories1:', equippedAccessories1);
console.log('Equipped Accessories2:', equippedAccessories2);
console.log(inventory);
console.log(inventoryCanvases);
console.log(itemInventoryMap);

// This section is for drop item page
const exitDropBtn = document.getElementById("exit-drop-item-page");

exitDropBtn.addEventListener("click", () => {
  storeCloseBtn(); // Don't forget to change back the dropItemMsgInventory();
  
});
button1.addEventListener("click", (item) => {
  storeCloseBtn();
  dropItemMsgInventory(item);
});

const storeCloseBtn = () => {
  let x = document.getElementById("drop-item-page");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};

const randomDropItem = () => {
  const allItems = [...armorList, ...weaponList, ...items];
  const randomIndex = Math.floor(Math.random() * allItems.length);
  const randomItems = allItems[randomIndex];
  return randomItems;
}

const itemDropPage = document.getElementById("drop-item-text");
const dropItemMsgInventory = (item) => {
  item = randomDropItem();
  let message = `You obtained "${item.name}" from the enemy`;
  itemDropPage.innerText = message;
  addItemToInventory(item);
  addItemToInventory(weaponList[1])
  
};

// This section is for the text story
// Create the story and button after customize button initialised
const storyTextOption = () => {
  let x = document.getElementById("text-option-container");
  x.style.display = x.style.display === "block" ? "none" : "block";
};

const textElementStory = document.getElementById("text-story");
const optionButtonStory = document.getElementById("text-option-button");
function startGame () { // For testing only
  playerState = {};
  showTextNode(1);
};

let playerState = {};

const showTextNode = (textNodeIndex) => {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElementStory.innerText = textNode.text;
  // To clear old option button
  while (optionButtonStory.firstChild) {
    optionButtonStory.removeChild(optionButtonStory.firstChild)
  }

  textNode.pathOptions.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('story-button');
      button.addEventListener('click', () => selectOption(option));
      optionButtonStory.appendChild(button);
    }
  })
};

const showOption = (option) => {
  return option.requiredState == null || option.requiredState(playerState)
};

const selectOption = (option) => {
  const nextTextNodeId = option.nextText;
  if (option.action) {option.action()};

  if (nextTextNodeId <= 0) {return startGame()};
  playerState = Object.assign(playerState, option.setState);

  if (option.delayNext) {
    // Save nextText in a global variable so that it will be executed later
    // when battleResult changes.
    holdNextText = option.nextText;
  } else {
    // For normal options, execute nextText immediately.
    showTextNode(option.nextText);
  }
};

// This global variable will hold the pending nextText value (if any)
let holdNextText = null;
console.log(holdNextText);

export const onBattleResultChange = () => {
  console.log("battleResult changed:", battleResult);
  if (holdNextText !== null) {
    showTextNode(holdNextText);
    // To clear the pending nextText.
    holdNextText = null;
  }
};

const storyText = document.getElementById("main-text");

const textNodes = [
  {
    id: 1,
    text: 'You and your sibling have taken on a commission to escort a merchant caravan from the town of Caen to the city of Herat. However, for the past few weeks, this once-busy road has grown eerily quiet. Concerned, you ask the merchant about the situation. He explains that travelers have been attacked by monsters along this route—a recent phenomenon that has made the road dangerous and rarely used. \n\nAs you attempt to gather more details, your group suddenly spots several abandoned stagecoaches up ahead. Sensing trouble, you and your sibling, along with a few other hired guards, remain vigilant. The group decides to halt, and you are sent ahead to investigate. Cautiously, you approach the abandoned stagecoaches, tightening your grip on your weapon. Just as you near one, an eerie, guttural outcry erupts from a dense copse beside the road.\n\nA horde of abominable creatures emerges from the shadows and charges toward your group. A battle breaks out. You attempt to regroup, but in a moment of distraction, a skeletal figure ambushes you from within one of the stagecoaches. You manage to block its sudden strike, but now you have no choice—you must fight before you can rejoin with the others.',
    pathOptions: [
      {
        text: 'Fight',
        nextText: 2,
        action: () => {
          chooseCurrentMonster(enemies[4]), 
          testBattleButton(() => {

          })
        },
        delayNext: true,
      }
    ]
  },
  {
    id: 2,
    text: ` After barely escaping the ambush, you regroup with the survivors—only to realize that one of your siblings is missing. As you scan the area, you feel a pat on your shoulder. Turning, you find the merchant standing nearby. His clothes are caked with dirt, and fresh drops of blood stain a small patch on his chest, though no wound marks his skin.
    Once his breathing steadies, he leans in and speaks while still panting, “Your sibling… they’ve kidnapped your sibling. We barely escaped.” His words echo in your mind as you tighten your grip on your sword and grit your teeth. 
    Without hesitation, you secure your weapon and begin to retrace your steps back to the ambush site. But before you can leave, a shout stops you in your tracks: “They’re still alive!” You spin around to see a man with long, dark brown hair cascading just past his shoulders, his rugged beard and stern gaze challenging you. 
    “You can go alone and try to rescue your sibling,” he declares, “but I doubt you’ll succeed. Or would you rather join us? My men… along with your sibling, have also been kidnapped—alive. There’s something chilling about the way they carry out this operation. In a few days, my group and I will depart to rescue them. The choice is yours: will I see you again when that day comes?” 
    With the weight of his words pressing upon you, you pause to consider the decision that could change everything.`,
    pathOptions: [
      {
        text: 'Go back to the ambush site',
        nextText: 20,
      },
      {
        text: 'Wait and prepare for a few days',
        nextText: 3,
      }
    ]
  },
  {
    id: 3,
    text: `Deciding to retreating to the city, you prepare for what comes next. Just as you are about to search for a place to rest for the night, a voice suddenly calls out to you: "Mr.${selectGivenName.value}, I apologize for what happened earlier—and I realize I have yet to introduce myself. My name is Thráin, the head guardsman of the city of Herat. I understand your concern for your sibling, for many of our friends have been kidnapped by that wretched monster. However, acting recklessly will endanger not only you but also your sibling. 
    While we make preparations, why not venture into the dungeon just outside the north gate of the city to gain some experience? There, you will face only low-level creatures, ensuring your safety. It is far better than waiting idly, wouldn’t you agree? The choice is yours." 
    With that, Thráin turns and strides off toward the nearby blacksmith, leaving you alone with your thoughts. You now wonder: should you brave the dungeon in the hopes of gaining valuable experience, or wait until tomorrow to mount a rescue for your sibling?`,// Display the text inside the div with id "story",
    pathOptions: [
      {
        text: 'Go to the dungeon at the north gate to gain experience',
        nextText: 22,
        action: () => {testBattleButton()},
        delayNext: true,
      },
      {
        text: 'Wait and prepare for a few days',
        nextText: 4,
      }
    ],
  },
  {
    id: 4,
    text: `At long last, the day has arrived. You make your way to the gathering point for a briefing with Thráin and the others before setting off. As you observe the guardsmen under Thráin's command, you note that they are clad in gleaming steel armor and armed with imposing swords and axes. Their helmets, adorned with high, pointed crests and fitted with faceplates, mask their features—but you can sense the steely determination in their eyes. They may not be flashy, but their resolve is unmistakable.
    Just as you and the others prepare to depart, Thráin calls you over. He strides toward you, carrying an object concealed beneath a cloth. "Here, take this," he says. "It’s not fancy, but it's certainly better than the leather plate you're wearing. Our enemies are formidable, and we must not underestimate them."
    Accepting the mysterious package, you quickly inspect its contents and discover it is a suit of half-plate armor. You thank Thráin, and without hesitation, join the others as you head out to face the challenges ahead.`,
    pathOptions: [
      {
        text: 'Continue',
        nextText: 5,
        action: () => {addItemToInventory(items[9])},
      }
    ],
  },
  {
    id: 5,
    text: `Upon arriving at the suspected location, Thráin ordered everyone to halt and prepare. The large group was quickly divided into smaller teams for better coordination. 
    Just as you were about to join your assigned team, Thráin called out to you. He asked if you would like to join the scout group tasked with infiltrating ahead of the others. Only a few had volunteered for this perilous assignment, yet it was crucial to gather vital intelligence before launching an assault on the enemy hideout. The scout team would even receive additional rewards. \n\n However, you only have eyes for your sibling—a fact Thráin fully understands. 
    The decision is yours.`,
    pathOptions: [
      {
        text: 'Scout ahead of the other',
        nextText: 6,
      },
      {
        text: 'Refuse politely',
        nextText: 15,
      },
    ],
  },
  {
    id: 6,
    text: `You take the lead and scout ahead of the group. After a while of silent trekking, you catch sight of a cave nestled into the side of a towering cliff. The gentle murmur of flowing water emanates from its depths, promising both refuge and mystery. However, the entrance is heavily guarded by a dozen hulking monsters, their patrols circling methodically but keeping just enough distance to make your passage perilous.
    Determined to find another way in, you search the surrounding area for an alternate entry point—a narrow crack, a hidden crevice—but your efforts prove fruitless. Just when you begin to consider your next move, you notice a solitary monster positioned away from the main group. It stands vigilant near what appears to be a small, concealed alcove, as if guarding a secret treasure or an overlooked passage.
    Seizing the opportunity, you decide to test your luck on this lone guardian, weighing the risk of a swift confrontation against the promise of uncovering a less defended way into the cave.`,
    pathOptions: [
      {
        text: 'Fight',
        nextText: 7,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ]
  },
  {
    id: 7,
    text: `
    After dispatching the guard, you carefully inspect the alcove and uncover a secret entrance: a narrow tunnel concealed behind what appears to be a fake boulder. The passage is cramped—only as tall as an adult’s waist yet just wide enough for two people to crawl side by side. Undeterred by the confinement, you steel your resolve and venture inside.
    After crawling for what feels like an eternity, you begin to notice thin rays of light filtering through gaps ahead. Eventually, the tunnel yields to its end, where a vent register separates you from the room beyond. Peering through the narrow opening, you glimpse a dimly lit chamber filled with rows of wooden crates, sacks, and barrels. Despite the apparent disarray, an eerie silence hangs in the air, as if the room itself is holding its breath.
    Ensuring that the area is clear, you push open the vent register—luckily, it isn’t locked—and slip into the chamber. Your eyes quickly scan the surroundings, and two items capture your attention. First, a massive sword rests against one of the crates; its broad, double-edged blade features a strong, wide center that tapers elegantly toward its tip, suggesting both beauty and lethal precision. Beside the weapon lies a golden ring, its surface inscribed with a curious verse:

    "One ring to rule them all, one ring to find them,
    One ring to bring them all, and in the darkness bind them;
    In the Last Chamber where the shadows lie."

    The inscription, a nod to a legendary tale, hints at a power beyond the ordinary. Convinced that both the formidable sword and the enigmatic ring could prove invaluable, you claim them and continue your survey of the area.
    It soon becomes apparent that the enemy’s hideout is a labyrinthine network of tunnels, with multiple branching paths leading to various chambers—a layout that strangely dispels any sense of claustrophobia despite the tunnel's tight confines. Meticulously, you map out enemy positions and passageways as best you can.
    With your newfound treasures and intelligence in hand, you decide it’s time to retreat. However, your plans are abruptly interrupted when an enemy manages to locate you. In a swift, decisive motion, you silence the intruder before it can sound an alarm to alert its comrades. Now, with the echoes of battle still lingering in the shadows, you must confront the adversary standing before you, knowing that every choice carries the weight of destiny.`,
    pathOptions: [
      {
        text: `Fight the enemy.`,
        nextText: 8,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ],
  },
  {
    id: 8,
    text: `After defeating your foe, you act quickly. You drag the body behind a stack of crates, concealing it from prying eyes. With no time to waste, you slip out of the enemy's hideout, your heart pounding as you hurry to rendezvous with Thráin and the rest of your group to share your discoveries.
    Upon arriving at the designated gathering point, you find the troops already geared up and ready to launch an assault on the enemy. However, you raise your hand to stop them, determined to explain an alternate route into the cave—a passage you had uncovered earlier. Gathering around, Thráin studies the map you hastily sketched and listens intently to your account. His eyes narrow with renewed focus as he swiftly revises his previous strategy based on the new information.
    “Take several of my men with you through that passage,” Thráin instructs, his voice low yet resolute. “Create some havoc—draw their attention—but do not commit fully. The rest of us will storm the main entrance once the enemy is distracted. We must do this to save our people.” His words resonate with urgency and hope.
    With a nod, you gather a select group of soldiers. Together, you make your way back to the small tunnel you discovered earlier, knowing that this hidden passage could be the key to turning the tide of the battle. The fate of your people—and your sibling—rests on the success of this daring maneuver.`,
    pathOptions: [
      {
        text: 'Continue',
        nextText: 9,
      }
    ],
  },
  {
    id: 9,
    text: `After navigating the narrow tunnel, you emerge into the room where you previously discovered your formidable weapon. The atmosphere is tense, yet you know that every second counts. 
    Without hesitation, you command your men to sow chaos among the enemy ranks—order them to create distractions and wreak havoc so that their attention is diverted. With a firm nod and a determined glance, you bid them good luck, trusting in their abilities to unsettle the foes.
    Turning to your trusted comrades, you charge forward into the fray. Together, you engage the enemy in close combat, cutting a path through those who stand in your way. Each swing of your weapon is driven by the urgency to free the captives and, most importantly, to locate your missing sibling. 
    Amidst the clamor of battle, your eyes dart around, scanning for any hint of where the enemy might be holding your sibling and the rest of the hostages. The cacophony of combat and the flickering shadows create an atmosphere of both chaos and determination, as you and your team press on, awaiting reinforcements while striving to secure a safe passage for the captives.`,
    pathOptions: [
      {
        text: 'Fight the enemies',
        nextText: 10,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ]
  },
  {
    id: 10,
    text: `After drawing the enemy's attention long enough, Thráin and his reinforcements arrive. With both forces united, you and your allies push the adversaries back. Many foes fall in battle, each defeat hard-won by fierce struggle. Yet, just as victory seems within grasp, enemy reinforcements begin to arrive. You hear the rhythmic clash of weapons and the crackle of shattered arms growing louder, each sound accompanied by sparks flying from broken blades.
    Then, emerging from the melee stands a monstrous figure—a towering creature draped in black fur. Its massive form exudes menace, and its face is obscured behind a blood-red mask, lending it an even more sinister air.
    "Come to me," the creature challenges, its voice echoing ominously as it beckons you to face your destiny.`,
    pathOptions: [
      {
        text: 'Fight',
        nextText: 11,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ],
  },
  {
    id: 11,
    text: `With the foe before you finally collapsing to the ground, its remaining allies begin a slow, disorganized retreat. In the aftermath of the fierce battle, Thráin approaches, his expression one of sincere gratitude, and thanks you for the vital assistance you provided.
    Although most of the enemy forces have been neutralized, a small team from your group is assembled to meticulously search the enemy hideout, ensuring that no adversary has been left behind. Even as the dust settles, Thráin once again turns to you, seeking your expertise and courage for the next crucial phase of the operation.`,
    pathOptions: [
      {
        text: 'Lets search together',
        nextText: 12,
      },
      {
        text: 'Sorry, but I need to search for my sibling',
        nextText: 21,
      }
    ]
  },
  {
    id: 12,
    text: `With Thráin and your companion by your side, you methodically search chamber after chamber, encountering both hostile foes and rescued hostages along the way. At last, you stand before a massive, tightly sealed door adorned with intricate ornaments and inscriptions written in an unknown language. At the center of the design, a small, engraved circle catches your eye. Driven by curiosity, you remove the mysterious ring you previously discovered and place it within the circle.
    In an instant, the door swings open, and a burst of brilliant light floods the corridor, momentarily blinding you and your comrades. Yet Thráin appears to have anticipated the trap, as you soon hear the crackle of energy and the resounding clash of a sword imbued with magical power echoing from within.
    Regaining your senses, you behold an enchanting figure emerging from the radiance—arguably the most beautiful woman you have ever seen. However, beneath her mesmerizing beauty lurks an aura of bloodlust and dread. From behind her, nine ethereal tails materialize, each trailing a mesmerizing blue glow that dances in the light. Thráin staggers on his last legs, and your companion still struggles to recover from the earlier skirmish.
    Without a moment's hesitation, you leap forward, your weapon arcing through the air to intercept the lethal assault aimed at Thráin. The captivating woman fixes her gaze on you, her lips parting as she speaks in a seductive yet menacing tone, "Would you like to be my food, human?"`,
    pathOptions: [
      {
        text: 'Fight',
        nextText: 13,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ],
  },
  {
    id: 13,
    text: `With a swift, precise strike, you subdue the mysterious woman. In that moment, her form begins to glow with an ethereal blue light. The radiant energy swells gently before dissipating into a fine scattering of ash that drifts silently to the ground.
    With the immediate threat now neutralized, you quickly turn your attention to assisting your injured companion. While the danger appears to be waning, you and your allies remain ever watchful, mindful that peril could still hide within the maze-like corridors of the hideout.
    After carefully inspecting countless chambers, you finally locate your sibling. The sight of them—huddled in fear yet relieved by your presence—kindles a deep sense of comfort. As you embrace, the trembling gradually subsides, replaced by the reassuring warmth of family.
    Now, with your sibling safely in tow and the rescued hostages gathered, your group prepares to return to the city. There, care and healing await, and the shadow of the monstrous threat is finally lifted—a hard-won victory that kindles hope for a brighter, safer future.
    `,
    pathOptions: [
      {
        text: 'Continue',
        nextText: 14,
      }
    ],
  },
  {
    id: 15,
    text: `You declined, knowing full well how dangerous and burdensome the mission was—a sentiment that Thráin shared wholeheartedly. After several hours, the scout team regrouped, marking key points of interest: the enemy’s positions and the location of the hidden entrance. Once the briefing concluded, you and your comrades steeled yourselves for a direct assault.
    The attack began with a torrential barrage of arrows raining down upon the enemy as you all charged toward the entrance—a natural cave opening carved into the side of a cliff.`,
    pathOptions: [
      {
        text: 'Fight',
        nextText: 16,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ],
  },
  {
    id: 16,
    text: `As your foe’s body falls before you, a fiendish voice echoes from another creature, “Your body shall lie upon this ground!”`,
    pathOptions: [
      {
        text: 'Fight',
        nextText: 17,
        action: () => {testBattleButton()},
        delayNext: true,
      }
    ]
  },
  {
    id: 17,
    text: `With the enemy subdued, you swiftly dispatch another foe when suddenly, a foul scream echoes through the chamber, halting both friend and foe in their tracks. Rushing toward the source of that unholy cry, you find Thráin lying helpless on the ground. Everyone stands frozen, transfixed by the harrowing scene.
    Fury ignites within you. You charge forward, aiming for the monster's vital spot—but you miss your opportunity. As you engage, the battle stirs anew.
    "You will regret the decision you made, human," growls the menacing enemy before you.`,
    pathOptions: [
      {
        text: 'Fight',
        action: () => {testBattleButton()},
        nextText: 18,
        delayNext: true,
      }
    ]
  },
  {
    id: 18,
    text: `You vanquish a formidable foe, then quickly rush to Thráin's side to check on him. Despite your efforts, the monster’s devastating assault has taken its toll—Thráin can no longer stand and lies motionless on the ground. With a wry, sorrowful smile, he manages to say, "Lead my men… to save the hostages. Take this… goodbye," before exhaling his final breath.
    Without a moment’s hesitation, you rise and resume the fight, dispatching enemy after enemy. Eventually, you come face-to-face with a monstrous figure—a towering creature draped in black fur. Its immense presence exudes menace, and a blood-red mask shrouds its face, intensifying its sinister allure.
    "Come to me," the creature challenges, its voice echoing ominously as it beckons you to confront your destiny.`,
    pathOptions: [
      {
        text: 'Fight',
        action: () => {chooseCurrentMonster(enemies[6]), testBattleButton()},
        nextText: 19,
        delayNext: true,
      }
    ]
  },
  {
    id: 19,
    text: `With the foe before you finally collapsing to the ground, its remaining allies begin a slow, disorganized retreat. You asked a premission to the other for looking for you sibling and also rescuing hostages along the way if you met them. Thráin men thanked you and some helps you to find your sibling.
    After a while, you finally locate your sibling. The sight of them—huddled in fear yet relieved by your presence—kindles a deep sense of comfort. As you embrace, the trembling gradually subsides, replaced by the reassuring warmth of family.
    Now, with your sibling safely in tow and the rescued hostages gathered, your group prepares to return to the city. There, care and healing await, and the shadow of the monstrous threat is finally lifted—a hard-won victory that kindles hope for a brighter, safer future.`,
    pathOptions: [
      {
        text: 'Continue',
        nextText: 14,
      }
    ]
  },
  {
    id: 20,
    text: `As you head back as quickly as you can, you're ambushed by the monster.
    "Where do you think you are going?"
    `,
    pathOptions:
    [
      {
        text: 'And you, are you gonna bark all day, li’l doggie, or are you gonna bite?',
        action: () => {chooseCurrentMonster(enemies[5]), testBattleButton()},
        nextText: 21,
        delayNext: true,
      }
    ]
  },
  {
    id: 21,
    text: `You barely escape the ambush, your heart pounding as you realize that the monsters, ever watchful after their attack on the caravan, are on high alert. Recognizing the increased danger, you resolve to return to the city to formulate a new plan to rescue your sibling. But first, you must tend to your wounds before venturing back into peril.`,
    pathOptions: [
      {
        text: 'continue',
        nextText: 3,
      }
    ]
  },
  {
    id: 22,
    text: 'You defeated a monster and gainned experience. Do you want to stay?',
    pathOptions: [
      {
        text: 'Yes',
        action: () => {testBattleButton()},
        nextText: 22,
      },
      {
        text: 'No, this is enough',
        nextText: 4,
      }
    ]
  },
  {
    id: 14,
    text: `
    Congratulation, You finished the game!
    
    Would you like to restart the game?`,
    pathOptions: [
      {
        text: 'Restart the Game',
        nextText: -1,
        action: () => {restartGame()},
      }
    ]
  }
];

const restartGame = () => {
  // there still bug where the inventory did not resetting after restart and create charater still nnot correct
  playerStats = {
    str : 0,
    dex : 0,
    int : 0,
    cha : 0,
    wis : 0,
    con : 0,
  };
  inventory = [];
  equippedWeapon1 = null;
  equippedWeapon2 = null;
  equippedArmor = null;
  equippedAccessories1 = null;
  equippedAccessories2 = null;
  hpPool = 0;
  sanityPool = 0;
  inventoryCanvases = [];
  itemInventoryMap = [];
  itemInventoryMap[`slot-${counterCon}`] = null
  selectGivenName.value = "";
  selectSurname.value = ""
  toggleToShow();
};

// there is an error where one handed weapon when go into modal menu and press 'cancel' the weapon dissappeared

// startGame(); test bed
// storyTextOption(); test bed

/* add required */

// Create bar experience that increase each time player finish a mission or beats enemy
// Make 2 path

/* add something like:
  {
        text: "Take the Victory Path",
        nextText: 4,
        // Only show if the battle was won
        requiredState: (currentState) => {
          return currentState.results && currentState.results.includes("won");
        }
  } to decide which path player take
*/