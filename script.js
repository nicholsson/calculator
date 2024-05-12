const display = document.querySelector("#display");
const buttons = document.querySelectorAll('button');

let runningResult = 0;
let buffer = '0';
let operator = null;

buttons.forEach((button) =>{
    button.addEventListener('click', () => {
        buttonClick(button.textContent);
    })
})

/*
 *  Selecting all buttons and assigning to each button a function (buttonClick).
    This function has the goal to verify what kind of button is clicked and
    process it appropriately.
 * 
 */ 

function buttonClick(value){
    if (isNaN(value)){
        handleSymbol(value);
        
    }else {
        handleNumber(value);
        display.textContent = buffer;
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case 'AC':
            buffer = '0';
            runningResult = 0;
            operator = null;
            display.textContent = buffer;
            break;
        case 'C':
            if(buffer.length === 1){
                buffer = '0';
            }else {
                buffer = buffer.slice(0, (buffer.length - 1));
            }
            break;
        case '%':
            // TODO: need to think about this one
            break;
        case '.':
            // need to think about this one
            // TODO: use handleNumber logic and add if condition there
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
            if(operator === null){
                return
            } else {
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
    }else{
    // this case occurs when runningResult & operator have values and buffer is in input
        const floatBuffer = parseFloat(buffer);
        computeOperation(floatBuffer);
        display.textContent = runningResult;    
    }
    operator = symbol;
    buffer = '0';
}

function computeOperation(numb){
// this function is called when all operands are ready to perform a computation
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
    //TODO: ADD METHOD TO ROUND THE RESULT DOWN BELOW

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
