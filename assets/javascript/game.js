function character(name, health, attack, counter){
	this.name = name;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.image = "assets/images/"+name+".png";
};

var Revan = new character("Liara", 120, 8, 8);
var Bastila = new character("Garrus", 100, 5, 5);
var HK47 = new character("Mordin", 150, 20, 20);
var Malak = new character("Tali", 180, 25, 25);

var userCharacter;
var enemyCharacter;

var baseDamage = 0;

var characterArray = [Revan, Bastila, HK47, Malak];

var music = new Audio("assets/audio/music.mp3");
var characterSelect = new Audio("assets/audio/characterSelect.mp3");
var attackSound = new Audio("assets/audio/attack.mp3");
var playerDiedSound = new Audio("assets/audio/playerDiedSound.mp3");
var enemyDiedSound = new Audio("assets/audio/enemyDiedSound.mp3");
var victory = new Audio("assets/audio/victory.mp3");


function addCharacterDiv(theCharacter, divClass){
	var divContainer = $("<div>");
		divContainer.addClass("container-div");
		divContainer.append("<p class=\"charName\">"+theCharacter.name+"</p>");
	var characterImage = $("<img>");
		characterImage.addClass("character-image");
		characterImage.attr('id', theCharacter.name+"Image");
		characterImage.attr("src", theCharacter.image);
		characterImage.attr("data-name", theCharacter.name);
		characterImage.attr("data-health", theCharacter.health);
		characterImage.attr("data-attack", theCharacter.attack);
		characterImage.attr("data-counter", theCharacter.counter);
		characterImage.attr("data-image", theCharacter.image);
	$(divClass).append(divContainer);
	$(divContainer).append(characterImage);
	$(divContainer).append("<p class=\"charHealth\">"+theCharacter.health+"</p>");
}

function playMusic(){
	if(music.paused){
		music.play();
		document.getElementById("playMusic").style.backgroundColor = "red";
	}
	else if(!music.paused){
		music.pause();
		document.getElementById("playMusic").style.backgroundColor = "black	";
	}
	else{
		//nothing
	}
}

function newGame(){
// 	console.log("New Game");
	$(".btn-attack").hide();
	$(".btn-restart").hide();
	$(".yourDetail").hide();
	$(".enemyDetail").hide();
	$(".characters").empty();
	$(".yourCharacter").empty();
	$(".fighters").empty();
	$(".defender").empty();
	baseDamage=0;	
	for(var i = 0; i<characterArray.length; i++){
		addCharacterDiv(characterArray[i], ".characters");
	}
	addListeners();
}

$(document).ready(function() {
	newGame();
	
	$(".btn-attack").on("click", function() {
		if ($(".defender").find(".container-div").length > 0 && $(".yourCharacter").find(".container-div").length > 0){
			attack();
		}
	});
	
	$(".btn-restart").on("click", function() {
		newGame();
	});
});

function attack(){
	$(".yourDetail").show();
	$(".enemyDetail").show();
	
	$(".yourDetail").text(userCharacter.children().eq(1).attr("data-name")+" hit "+enemyCharacter.children().eq(1).attr("data-name")+" for "+userCharacter.children().eq(1).attr("data-attack") +" points.");
	
	$(".enemyDetail").text(enemyCharacter.children().eq(1).attr("data-name")+" hit "+userCharacter.children().eq(1).attr("data-name")+" for "+enemyCharacter.children().eq(1).attr("data-attack") +" points.");
	
	var strike = parseInt(enemyCharacter.children().eq(1).attr("data-health"))-parseInt(userCharacter.children().eq(1).attr("data-attack"));
	enemyCharacter.children().eq(1).attr("data-health", strike);
	var userAttackIncrease = parseInt(userCharacter.children().eq(1).attr("data-attack"))+parseInt(baseDamage);
	userCharacter.children().eq(1).attr("data-attack", userAttackIncrease);
	
	if(parseInt(enemyCharacter.children().eq(1).attr("data-health"))>0){
		var enemyStrike = parseInt(userCharacter.children().eq(1).attr("data-health"))-parseInt(enemyCharacter.children().eq(1).attr("data-attack"));
		userCharacter.children().eq(1).attr("data-health", enemyStrike);
		attackSound.play();
	}
	else{
		$(".defender .container-div").remove();
		$(".enemyDetail").hide();
		$(".yourDetail").text("You have defeated "+enemyCharacter.children().eq(1).attr("data-name")+". Please select a new enemy.");
		enemyDiedSound.play();
		if($(".fighters").find(".container-div").length === 0){
			enemyDiedSound.pause();
			victory.play();
			$(".yourDetail").text("You won!!! GAME OVER!!!");
			$(".btn-restart").show();
		}
		
	}
	
	$(".defender .charHealth").text(enemyCharacter.children().eq(1).attr("data-health"));
	$(".yourCharacter .charHealth").text(userCharacter.children().eq(1).attr("data-health"));
	
	if(parseInt(userCharacter.children().eq(1).attr("data-health"))<=0){
		attackSound.pause();
		playerDiedSound.play();
		$(".yourCharacter .container-div").remove();
		$(".yourDetail").hide();
		$(".enemyDetail").text("You were defeated. GAME OVER!!!");
		$(".btn-restart").show();
	}
}

function addListeners(){
	$(".container-div").on("click", function() {
		if ($(".yourCharacter").find(".container-div").length === 0 && $(".btn-restart").is(":hidden")){ 
			for(var i = 0; i<characterArray.length; i++){
				if(characterArray[i].name === $(this).text().substr(0, $(this).text().length-3)){
					$(this).appendTo(".yourCharacter");
					$(this).css("border-color", "red");
					$(this).css("background-color", "teal");
					userCharacter = $(this);
					baseDamage = $(this).children().eq(1).attr("data-attack");
					characterSelect.play();
					$(".characters .container-div").each(function(){
						$(this).css("background-color", "red");
					    $(this).appendTo(".fighters");
					});
					
				}
			}
		}
		else if ($(".defender").find(".container-div").length === 0 && $(this).parents(".fighters").length>0){ 
			for(var i = 0; i<characterArray.length; i++){
				if(characterArray[i].name === $(this).text().substr(0, $(this).text().length-3)){
					$(this).appendTo(".defender");
					$(this).css("background-color", "black");
					$(this).css("color", "white");
					$(this).css("border-color", "red");
					characterSelect.play();
					enemyCharacter = $(this);
					$(".btn-attack").show();
				}
			}
		}
		
	});
}