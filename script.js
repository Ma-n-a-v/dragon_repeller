//Declaring Variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//Declaring constants
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStat = document.querySelector("#monsterStat");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//A weapon list with name and power.

/*The power of the weapon will impact monster's health as:
    Monster's health = power + Math.floor(Math.random()*xp)+1
*/
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

//A list of monsters with their names, level and health.

/*The level has been used as: IF hit then our health = (level * 5) - (Math.floor(Math.random() * xp));
    Means that our health is being affected by the level of monsters that we are fighting.
*/

/*
    The health of the monster is being calculated using:
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    Means the power of the weapon with a random number multiplying the XP +1 will be deducted from monster's health.
*/

const monsters = [
    {
        name: "drakonis",
        level: 2,
        health: 15
    },
    {
        name: "soul reaper",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
]

//A list of locations.
/*
    This list has been made so that we do not have to explicitely change the button names, button functionality and text of the text area.
    we will have three options at first: Store, cave, fight dragons
    Store ---> Buy 10 health, Buy weapon, Go to town square
    cave --->           Fight Drakonis, fight Soul reaper, go to town square
                                ||          ||
                                V           V
    fight dragons --->  Attack, Dodge, Run (Go to Town Square)

    If we lose/ win and Killed a monster, we have their names and the functionality in locations list.
    Killed Monster ---> Go to Town Square, Go to Town square and the (last button has easter egg to boose the gold coin) town square.
    lose/win ---> Restart the game
*/
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button function": [goStore, goCave, fightDragon],
        text: "Welcome to Monster's Lair! Your mission is to defeat the dangerous creature that threatens peace across these lands. You're at the entrance of a dark cave. Where will you go first? Use the controls above to start your journey."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 Gold)", "Buy weapon (30 Gold)", "Go to town square"],
        "button function": [buyHealth, buyWeapon, goTown],
        text: "You entered a store."
    },
    {
        name: "cave",
        "button text": ["Fight Drakonis", "Fight Soul Reaper", "Go to town square"],
        "button function": [fightDrakonis, fightSoulReaper, goTown],
        text: "You step into the shadowy cave, and your eyes widen as fearsome monsters emerge from the darkness."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button function": [attack, dodge, goTown],
        text: "You are battling a monster!"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button function": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gained experience points and fine gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button function": [restart, restart, restart],
        text: "You die 💀 !"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button function": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 👑"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to Town square"],
        "button function": [pickTwo, pickEight, goTown],
        text: "You've discovered a secret game 🐣 🐣 🐣! Ten numbers will be randomly chosen between 1 and 10. If your number matches one of these, you win!"
    }
];

                                                    //Initializing buttons
/**
 * Initially the buttons have options as follow: go to Store, go to cave and fight a dragon
 */
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

                                                    //Creating functions 

/**
 * 
 * @param {An Object list from Locations list} location 
 * This is a generic update function that updates the button names, button functionality and text area according to locations list.
 */
function update(location){
    //Setting the style display to None
    monsterStat.style.display = "none";
    //Setting the button texts as per locations
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    //setting the buttons as per locations
    button1.onclick = location["button function"][0];
    button2.onclick = location["button function"][1];
    button3.onclick = location["button function"][2];

    //Setting the text area as per locations
    text.innerText = location.text;
}

/**
 * This function will take the player to the town square every time it is clicked.
 * The town square is the deafult state of the game.
 */
function goTown(){
    update(locations[0]);
}

/*
*   This function will take the player to the store.
*   In store the player has options to: buy 10 health points, Buy a new weapon and go to town square.
*/
function goStore(){
   update(locations[1]);
}

/**
 * This function will take the player to the cave to find some monsters to gain XP and fine gold coins.
 * The cave has two big monsters: Drakonis and Soul Reaper and the third option is to take back to Town square.
 */

function goCave(){
    update(locations[2]);
}

/**
 * This is a sub function of goStore function, here a player can buy health in exchange of gold coins.
 */

function buyHealth(){
    if(gold>=10){   
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }else{
        //Error text if the player ran out of gold coins.
        text.innerText = "Apologies, adventurer, but you lack sufficient gold to purchase health.";
    }
}

