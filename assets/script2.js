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
	//
	var currSelectedCharacter;
	//
	var combatants = [];
	//
	var currDefender;
	//
	var turnCounter = 1;

	var killCount = 0;

	// FUNCTIONS
	//==================================================================================

	//This fuction will render a character card to the page
	//The character rendered and the area they are rendered to
	var renderOne = function(character, renderArea, charStatus) {
		var charDiv = $("<div class='character' data-name='" + character.name + "'>");
		var charName = $("<div class= 'character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
		var charHealth = $("<div class= 'character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);

		// If character is enemy or defender
		if (charStatus === "enemy"){
			$(charDiv).addClass("enemy");
		}
		else if (charStatus === "defender"){
			// Populate currDefender with the selected opponent's information
			currDefender = character;
			$(charDiv).addClass("target-enemy");
		}
	};

	
	// function to handle rendering game messages.
	var renderMessage = function(message) {

		//builder the message and appends it to the page
		var gameMessageSet = $("#game-message");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);	

		//if we get this message
		if (message === "clearMessage") {
			gameMessageSet.text("");
		}
	}

	// This function handles the rendering of characters
	var renderCharacters = function(charObj, areaRender) {

		// "character-section" is the div where all of our characters begin
		// If true, render all charaters to the starting area
		if (areaRender === "#characters-section") {
			$(areaRender).empty();
			// Loop through the characters object and call the renderOne function
			for(var key in charObj) {
				if(charObj.hasOwnProperty(key)) {
					renderOne(charObj[key], areaRender, "");
				}
			}
		}

		// Character select
		if (areaRender === "#selected-character"){
			renderOne(charObj, areaRender, "");
		}
		// Inactive Opponenets
		if (areaRender === "#available-to-attack-section"){
			// Loop through combatants array
			for (var i = 0; i < charObj.length; i++) {
				renderOne(charObj[i], areaRender, "enemy");
			}
			//creates an on click event for each enemy
			$(document).on("click", ".enemy", function() {
				var name = ($(this).attr("data-name"));

				if($("#defender").children().length === 0) {
					renderCharacters(name, "#defender");
					$(this).hide();
					renderMessage("clearMessage");
				}
			});
		}







		// "defender" is the div where the active opponent appears
		// If tues, render the selected enemy in this location
		if (areaRender === "#defender") {
			$(areaRender).empty();
			for (var i = 0; i < combatants.length; i++){
				if (combatants[i].name === charObj) {
					renderOne(combatants[i], areaRender, "defender");
				}
			}
		}
	
		// Re-render defender when attacked
		if (areaRender === "playerDamage") {
			$("#defender").empty();
			renderOne(combatants[i], areaRender,  "defender");
		}

		//re-render player character when attacked
		if (areaRender === "enemyDamage") {
			$("#selected-character").empth();
			renderOne(charObj, "#selected-character", "");
		}

		//remove defeated enemy
		if (areaRender === "enemyDefeated") {
			$("#defender").empty();
			var gameStateMessage = ("You have defeated " + char.Obj.name + " you can choose to fight  another enemy.");
			renderMessage(gameStateMessage)
		}
	};
	var restartGame = function(inputEndGame){
		var restart = $("<button>Restart</button").click(function(){
			location.reload();
		});
		var gameState = $("<div>").text(inputEndGame);

		$("body").append(gameState);
		$("body").append(restart);
	};



	//================================================================


	//Render all characters to the page when game starts
	renderCharacters(characters, "#characters-section");

	// On click event for selecting our character
	$(document).on("click", ".character", function() {
		// Saving the clicked character's name
		var name = $(this).attr("data-name");
 
 		// If a player character has not yety been chosen...
		if(!currSelectedCharacter){
			currSelectedCharacter = characters[name];
			//
			
			for (var key in characters) {
				if (key !== name) {
					combatants.push(characters[key]);
				}
			}
		
			console.log(combatants);
			// Hide the character select div
			$('#characters-section').hide();

			// Then render our selected character and our combatants
			renderCharacters(currSelectedCharacter, '#selected-character');
			renderCharacters(combatants, "#available-to-attack-section");
		}
	});

	// When you click the attack button, run the following game logic
	$("#attack-button").on("click", function() {

		if ($("#defender").children().length !== 0) {

			var attackMessage = ("You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.")
			var counterAttackMessage = (currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.")
			renderMessage("clearMessage")

			//reduce defenders health
			currDefender.health -= (currSelectedCharacter.attack * turnCounter);	
		
			// If the enemy still has health
			if(currDefender.health > 0) {

				//render the enemy's updated chjaracter card
				renderCharacters(currDefender, "playerDamage");
				renderMessage(attackMessage);
				renderMessage(counterAttackMessage);




				// Reduce you health by the opponenets attack value
				currSelectedCharacter.health -= currDefender.enemyAttackBack;

				//Render the  player's updated character card
				renderCharacters(currSelectedCharacter, "enemyDamage");

				if (currSelectedCharacter.health <= 0) {
					renderMessage("clearMessage");
					restartGame("You have been defeated...GAME OVER!");
					$("#attack-button").unbind("click");
				}

						else {
			// Remove your oppenet's charater card
			renderCharacters(currDefender, "enemyDefeated");
			//
			killCount++;
			// if you kill all your enemies you win
			if (killCount >=3){
				renderMessage("clearMessage");
				restartGame("You Won!")
			}
			}
		}
    }
		//If the enemy has less than zero health they are defeaTED

		turnCounter++;
	});
});