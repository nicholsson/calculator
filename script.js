const numbers = document.querySelector("#numbers");
// create the 4 rows
for (let row = 1; row <= 4; row++) {
    const numbersRow = document.createElement("div");
    numbersRow.classList.add("numbersRow");
    numbers.appendChild(numbersRow);
    for (let num = 0; num <= 2; num++) {
        const number = document.createElement("button");
        number.classList.add("number");
        numbersRow.appendChild(number);
    }
}
