const displayPreviousNumber = document.querySelector(".previous-number");
const displayCurrentNumber = document.querySelector(".current-number");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const resetButton = document.querySelector("#ac");
const cancelButton = document.querySelector("#c");
const percentageButton = document.querySelector(".percentage-button");

let previousNumber = "";
let currentNumber = "";
let operatorSign = "";
numbers.forEach(number => {
    number.addEventListener("click", () => {
        displayNumber(number.textContent);
    })
});
operators.forEach(operator => {
    operator.addEventListener("click", () => {
        operate(operator.textContent);
    })
})
function displayNumber(num) {
    if (currentNumber.length < 9) {
        currentNumber += num;
        displayCurrentNumber.textContent = currentNumber;
        displayPreviousNumber.textContent = previousNumber;
    } else {
        alert('number is too big');
    }
}
function operate(sign) {
    if (operatorSign != "=" && operatorSign == "") {
        operatorSign = sign;
        previousNumber = currentNumber;
        currentNumber = "";
    } else {
        displayCurrentNumber.textContent = calculate();
        operatorSign = "";
    }
}
function calculate() {
    let result = 0;
    switch (operatorSign) {
        case "+":
            result = sum(previousNumber, currentNumber);
            break;
        case "-":
            result = subtract(previousNumber, currentNumber);
            break;
        case "/":
            result = divide(previousNumber, currentNumber);
            break;
        case "X":
            result = multiply(previousNumber, currentNumber);
            break;
    }
    currentNumber = result;
    return result
}
function sum(previousNumber, currentNumber) {

    return parseFloat(previousNumber) + parseFloat(currentNumber)
}
function subtract(previousNumber, currentNumber) {

    return parseFloat(previousNumber) - parseFloat(currentNumber)
}
function divide(previousNumber, currentNumber) {

    return parseFloat(previousNumber) / parseFloat(currentNumber)
}
function multiply(previousNumber, currentNumber) {

    return parseFloat(previousNumber) * parseFloat(currentNumber)
}