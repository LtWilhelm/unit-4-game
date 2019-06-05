let score = 0;
let wins = 0;
let losses = 0;
let fighterSelected = false;


let fighterList = ['Han', 'Leia', 'Chewbacca', 'Vader', 'Luke', 'Emperor'];

let attacker = {};
let defender = {};

//jQuery selectors
const $attacker = $('#attacker');
const $defender = $('#defender');
const $health = $('#health');
const $attackPower = $('#attack-power');
const $wins = $('#wins');
const $losses = $('#losses');
const $play = $('#play');
const $characters = $('#characters');
const $characterSelect = $('#character-select');
const $attackButton = $('#attack-btn');
const $defenderStats = $('#defender-stats');


//constructor for fighters
function fighter (name, picture, attack, counter, health) {
    this.name = name;
    this.picture = picture;
    this.baseAttack = attack;
    this.attack = attack;
    this.counter = counter;
    this.health = health;
}

let allFighters = {};

//randomly generates fighters stats and sets name and picture
function initGame () {
    allFighters = {};
    attacker = {};
    defender = {};
    score = 0;
    fighterSelected = false;
    fighterList.forEach(element => {
        allFighters[element] = new fighter(
            element,
            "./assets/images/" + element + ".png",
            Math.ceil(Math.random() * 6) + 2,
            Math.ceil(Math.random() * 5) + 1,
            Math.ceil(Math.random() * 30) + 20
        )
    });
    $play.hide("fast");
    $characters.removeClass('hidden');

    fighterList.forEach(element => {
        let characterBtn = $('<img>');
        characterBtn.addClass('character character-btn ' + allFighters[element].name);
        characterBtn.attr('name', allFighters[element].name);
        characterBtn.attr('alt', allFighters[element].name);
        characterBtn.attr('src', allFighters[element].picture);
        $characters.append(characterBtn);
    })
    
    $characters.show('fast');
    $characterSelect.html('Select your Champion!');
    $attacker.empty();
    $defender.empty();
    $defenderStats.empty();
}

//takes stats from selected fighter and displays it on screen
function displayStats (fighter) {
    $health.text('Health: ' + fighter.health); 
    $attackPower.text('Attack Power: ' + fighter.attack);
    $defenderStats.html(
        '<p>Attack: ' + defender.counter + '</p><p>Health: ' + defender.health + '</p>'
    )
}

function winLose () {
    if (score === fighterList.length - 1) {
        wins++;
        $characterSelect.html('You have won! <br><button id="play-again">Play again?</button>');
        $characters.show('fast');    
    } else if (attacker.health <= 0) {
        losses++;
        $characterSelect.html('You have lost! <br><button id="play-again">Play again?</button>');
        $characters.show('fast');    
    }
    $wins.text('Wins: ' + wins);
    $losses.text('Losses: ' + losses);
}

function attack () {
    defender.health -= attacker.attack;
    attacker.attack += attacker.baseAttack;
    $attackButton.hide('fast');
    displayStats(attacker);
}
function counterAttack () {
    attacker.health -= defender.counter;
    $attackButton.show('fast');
    displayStats(attacker);
    winLose();
}

function pickNewDefender () {
    $characterSelect.html('Fight won! Select your next opponent');
    $characters.show('fast');
}

//click handlers
$play.on('click', initGame);
$characters.on('click', '.character-btn', function() {
    if (!fighterSelected){
        attacker = allFighters[this.name];
        $attacker.prepend(this);
        fighterSelected = true;
        $characterSelect.html('Select your challenger!');
        displayStats(attacker);
    } else {
        defender = allFighters[this.name];
        $defender.empty();
        $defender.prepend(this);
        $characters.hide('fast');
        $attackButton.show('fast');
    }
    displayStats(attacker);

});
$attackButton.on('click', function () {
    attack();
    if (defender.health > 0) {
        setTimeout(counterAttack, 1000);
    } else {
        pickNewDefender();
        score++;
    }
    winLose();
});
$characters.on('click', '#play-again', initGame)