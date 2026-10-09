const currentOperand = document.getElementById("currentOperand");
const previousOperand = document.getElementById("previousOperand");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operation]");

const clearButton = document.querySelector("[data-action='clear']");
const deleteButton = document.querySelector("[data-action='delete']");
const equalsButton = document.querySelector("[data-action='equals']");
const percentButton = document.querySelector("[data-action='percent']");

let currentNumber = "";
let previousNumber = "";
let operation = undefined;


numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        addNumber(number);

        updateDisplay();
    });

});


operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        chooseOperation(button.dataset.operation);

        updateDisplay();
    });

});

function addNumber(number) {

    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    // Prevent unnecessary leading zeros
    if (currentNumber === "0" && number !== ".") {
        if (number === "00") {
            return;
        }
        currentNumber = number;
        return;
    }

    currentNumber += number;
}


function chooseOperation(selectedOperation) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber === "" && previousNumber !== "") {
        operation = selectedOperation;
        return;
    }

    if (previousNumber !== "") {
        calculate();
    }

    operation = selectedOperation;

    previousNumber = currentNumber;

    currentNumber = "";
}


function calculate() {

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }

    let result;

    switch (operation) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "×":
            result = previous * current;
            break;

        case "÷":

            if (current === 0) {
                currentNumber = "Error";
                previousNumber = "";
                operation = undefined;
                return;
            }

            result = previous / current;
            break;

        default:
            return;
    }

    currentNumber = formatNumber(result);

    previousNumber = "";
    operation = undefined;
}


equalsButton.addEventListener("click", () => {

    if (currentNumber === "" || previousNumber === "") {
        return;
    }

    calculate();

    updateDisplay();

});

clearButton.addEventListener("click", () => {

    currentNumber = "";
    previousNumber = "";
    operation = undefined;

    updateDisplay();

});


deleteButton.addEventListener("click", () => {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();

});


percentButton.addEventListener("click", () => {

    if (currentNumber === "") {
        return;
    }

    currentNumber = String(
        parseFloat(currentNumber) / 100
    );

    updateDisplay();

})

function updateDisplay() {

    currentOperand.textContent =
        currentNumber || "0";

    if (previousNumber !== "" && operation) {

        previousOperand.textContent =
            `${previousNumber} ${operation}`;

    } else {

        previousOperand.textContent = "";

    }
}


function formatNumber(number) {

    if (!Number.isFinite(number)) {
        return "Error";
    }

    return Number(
        number.toFixed(10)
    ).toString();
}