/**
 * This is a sub function of goStore function, here player can buy weapons with 30 gold coins.
 * The weapons will be added in the inventory list after purchased.
 * By default the player has a stick as a weapon.
 */
function buyWeapon(){
    if(currentWeapon < weapons.length - 1){    
        if(gold>=30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "Congratulations, warrior! A "+ newWeapon +" is now in your possession.";
            text.innerText += "In your inventory you have: "+ inventory;
        }else{
            //Error text if the player ran out of gold coins.
            text.innerText = "Apologies, adventurer, but you lack sufficient gold to purchase weapon.";
        }
    }else{
        //Case when the player has unlocked all available weapons from the weapons list.
        text.innerText = "You already have the most powerful weapon!";
        //Case to sell weapons from inventory for 15 gold coins.
        button2.innerText = "Sell weapon for 15 golds";
        button2.onclick = sellWeapon;
    }
}

/**
 * Handling the case to sell weapons from inventory.
 */
function sellWeapon(){
    //If the player has more than one weapon then and then the player can sell other weapon(s).
    if(inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a "+ currentWeapon +".";
    }else{
        //Case asking to keep the only default weapon
        text.innerText = "Don't sell your only weapon!";
    }
}

                                                    //Code for Fighting the monsters
/**
 * Fighting one of the cave monsters.
 */
function fightDrakonis(){
    fighting = 0;       //The fighting number corresponds to the index of the list of monsters.
    goFight();
}

/**
 * Fighting one of the cave monsters.
 */
function fightSoulReaper(){
    fighting = 1;
    goFight();
}

/**
 * Fighting the ultimate monster, a dragon.
 */
function fightDragon(){
    fighting = 2;
    goFight();
}

/**
 * A generic function for fighting.
 * It will take the index 3 of locations list which includes, attack, dodge and run.
 * The monster stats will be displayed as block and be updates as we fight.
 */
function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStat.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

/**
 * A generic attack function, for each hit, the monster's health as well as player's health will be deducted.
 */
function attack(){
    text.innerText = "The "+monsters[fighting].name +" attacks!";
    text.innerText += "You unleash your " + weapons[currentWeapon].name +" upon it with swift and precise strikes. ";
    //A case if yes then we will hit the monster otherwise we will miss it.
    if(isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }else{
        text.innerText += " You miss! "
    }
    //Calculating the impact of monster's health.
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp)+1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    //Case if our health is <=0 we lose the game.
    if(health<=0){
        lose();
    }else if(monsterHealth<=0){
        //Case if we kill the dragon, we win the game
        if(fighting === 2){
            winGame();
            //Case if we kill any other monsters, we defeated the monster
        }else{
            defeatMonster();
        }
    }

    //Case if our weapon breaks, 10% chance of happening it
    if(Math.random() <= 0.1 && inventory.length !==1){
        text.innerText += " Opps! Your "+ inventory.pop() +" breaks. ";
        currentWeapon--;
    }
}   

/**
 * 
 * @param {level of monster} level 
 * @returns hit value.
 * The hit value is determined by the level of monster and xp of player.
 */
function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

/**
 * 
 * @returns true/false
 * This function will determine if we miss the hit or not.
 * We miss the hit by 20% and if our health is <20 we will never miss a hit.
 */
function isMonsterHit(){
    //If players health is < 20 then there's always gonna be a hit.
    return Math.random() > 0.2 || health < 20 ;
}

/**
 * A player dodged the monster, nothing's gonna happen here
 */
function dodge(){
    text.innerText = "You skillfully dodged the "+ monsters[fighting].name+" attack!";
}

/**
 * 
 */
function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function easterEgg(){
    update(locations[7]);
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}

function pick(guess){
    let numbers = [];
    while(numbers.length < 10){
        numbers.push(Math.floor(Math.random()*11));
    }

    text.innerText = "You picked "+ guess +". Here are the random numbers:\n ";

    for(let i=0; i<numbers.length; i++){
         text.innerText += numbers[i]+ "\n";
    }

    if(numbers.indexOf(guess)!==-1){
        text.innerText += " You guessed correctly! Congratulations you've won 20 gold coins!";
        gold += 20;
        goldText.innerText = gold;
    }
    else{
        text.innerText += " Wrong guess! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if(health<=0){
            lose();
        }
    }
}