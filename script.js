const displayPreviousNumber = document.querySelector(".previous-number");
const displayCurrentNumber = document.querySelector(".current-number");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const resetButton = document.querySelector("#ac");
const cancelButton = document.querySelector("#c");
const percentageButton = document.querySelector(".percentage-button");


/*
* the calculator is built with four properties:
 * 
 * 1) num1 -> first number
 * 2) num2 -> second number
 * 3) opSign -> operator
 * 4) result -> result of a calculation
 * 
 * These properties are added according to the following logic:
 *
 * CASE 1 -> When inserting numbers, if !opSign in calculator, then create num1 with the pressed number as first value and add the subsequent numbers to num1.
 * in this case when adding numbers it is necessary to check if the length of the number is within the chosen limit (8 digits in my case)
 * 
 * CASE 2 -> When inserting numbers, if opSign in calculator (meaning that num1 is created and stored in calculator), then create num2 with the same logic
 * as num1. 
 * 
 * CASE 3 -> When started, there will be no operator assigned, therefore when the operator buttons is clicked the opSign will be created in calculator
 * with the corresponding operator (this is done in the buildCalculator function). This case will trigger case 2 if number buttons are pressed,
 * building the calculator object.
 * 
 * CASE 4 -> When opSign is already assigned and an operator button is pressed, this means that (ideally) num1 and num2 are present in calculator,
 * therefore it must calculate(num1, num2, opSign) accordingly -> once the calculation is done, the result is assigned to calculator.result, and num1 and num2
 * will be delated to trigger CASE 2.
 * 
 * CASE 5 (VARIATION of CASE 4) -> It may happen that if we repeat CASE 4, but opSign, calculator.result (instead of num1) and num2 are present in calculator,
 * then it must calculate(calculator.result, num2, opSign) -> once the calculation is done, the result is updated, num1 and num2 are deleted,
 * and opSign will be updated with the last pressed button that triggered the calculation.
 * 
 */
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
// this will follow CASE 1 logic.
    if (!('opSign' in calculator) && !('num1' in calculator)) {
        calculator.num1 = num;
        displayCurrentNumber.textContent += calculator.num1;
    } else if (!('opSign' in calculator) && (calculator.num1.length < 9)) {
        if (num == '.' && calculator.num1.includes('.')) {
            return;
        } else {
            calculator.num1 += num;
            displayCurrentNumber.textContent = calculator.num1;
        }
    }
// this will follow CASE 2 logic.
    if (('opSign' in calculator) && !('num2' in calculator)) {
        calculator.num2 = num;
        if ('result' in calculator) {
            displayPreviousNumber.textContent = calculator.result + calculator.opSign;
            displayCurrentNumber.textContent = calculator.num2;
        } else {
            displayPreviousNumber.textContent = calculator.num1 + calculator.opSign;
            displayCurrentNumber.textContent = calculator.num2;
        }
        
    } else if (('num2' in calculator) && calculator.num2.length < 9) {
        if (num == '.' && calculator.num2.includes('.')) {
            return;
        } else {
            calculator.num2 += num;
            displayCurrentNumber.textContent = calculator.num2;
        }
    }

}
function buildCalculator(sign) {

    if (('result' in calculator) && ('opSign' in calculator) && ('num2' in calculator)) {
        displayPreviousNumber.textContent = calculator.num2;
        calculate(calculator.result, calculator.num2, calculator.opSign);
        displayCurrentNumber.textContent = calculator.result;
        calculator.opSign = sign;
    } else if (('num1' in calculator) && ('opSign' in calculator) && ('num2' in calculator)) {
        displayPreviousNumber.textContent = calculator.num2;
        calculate(calculator.num1, calculator.num2, calculator.opSign);
        displayCurrentNumber.textContent = calculator.result;
        calculator.opSign = sign;
    } else {
        calculator.opSign = sign;
    }  
    console.log(calculator.result);
    console.log(calculator.num1);
    console.log(calculator.num2);
    console.log(calculator.opSign);
    
 }


function calculate(n1, n2, operator) {
    let computation = 0;
    switch (operator) {
        case "+":
            computation = sum(n1, n2);
            break;
        case "-":
            computation = subtract(n1, n2);
            break;
        case "/":
            computation = divide(n1, n2);
            break;
        case "X":
            computation = multiply(n1, n2);
            break;
    }
    
    calculator.result = computation;
    delete calculator.num1;
    delete calculator.num2;
    delete calculator.opSign;
   
    return computation;
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
    // to do
    displayCurrentNumber.textContent = "";
    displayPreviousNumber.textContent = "";
}
function cancelDigit() {
    // to do
    num2 = num2.slice(0, num2.length - 1);
    displayCurrentNumber.textContent = num2.toString();
    return num2;
}
function calculatePercentage() {
    let num = parseFloat(calculator.n2);
    let result = num * 0.01;
    nu2 = result.toString();
    displayCurrentNumber.textContent = num2;

}
function getContent() {
    return displayCurrentNumber.textContent;
}