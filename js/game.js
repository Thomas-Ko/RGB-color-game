

var correctColor = null;
var gameOn = true;

//creates an rgb property with random values, used for setting background colors of .color-square divs
function setRGB() {
	function randomNumber() { return Math.floor((Math.random() * 255) + 0);}
	var num1 = randomNumber();
	var num2 = randomNumber();
	var num3 = randomNumber();
	return "rgb(" + num1 + "," + num2 + "," + num3 + ")";
}

//retrieves divs with "color-square" classes
var colorSquares = document.getElementsByClassName("color-square");

//sets random background colors for each colorSquares

function setRGBforAll() {
	for (i=0; i<colorSquares.length; i++) {
		colorSquares[i].style.background= setRGB();
	}
}

//retrieves the span tag with id of correctColor, this is where the correct color will be printed
var correctColorHTML = document.getElementById("correctColor"); 

//sets correctColor to one of the colorSquares' background color and displays on the html page 
function setCorrectColor() {
	var i = Math.floor((Math.random() * 5) + 0);
	correctColor = colorSquares[i].style.background;	
	correctColorHTML.textContent = correctColor;
}
/*Creator's note: At first I thought of setting the correctColor first and then assigning that to one of
the correctColors items, but I quickly realized that would not be an elegant solution */

//checks to see if the item clicked corresponds to the correctColor variable;
function checkColor() {
	if (gameOn) {
		if (this.style.background===correctColor){
			console.log("winner");
			this.classList.add("winner");	//adds .winner class which gives the div a nice glow
			gameOn=false;	//turns game off
		} else {
			this.classList.add("loser"); //maybe not the most elegant solution(loser class changes opacity to 0 instead of disappear div);
			console.log("false");
		}
	}
}

//adds a click event to each item of colorSquares, when clicked it runs the checkColor function
function makeColorsClickable () {
	for (i=0; i<colorSquares.length; i++){
		colorSquares[i].addEventListener("click",checkColor);
	}
}

//this function is used inside the newGame function, it removes the winner and loser classes
function removeClasses() {
	for (i=0; i<colorSquares.length; i++){
		colorSquares[i].classList.remove("winner");
		colorSquares[i].classList.remove("loser");
	}
}

function newGame() {
	gameOn=true;
	removeClasses();
	setRGBforAll();
	setCorrectColor();
	makeColorsClickable();
}

//New Game Button
var newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click",newGame);

newGame();