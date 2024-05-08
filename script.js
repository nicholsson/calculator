let operand = "";
let operator;
let numberDisplay = "";
let firstOperandNumber = "";
let secondOperandNumber = "";
let displayOperand = document.querySelector(".operand");
let displayResult = document.querySelector(".result");
const numbers = document.querySelectorAll(".number"); 

function sum(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}
function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}
function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}
function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}
function percentage(number) {
    return number / 100;
}
function changeSign(number) {
    let oppositeNumber = -number;
    return oppositeNumber;
}
function decimal(number) {
    return number.concat(".");
}
function calculate() {
    let operationResult;
    switch (operator) {
        case "sum":
            sum(firstOperandNumber, secondOperandNumber);
            break;
    
        case "subtract":
            subtract(firstOperandNumber, secondOperandNumber);
            break;
        case "divide":
            divide(firstOperandNumber, secondOperandNumber);
            break;
        case "multiply":
            multiply(firstOperandNumber, secondOperandNumber);
            break;
    }
}
function calculator() {
    firstValue = false;
    secondValue = false;
    numbers.forEach((number) => number.addEventListener("click", ()=> {
        firstOperandNumber = firstOperandNumber.concat(number.textContent);
        displayOperand.textContent = firstOperandNumber;
    }));

}
calculator();