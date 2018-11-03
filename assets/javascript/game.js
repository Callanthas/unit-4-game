var characterList = [	{
	HP: 100,
	Attack: 8,
	Image: "<img class='img' src='images/harry.jpg' alt='Harry Potter'>",
	Name: "Harry Potter"
	},

	{
	HP: 150,
	Attack: 14,
	Image: "<img class='img' src='images/dumbledore.jpg' alt='Albus Dumbledore'>",
	Name: "Albus Dumbledore"
	},

	{
	HP: 180,
	Attack: 12,
	Image: "<img class='img' src='voldemort.png' alt='Lord Voldemort'>",
	Name: "Lord Voldemort"
	},	

	{
	HP: 120,
	Attack: 10,
	Image: "<img class='img' src='images/snape.jpg' alt='Severus Snape'>",
	Name: "Severus Snape"
	},
];

var winCounter = 0;
var lossCounter = 0;
var clicks = 0;
var locked = false;
var beginLock = false;
var attackLock = true;

$('#winCounter').html("<h2>Wins: " + winCounter + "</h2>");
$('#lossCounter').html("<h3>Losses: " + lossCounter + "</h3>");

function startGame() {
	clicks = 0;
	locked = false;
	beginLock = false;
	attackLock = true;
	$('#the_chosen_one').empty();
	$('#enemies').empty();
	$('#defender').empty();

for (var i = 0; i < characterList.length; i++){
	var initial = $("<div class='character'>");
	initial.append("<h4>" + characterList[i].Name + "</h4>");
	initial.append(characterList[i].Image);
	initial.attr("data-hp", characterList[i].HP);
	initial.attr("data-attack", characterList[i].Attack);
	var hp = initial.data("hp");
	var attack = initial.data("attack");
	initial.append("<p class='title'>HP: <span>" + hp + "</span></p>");
	initial.append("<p class='title'>Attack: <span>" + attack + "</span></p>")
	$("#char-init").append(initial);
}
};

startGame();

$("#char-init").on("click", ".character", function() { 

	var curChosen = $('#the_chosen_one').children();
	console.log(curChosen);
	$("#char-init").append(curChosen);

	var characterPicked = $(this);
	$("#the_chosen_one").append(characterPicked);
	});
$("#start").on("click", function() { 

if(!beginLock){
	var enemies = $('#char-init').children();
	var addId = $('#the_chosen_one').children();
	addId.attr("id", "attacker");
	var addSecId = $('#attacker').find("span:first");
	addSecId.attr("id", "aHChange");
	var addThirdId = $('#attacker').find("span:last");
	addThirdId.attr("id", "aPChange");
	$('#enemies').append(enemies);
	console.log(enemies);
	beginLock = true;
}
});

$("#enemies").on("click", ".character", function(){
if(!locked){
	var defenderClicked = $('#defender').children();
	$('#enemies').append(defenderClicked);

	var defenderPicked = $(this);
	$('#defender').append(defenderPicked);
}
});

$("#defender-chosen").on("click", function(){
	locked = true;
	var addId = $('#defender').children();
	addId.attr("id", "defense");
	var addSecId = $('#defender').find("span:first");
	addSecId.attr("id", "dHChange");
	attackLock = false;
});

$("#attack").on("click", function() {
if (!attackLock) {
	var attackerLife = $('#attacker').attr("data-hp") - $('#defense').attr("data-attack");
	var defenderLife = $('#defense').attr("data-hp") - $('#attacker').attr("data-attack");
	$('#attacker').attr("data-hp", attackerLife);
	$('#aHChange').html(attackerLife);
	$('#defense').attr("data-hp", defenderLife);
	$('#dHChange').html(defenderLife);

	if (clicks >= 1) {
		var attackerPower = (Math.ceil ($('#attacker').attr("data-attack") * 1.2));
		$('#attacker').attr("data-attack", attackerPower);
		$('#aPChange').html(attackerPower);
	}


	if (defenderLife <= 0) {
		$('#defender').html("");
		locked = false;
		attackLock = true;
	}
	if (attackerLife <= 0) {
		lossCounter++;
		$('#lossCounter').html("<h2>Losses: " + lossCounter + "</h2>");
		console.log(lossCounter);
		console.log('You lose!');
		alert('You lose!');
		startGame();
	}
	if (attackerLife > 0 &&  $('#enemies').is(':empty') && $('#defender').is(':empty') ) {
		winCounter++;
		$('#winCounter').html("<h2>Wins: " + winCounter + "</h2>");
		console.log(winCounter);
		console.log('You Win!');
		alert('You Win!');
		startGame();
	} 
	clicks++;
	console.log(attackerLife);
}
});