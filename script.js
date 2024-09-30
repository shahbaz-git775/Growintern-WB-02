// Get elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let displayValue = '0';
let operator = null;
let firstOperand = null;
let secondOperand = false;

// Function to update display
function updateDisplay() {
    display.textContent = displayValue;
}

// Function to handle button clicks
function handleButtonClick(value) {
    if (!isNaN(value)) {
        handleNumber(value);
    } else {
        handleOperator(value);
    }
    updateDisplay();
}

// Handle number input
function handleNumber(number) {
    if (displayValue === '0' || secondOperand) {
        displayValue = number;
        secondOperand = false;
    } else {
        displayValue += number;
    }
}

// Handle operator input
function handleOperator(op) {
    switch (op) {
        case 'C':
            displayValue = '0';
            operator = null;
            firstOperand = null;
            break;
        case '⌫':
            displayValue = displayValue.slice(0, -1) || '0';
            break;
        case '.':
            if (!displayValue.includes('.')) {
                displayValue += '.';
            }
            break;
        case '=':
            if (operator) {
                calculate();
                operator = null;
            }
            break;
        default:
            if (!operator) {
                firstOperand = parseFloat(displayValue);
                operator = op;
                secondOperand = true;
            } else if (secondOperand) {
                operator = op;
            } else {
                calculate();
                operator = op;
                secondOperand = true;
            }
    }
}

// Perform calculation
function calculate() {
    const secondValue = parseFloat(displayValue);
    switch (operator) {
        case '+':
            displayValue = (firstOperand + secondValue).toString();
            break;
        case '−':
            displayValue = (firstOperand - secondValue).toString();
            break;
        case '×':
            displayValue = (firstOperand * secondValue).toString();
            break;
        case '÷':
            displayValue = (firstOperand / secondValue).toString();
            break;
    }
    firstOperand = parseFloat(displayValue);
}

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.textContent);
        button.style.animation = 'buttonClick 0.1s ease';
        setTimeout(() => button.style.animation = '', 100);
    });
});
