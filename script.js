const displayPreviousNumber = document.querySelector(".previous-number");
const displayCurrentNumber = document.querySelector(".current-number");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const resetButton = document.querySelector("#ac");
const cancelButton = document.querySelector("#c");
const percentageButton = document.querySelector(".percentage-button");

let haveCalculated = false;
let calculator = {previousNumber: "", currentNumber: "", operatorSign: ""};

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
    if (num =='.' && calculator.currentNumber.includes('.')) {
        return;
    }
    if (calculator.currentNumber.length < 9) {
        calculator.currentNumber += num;
        displayCurrentNumber.textContent = calculator.currentNumber;
        displayPreviousNumber.textContent = calculator.previousNumber;
    } else {
        alert('too many digits!');
    }
}
function operate(sign) {
    if (calculator.operatorSign == "") {
        calculator.operatorSign = sign;
        calculator.previousNumber = calculator.currentNumber;
        calculator.currentNumber = "";
        displayPreviousNumber.textContent = calculator.previousNumber;
    } else {
        calculate(calculator.previousNumber, calculator.currentNumber, calculator.operatorSign);
        displayCurrentNumber.textContent = calculator.currentNumber;
        displayPreviousNumber.textContent = calculator.previousNumber;
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
    calculator.currentNumber = result.toString();
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