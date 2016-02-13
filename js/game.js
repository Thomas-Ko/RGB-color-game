var correctColor = null; 
var gameOn = true;
var colorAmt = 6; 
var colorSquares = null; //this will become a node list when the createColorSquares function is initialized;
var colorContainer=document.getElementById("colorContainer");

//creates the colors
function createColorSquares(){	
	for (i=0;i<colorAmt;i++){
		var colorDiv = document.createElement("div");
		colorDiv.setAttribute("class","color-square");
		colorContainer.appendChild(colorDiv);
	}
		/*Thomas's Note: at first I only had ' colorContainer.appendChild(colorDiv) ' inside the for-loop
		and everything else outside of it. I realized I needed to create a node each time the loop ran. */
	
	//retrieves divs with "color-square" classes and creates node list
	colorSquares = document.getElementsByClassName("color-square");
}

//creates an rgb property with random values, used for setting background colors of .color-square divs
function setRGB() {
	function randomNumber() { return Math.floor((Math.random() * 255) + 0);}
	var num1 = randomNumber();
	var num2 = randomNumber();
	var num3 = randomNumber();
	return "rgb(" + num1 + "," + num2 + "," + num3 + ")";
}

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
	var i = Math.floor((Math.random() * (colorAmt-1)) + 0);
	correctColor = colorSquares[i].style.background;	
	correctColorHTML.textContent = correctColor;
}
/*Thomas's note: At first I thought of setting the correctColor first and then assigning that to one of
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

//this function is used inside the init function, it removes the winner and loser classes
function removeClasses() {
	for (i=0; i<colorSquares.length; i++){
		colorSquares[i].classList.remove("winner");
		colorSquares[i].classList.remove("loser");
	}
}

function init() {
	gameOn=true;
	colorContainer.innerHTML=""; //removes the color divs
	createColorSquares(); //creates the color squares
	removeClasses(); //removed any .winner or .loser classes
	setRGBforAll(); // sets background colors for color divs
	setCorrectColor(); // sets correctColor variable
	makeColorsClickable(); //gives event listeners to all color squares
}

//New Game Button
var newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click",init);

//difficulties
var easy = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard = document.getElementById("hard");

easy.addEventListener("click", function() {
	colorAmt=3;	
	init();
});

medium.addEventListener("click", function() {
	colorAmt=6;	
	init();
});

hard.addEventListener("click", function() {
	colorAmt=9;	
	init();
});


init();