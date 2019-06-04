let score = 0;
let fighterSelected = false;


let fighterList = ['Han', 'Leia', 'Chewbacca', 'Vader', 'Luke', 'Emperor'];

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

    fighterList.forEach(element => {
        let characterBtn = $('<img>');
        characterBtn.addClass('character character-btn ' + allFighters[element].name);
        characterBtn.attr('name', allFighters[element].name);
        characterBtn.attr('alt', allFighters[element].name);
        characterBtn.attr('src', allFighters[element].picture);
        $characters.append(characterBtn);
    })
    
    $characters.show('fast');
    $characters.removeClass('hidden');
}

//takes stats from selected fighter and displays it on screen
function displayStats (fighter) {
    $health.text('Health: ' + fighter.health); 
    $attackPower.text('Attack Power: ' + fighter.attack);

}

//click handlers
$play.on('click', initGame);
$characters.on('click', '.character-btn', function() {
    if (!fighterSelected){
        $attacker.append(this);
        fighterSelected = true;
        $characterSelect.html('Select your challenger!');
        displayStats(allFighters[this.name]);
    } else {
        $defender.append(this);
        $characters.hide('fast');
        $attackButton.show('fast');
    }    
});
