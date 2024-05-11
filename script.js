const displayPreviousNumber = document.querySelector(".previous-number");
const displayCurrentNumber = document.querySelector(".current-number");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const resetButton = document.querySelector("#ac");
const cancelButton = document.querySelector("#c");
const percentageButton = document.querySelector(".percentage-button");


/** the calculator is built with four properties:
 * 
 * 1) num1 -> first number
 * 2) num2 -> second number
 * 3) opSign -> operator
 * 4) result
 * 
 * These properties are added according to the following logic:
 * 
 * CASE 1 -> the program is just started and the number being displayed will be saved as 
 * num1 as soon as an operator is clicked; the operator is also created in the calculator
 * 
 * CASE 2 -> with num1 && sign in calculator, when another operator is clicked (if a number is displayed), the displayed
 * number is saved as num2 and the calculation begins [calculate(calculator.num1, calculator.num2, calculator.sign)]
 * At this point, in CASE 2 we then have to store the result of the operation in num1, display it on screen, 
 * delete num2 and overwrite the new sign previously clicked;
 *
 * CASE 3 -> in this case we have num1 (which is the result of the previous operation), the overwritten sign and we need to write a new number num2;
 * The situation of CASE 3 is 
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