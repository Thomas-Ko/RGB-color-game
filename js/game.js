var correctColor = null; 
var gameOn = true;
var colorAmt = 6; 
var colorSquares = null; //this will become a node list when the createColorSquares function is initialized;
var colorContainer=document.getElementById("colorContainer"); //this is where the colorDivs will be put in
var correctColorHTML = document.getElementById("correctColor"); //this is where the correct color will be printed
var difficultyList = document.getElementsByClassName("difficulty"); //this stores a nodelist of the easy,medium,hard buttons
//buttons
var newGameButton = document.getElementById("newGame");
var easyBtn = document.getElementById("easy");
var mediumBtn = document.getElementById("medium");
var hardBtn = document.getElementById("hard");

//creates the colors
function createColorSquares(){	
	for (i=0;i<colorAmt;i++){
		var colorDiv = document.createElement("div");
		colorDiv.setAttribute("class","color-square");
		colorContainer.appendChild(colorDiv);
	}
		/*Thomas's Note: at first I only had ' colorContainer.appendChild(colorDiv) ' inside the for-loop
		and everything else outside of it. I realized I needed to create a div each time the loop ran. If I hadn't,
		I would have just been appending the same one div over and over and not actually appending a new div*/
	
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

//sets random background colors for each node in colorSquares
function setRGBforAll() {
	for (i=0; i<colorSquares.length; i++) {
		colorSquares[i].style.background= setRGB();
	}
}

//sets correctColor to one of the colored squares' background color and displays on the html page 
function setCorrectColor() {
	var i = Math.floor((Math.random() * (colorAmt-1)) + 0);
	correctColor = colorSquares[i].style.backgroundColor;	
	correctColorHTML.textContent = correctColor;
}
/*Thomas's note: At first I thought of setting the correctColor first and then assigning that to one of
the correctColors items, but I quickly realized that would not be an elegant solution. It's faster to just set the
correctColor variable to the background color of one of the colored squares */

//checks to see if the item clicked corresponds to the correctColor variable;
function checkColor() {
	if (gameOn) {
		if (this.style.backgroundColor===correctColor){
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

//this function gives the clicked difficulty button the .btn-selected class and removes it from the others
function selectBtn(btnName) {
	for (i=0;i<difficultyList.length;i++){
		difficultyList[i].classList.remove("btn-selected");
	}
	btnName.classList.add("btn-selected");
}

/*Thomas Note: I originally didn't want to use the btnName parameter in the selectBtn function and instead just use the this keyword [ so it would look like
this.classList.add("btn-selected");  ] but that wouldn't work because the selectBtn function is invoked inside another function and that function is part of an 
event listener, and the this would be pointing outside of the scope I wanted. Had I not included this selectBtn function inside of another function and instead just used 
selectBtn as the function for the event listener [so it would look something like   easyBtn.addEventListener("click",selectBtn); ], I could've actually used 
the this keyword how I wanted and not have to use a parameter but I can't do that since I still have to run the other functions on the click event. Using the parameter was 
an easy solution. Boy, was this note a tad too long.*/


//Event Listeners for buttons
newGameButton.addEventListener("click",init);

easyBtn.addEventListener("click", function() {
	var newthis = this;
	colorAmt=3;	
	selectBtn(easyBtn);
	init();
});

mediumBtn.addEventListener("click", function() {
	colorAmt=6;	
	selectBtn(mediumBtn);
	init();
});

hardBtn.addEventListener("click", function() {
	colorAmt=9;	
	selectBtn(hardBtn);
	init();
});


//initializes the game
function init() {
	gameOn=true;
	colorContainer.innerHTML=""; //removes the color divs
	createColorSquares(); //creates the divs
	removeClasses(); //removes any .winner or .loser classes
	setRGBforAll(); // sets background colors for color divs
	setCorrectColor(); // sets correctColor variable
	makeColorsClickable(); //gives event listeners to all color squares
}

init();