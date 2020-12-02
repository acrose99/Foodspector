let violationNumber = 0;

function nextViolation() {
    // var c = document.getElementById("main").children.length;
    // console.log(c);

    var main = document.getElementById("main")


    var nextViolation = main.children[violationNumber+1];

    var currentViolation = main.children[violationNumber];

    currentViolation.style.display = "none";
    nextViolation.style.display = "inherit";

    violationNumber++;
    console.log(violationNumber);
}

function previousViolation() {
    // var c = document.getElementById("main").children.length;
    // console.log(c);

    var main = document.getElementById("main")


    var previousViolation = main.children[violationNumber-1];
    var currentViolation = main.children[violationNumber];

    currentViolation.style.display = "none";
    previousViolation.style.display = "inherit";

    violationNumber--;
    console.log(violationNumber);
}

function popUp() {
    var popup = document.getElementById("violationPopUp")
    var violationDisplay = document.getElementById("Violations")

    violationDisplay.style.display = "none"

    popup.style.display = "inherit";


    var currentViolation = popup.children[violationNumber];

    currentViolation.style.display = "inherit";
}
