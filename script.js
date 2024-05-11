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
        buildCalculator(operator.textContent);
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
    if (('operationResult' in calculator) || ('operatorSign' in calculator)) {
        displayPreviousNumber.textContent = displayCurrentNumber.textContent;
        displayCurrentNumber.textContent = "";
    }
    if (num == '.' && displayCurrentNumber.textContent.includes('.')){
        return;
    }
    if (displayCurrentNumber.textContent.length < 9){
        displayCurrentNumber.textContent += num;
    }
    

}
function buildCalculator(sign) {
    if (!('num1' in calculator)) {
        calculator.operatorSign = sign;
        calculator.num1 = getContent();
        displayPreviousNumber.textContent = calculator.num1;
    } else if (!('num2' in calculator)) {
        calculator.num2 = getContent();
        calculate(calculator.num1, calculator.num2, calculator.operatorSign);
    }
    
}
//function operate() {

//}

function calculate(n1, n2, operatorSign) {
    let result = 0;
    switch (operatorSign) {
        case "+":
            result = sum(n1, n2);
            break;
        case "-":
            result = subtract(n1, n2);
            break;
        case "/":
            result = divide(n1, n2);
            break;
        case "X":
            result = multiply(n1, n2);
            break;
    }
    calculator.num1 = calculator.num2;
    calculator.operationResult = result;
//update the display
    displayCurrentNumber.textContent = calculator.operationResult;
    delete calculator.num2;
    delete calculator.num1;
    delete calculator.operatorSign;
    return result;
}
function sum(n1, n2) {

    return parseFloat(n1) + parseFloat(n2)
}
function subtract(n1, n2) {

    return parseFloat(n1) - parseFloat(n2)
}
function divide(n1, n2) {

    return parseFloat(n1) / parseFloat(n2);
}
function multiply(n1, n2) {

    return parseFloat(n1) * parseFloat(n2);
}
function resetCalculator() {
    calculator.num2 = "";
    calculator.num1 = "";
    calculator.operatorSign = "";
    displayCurrentNumber.textContent = "";
    displayPreviousNumber.textContent = "";
}
function cancelDigit() {
    calculator.n2 = calculator.n2.slice(0, calculator.n2.length - 1);
    displayCurrentNumber.textContent = calculator.n2.toString();
    return calculator.n2;
}
function calculatePercentage() {
    num = parseFloat(calculator.n2);
    result = num * 0.01;
    calculator.n2 = result.toString();
    displayCurrentNumber.textContent = calculator.n2;

}
function getContent() {
    return displayCurrentNumber.textContent;
}