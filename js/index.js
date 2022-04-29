const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNum(number) {
        if (number === "." && this.currentOperand.includes(".")) return
            this.currentOperand = this.currentOperand + number;
    }

    chooseOp(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand +" "+ operation;
        this.currentOperand = '';
    }

    getDisplayNumber(number) {
        const floatNumber = parseFloat(number);
        if (isNaN(floatNumber)) return '';
        return floatNumber.toLocaleString('en');
    }

    compute() {
        
        const prevNum = parseFloat(this.previousOperand);
        const currNum = parseFloat(this.currentOperand);
        
        if (isNaN(prevNum) || isNaN(currNum)) return

        if (this.operation === "+") {
            this.currentOperand = add(prevNum,currNum)
        } else if (this.operation === "-") {
            this.currentOperand = subtract(prevNum,currNum)
        } else if (this.operation === "*") {
            this.currentOperand = multiply(prevNum,currNum)
        // } else if (this.operation === "/" && this.currentOperand === "0") {
        //     this.currentOperand - "Can't Divide by 0 you Silly Goose!";
        } else if (this.operation === "/") {
            this.currentOperand = divide(prevNum, currNum)
        }

        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        if (this.currentOperand === '0' && this.operation === '/') {
            this.currentOperandText.innerText = "Can't Divide by 0 you Silly Goose!"; 
            this.previousOperandText.innerText = ''
        } else {
            this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand); 
            this.previousOperandText.innerText = this.getDisplayNumber(this.previousOperand);
        }
    }

}

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})