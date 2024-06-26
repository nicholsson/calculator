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
        if(value === '0' && buffer === '0'){
            display.textContent = buffer;
            return;
        }else{
            handleNumber(value);
            display.textContent = buffer;
        }
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
                display.textContent = buffer;
            }
            break;
        case '±':
            let floatBuffer = parseFloat(buffer);
            floatBuffer = -floatBuffer;
            buffer = String(floatBuffer);
            display.textContent = buffer;
            break;
        case '.':
            if(buffer === '0'){
                buffer += symbol;
            }else{
                if(buffer.includes(symbol)){
                    return;
                }
                buffer += symbol;
            }
            display.textContent = buffer;
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
            if(operator === '÷' && buffer === '0'){
                warningDivision();
                return;
            }
            if(operator === null){
                return
            } else {
                computeOperation(parseFloat(buffer));
                roundResult();
                buffer = runningResult.toString();
                display.textContent = buffer;
                operator = null;
                runningResult = 0;
            }
            break;
    }
}

function handleMath(symbol){
    if(operator === null){
        runningResult = parseFloat(buffer);
    }else if(operator === '÷' && buffer === '0'){
        warningDivision();
        return;
    }else{
        const floatBuffer = parseFloat(buffer);
        computeOperation(floatBuffer);
        roundResult();
        display.textContent = runningResult;    
    }
    operator = symbol;
    buffer = '0';
}

function computeOperation(numb){
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

function warningDivision(){
    display.textContent = "Dividing by 0, use another number";
}

function roundResult(){
    runningResult = Math.round(runningResult * 1000) / 1000;
}