function character(name, health, attack, counter){
	this.name = name;
	this.health = health;
	this.attack = attack;
	this.counter = counter;
	this.image = name+".jpg";
};

var Revan = new character("Revan", 30, 2, 2);
var Bastila = new character("Bastila", 40, 4, 4);
var HK47 = new character("HK47", 75, 6, 6);
var Malak = new character("Malak", 100, 8, 8);


var characterArray = [Revan, Bastila, HK47, Malak];

for (var i = 0; i < characterArray.length; i++) {
	
	var characterImage = $("<img>");
	characterImage.addClass("character-image");
	characterImage.attr("src", characterArray[i].image);
	characterImage.attr("data-health", characterArray[i].health);
	characterImage.attr("data-attack", characterArray[i].attack);
	characterImage.attr("data-counter", characterArray[i].counter);
	$("#characters").append(characterImage);
}
