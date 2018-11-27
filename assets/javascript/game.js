function character(name, health, attack, counter){
	this.name = name;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.image = "assets/images/"+name+".jpg";
};

var Revan = new character("Revan", 120, 8, 8);
var Bastila = new character("Bastila", 100, 5, 5);
var HK47 = new character("HK47", 150, 20, 20);
var Malak = new character("Malak", 180, 25, 25);

var userCharacter;
var enemyCharacter;

var baseDamage = 0;

var characterArray = [Revan, Bastila, HK47, Malak];

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
// 	console.log("Added Characters");
	addListeners();
}

$(document).ready(function() {
	newGame();
	
	$(".btn-attack").on("click", function() {
// 		console.log("Attack");
		if ($(".defender").find(".container-div").length > 0 && $(".yourCharacter").find(".container-div").length > 0){
// 			console.log($(".defender").find(".container-div").length);
// 			console.log($(".yourCharacter").find(".container-div").length);
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
// 	console.log("user attack damage "+userAttackIncrease);
	userCharacter.children().eq(1).attr("data-attack", userAttackIncrease);
	
	if(parseInt(enemyCharacter.children().eq(1).attr("data-health"))>0){
		var enemyStrike = parseInt(userCharacter.children().eq(1).attr("data-health"))-parseInt(enemyCharacter.children().eq(1).attr("data-attack"));
		userCharacter.children().eq(1).attr("data-health", enemyStrike);
// 		console.log("enemy still has health");
	}
	else{
// 		console.log("enemy has no more health");
// 		console.log($(enemyCharacter));
		$(".defender .container-div").remove();
		$(".enemyDetail").hide();
		$(".yourDetail").text("You have defeated "+enemyCharacter.children().eq(1).attr("data-name")+". Please select a new enemy.");
		
		if($(".fighters").find(".container-div").length === 0){
			$(".yourDetail").text("You won!!! GAME OVER!!!");
			$(".btn-restart").show();
		}
		
	}
// 	console.log(userCharacter.children().eq(1).attr("data-health"));
// 	console.log(enemyCharacter.children().eq(1).attr("data-health"));
	
	$(".defender .charHealth").text(enemyCharacter.children().eq(1).attr("data-health"));
	$(".yourCharacter .charHealth").text(userCharacter.children().eq(1).attr("data-health"));
	
	if(parseInt(userCharacter.children().eq(1).attr("data-health"))<=0){
		$(".yourCharacter .container-div").remove();
		$(".yourDetail").hide();
		$(".enemyDetail").text("You were defeated. GAME OVER!!!");
// 		console.log("YOU LOST");
		$(".btn-restart").show();
	}
}

function addListeners(){
	$(".container-div").on("click", function() {
// 		console.log($(this).parents(".characters").length);
// 		console.log("Hide element");
		if ($(".yourCharacter").find(".container-div").length === 0 && $(".btn-restart").is(":hidden")){ 
			for(var i = 0; i<characterArray.length; i++){
// 				console.log(characterArray[i].name);
// 				console.log($(this).text().substr(0, $(this).text().length-3));
				if(characterArray[i].name === $(this).text().substr(0, $(this).text().length-3)){
// 					console.log("found it");
// 					addCharacterDiv(characterArray[i], ".yourCharacter");
					$(this).appendTo(".yourCharacter");
					$(this).css("border-color", "red");

					userCharacter = $(this);
					baseDamage = $(this).children().eq(1).attr("data-attack");
// 					$(this).remove();
										
					$(".characters .container-div").each(function(){
						$(this).css("background-color", "red");
					    $(this).appendTo(".fighters");
					});
					
				}
			}
		}
		else if ($(".defender").find(".container-div").length === 0 && $(this).parents(".fighters").length>0){ 
			for(var i = 0; i<characterArray.length; i++){
// 				console.log(characterArray[i].name);
// 				console.log($(this).text().substr(0, $(this).text().length-3));
				if(characterArray[i].name === $(this).text().substr(0, $(this).text().length-3)){
// 					console.log("found it");
					//addCharacterDiv(characterArray[i], ".defender");
					$(this).appendTo(".defender");
					$(this).css("background-color", "black");
					$(this).css("color", "white");
					$(this).css("border-color", "red");
					enemyCharacter = $(this);
// 					$(this).remove();
					$(".btn-attack").show();
				}
			}
		}
		
	});
}