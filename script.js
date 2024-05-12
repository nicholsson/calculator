const display = document.querySelector("#display");
const buttons = document.querySelectorAll('button');

let runningResult = 0;
let buffer = '0';
let operator;

buttons.forEach((button) =>{
    button.addEventListener('click', () => {
        buttonClick(button.textContent);
    })
})

/*
 * Selecting all buttons and assigning to each button a function (buttonClick).
This function has the goal to verify what kind of button is clicked and
proceed appropriately.
 * 
 */ 

function buttonClick(value){
    if (isNaN(value)){
        handleSymbol(value);
    }else {
        handleNumber(value);
    }
    display.textContent = buffer;
}
function handleSymbol(symbol){
    switch(symbol){
        case 'AC':
            buffer = '0';
            runningResult = '';
            operator = '';
            break;
        case 'C':
            if(buffer.length === 1){
                buffer = '0';
            }else {
                buffer.slice(0, (buffer.length - 1));
            }
            break;
        case '%':
            // need to think about this one
            break;
        case '.':
            // need to think about this one
            break;
        case '÷':
            handleMath(symbol);
            break;
        case '×':
            handleMath(symbol);
            break;
        case '-':
            handleMath(symbol);
            break;
        case '+':
            handleMath(symbol);
            break;
        case '=':
            if(operator === null) {
                return;
            }else{
                computeOperation(parseFloat(buffer));
                buffer = runningResult.toString();
                display.textContent = buffer;
                operator = null;
                runningResult = 0;
            }
            break;
    }
}
function handleMath(symbol){
    // simple scenarios, the conditions may vary later to prevent some bugs
    if(operator === null){
        runningResult = parseFloat(buffer);
    }else{ //NEED TO WORK ON THIS STATEMENT
    // this case occurs when runningResult, buffer and a symbol are assigned
        const floatBuffer = parseFloat(buffer);
        computeOperation(floatBuffer);    
    }
    operator = symbol;
    buffer = '0';
}
function computeOperation(numb){
// this function is called when i have all the ingredients to make a computation
    switch(operator){
        case '+':
            runningResult += numb;
            break;
        case '-':
            runningResult -= numb;
            break;
        case '×':
            runningResult *= numb;
            break;
        case '÷':
            runningResult /= numb;
            break;
    }
}
function handleNumber(numberString){
    if(buffer.length < 10){
        if(buffer === '0'){
            buffer = numberString;
        }else{
            buffer += numberString;
        }
    }
}
