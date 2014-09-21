var errorText = "X and Y must be integers";

function add(x, y) {
    if (!isNaN(x) && !isNaN(y)) {
        setResult(x + " plus " + y + " is " + (x + y));
    } else {
        setResult(errorText);
    }
}

function subtract(x, y) {
    if (!isNaN(x) && !isNaN(y)) {
        setResult(x + " minus " + y + " is " + (x - y));
    } else {
        setResult(errorText)
    }
}

function setResult(result) {
    document.getElementById('result').innerHTML = result;
}
