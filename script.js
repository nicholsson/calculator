const displayPreviousNumber = document.querySelector(".previous-number");
const displayCurrentNumber = document.querySelector(".current-number");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const resetButton = document.querySelector("#ac");
const cancelButton = document.querySelector("#c");
const percentageButton = document.querySelector(".percentage-button");

let calculator = {};

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
resetButton.addEventListener("click", () => {
    resetCalculator();
})
cancelButton.addEventListener("click", () =>{
    cancelDigit();
})
percentageButton.addEventListener("click", () => {
    calculatePercentage();
})
function displayNumber(num) {
    // prevent adding . if nnumber is already a decimal:
    if (num == '.' && displayCurrentNumber.textContent.includes('.')){
        return;
    }
    if (displayCurrentNumber.textContent.length < 9){
        displayCurrentNumber.textContent += num;
    }

}
function operate(sign) { 
    if('operationResult' in calculator && calculator.currentNumber in calculator) {
        calculate(calculator.operationResult, calculator.currentNumber, calculator.operatorSign);
    } else if (!(('operationResult' && calculator.previousNumber) in calculator)) {
// this means that no calculation has yet been done, and that i am waiting for a second number (current number)
// so i just assign the operatorSign to calculator and the number displayed before pressing the sign to previousNumber
        calculator.operatorSign = sign;
        calculator.previousNumber = displayCurrentNumber.textContent;
        displayPreviousNumber.textContent = calculator.previousNumber;
        displayCurrentNumber.textContent = "";
    }
}

function calculate(previousNumber, currentNumber, operatorSign) {
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
    calculator.previousNumber = calculator.currentNumber;
    calculator.operationResult = result;
//update the display
    displayPreviousNumber.textContent = previousNumber;
    displayCurrentNumber.textContent = calculator.operationResult;
    delete calculator.currentNumber;
    delete calculator.previousNumber;
    delete calculator.operatorSign;
    return result;
}
function sum(previousNumber, currentNumber) {

    return parseFloat(previousNumber) + parseFloat(currentNumber)
}
function subtract(previousNumber, currentNumber) {

    return parseFloat(previousNumber) - parseFloat(currentNumber)
}
function divide(previousNumber, currentNumber) {

    return parseFloat(previousNumber) / parseFloat(currentNumber);
}
function multiply(previousNumber, currentNumber) {

    return parseFloat(previousNumber) * parseFloat(currentNumber);
}
function resetCalculator() {
    calculator.currentNumber = "";
    calculator.previousNumber = "";
    calculator.operatorSign = "";
    displayCurrentNumber.textContent = "";
    displayPreviousNumber.textContent = "";
}
function cancelDigit() {
    calculator.currentNumber = calculator.currentNumber.slice(0, calculator.currentNumber.length - 1);
    displayCurrentNumber.textContent = calculator.currentNumber.toString();
    return calculator.currentNumber;
}
function calculatePercentage() {
    num = parseFloat(calculator.currentNumber);
    result = num * 0.01;
    calculator.currentNumber = result.toString();
    displayCurrentNumber.textContent = calculator.currentNumber;

}
function getContent() {
    return displayCurrentNumber.textContent;
}