

var correctColor = null;

function colorize() {
	function randomNumber() { return Math.floor((Math.random() * 255) + 0);}
	var num1 = randomNumber();
	var num2 = randomNumber();
	var num3 = randomNumber();
	return "rgb(" + num1 + "," + num2 + "," + num3 + ")";
}

var colorSquares = document.getElementsByClassName("color-square");

for (i=0; i<colorSquares.length; i++) {
	colorSquares[i].style.background= colorize();
}