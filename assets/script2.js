
$(document).ready(function(){
	var characters = {
		"Lone Starr" : {
			name: "Lone Starr",
			health: 120,
			attack: 8,
			imageUrl: "assets/images/lonestarSelect.PNG",
			enemyAttackBack: 15
		},
		"Dark Helmet": {
			name: "Dark Helmet",
			health:100,
			attack: 14,
			imageUrl: "assets/images/darkHelmetSelect.png",
			enemyAttackBack: 5
		},
		"Pizza The Hut": {
			name: "Pizza The Hut",
			health: 150,
			attack: 8,
			imageUrl: "assets/images/pizzaTheHutSelect.png",
			enemyAttackBack: 5
		},
		"President Skroob": {
			name: "President Skroob",
			health: 80,
			attack: 5,
			imageUrl: "assets/images/skroopSelect.png",
			enemyAttackBack: 25
		},
		"Barf": {
			name: "Barf",
			health: 200,
			attack: 7,
			imageUrl: "assets/images/barfSelect.png",
			enemyAttackBack: 7
		}
	};
	console.log(characters);
	// FUNCTIONS
	//==================================================================================

	//This fuction will render a character card to the page
	//The character rendered and the area they are rendered to
	var renderOne = function(character, renderArea) {
		var charDiv = $("<div class='character' data-name'" + character.name + "'>");
		var charName = $("<div class= 'character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class= 'character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);
	}

	var renderCharacters = function(charObj, areaRender) {
		if (areaRender === "#characters-section") {
			$(areaRender).empty();
			for(var key in charObj) {
				if(charObj.hasOwnProperty(key)) {
					renderOne(charObj[key], areaRender);
				}
			}
		}
	}
	//Render all characters to the page when game starts
	renderCharacters(characters, "#characters-section");

	// On click event for selecting our character
	$(document).on("click", ".character", function() {
		// Saving the clicked character's name
		var name = $(this).attr("data-name");
		console.log(name);
	})
});