class Calculator {
    constructor (prevOperandText, currOperandText){
        this.prevOperandText = prevOperandText
        this.currOperandText = currOperandText
        this.clear()
    }

    // to clear all 
    clear () {
        this.prevOperand     = ''
        this.currOperand     = ''
        this.operation = undefined
    }

    //to delete a single one
    delete (){
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }

    //showing clicked number
    showNumber (number){
        if (number === '.' && this.currOperand.includes('.')) {
            console.error("it's allready include (.)");
        }else {
            this.currOperand = this.currOperand.toString() + number.toString()
        }
    }

    // selecting an operation
    choosenoOperation (operation){
        if (this.currOperand === '') return
        if (this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    //
    compute (){
        let computation
        const previous = parseFloat(this.prevOperand)
        const current = parseFloat(this.currOperand)

        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = previous + current
                break;

            case '-':
                computation = previous - current
                break;

            case '*':
                computation = previous * current
                break;

            case '÷':
                computation = previous / current
                break;
            default: 
                return
        }

        this.currOperand = computation
        this.operation = undefined
        this.prevOperand = ''

    }

    displayNum(number){
        const stringNum = number.toString()
        const integerDig = parseFloat(stringNum.split('.')[0])
        const decimalDig = stringNum.split('.')[1]

        let integerDisplay 
        if (isNaN(integerDig)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDig.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDig != null) {
            return `${integerDisplay}.${decimalDig}`
        } else {
            return integerDisplay
        }
    }

    // updating showing data
    updateScreen (){
        this.currOperandText.innerText = this.displayNum(this.currOperand) 
        if (this.operation != null) {
            this.prevOperandText.innerText = `${this.displayNum(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandText.innerText = ''
        }
    }
}


const numBtn = document.querySelectorAll("#num");
const operationBtn = document.querySelectorAll("#operation");
const equalBtn = document.querySelector("#equal");
const deleteBtn = document.querySelector("#delete");
const clearBtn = document.querySelector("#clear");
const prevOperandText = document.querySelector("#prev-operandText");
const currOperandText = document.querySelector("#curr-operandText");


const calculator = new Calculator(prevOperandText, currOperandText);

// numbers event
numBtn.forEach(btn => {
    btn.addEventListener ('click', () => {
        calculator.showNumber(btn.innerText)
        calculator.updateScreen()
    })
});


// operatin event
operationBtn.forEach(operation => {
    operation.addEventListener ('click', () => {
        calculator.choosenoOperation(operation.innerText)
        calculator.updateScreen()
    })
});


//equal event
equalBtn.addEventListener('click', btn => {
    calculator.compute()
    calculator.updateScreen()
})


//clear event
clearBtn.addEventListener('click', btn => {
    calculator.clear()
    calculator.updateScreen()
})


//Delete event
deleteBtn.addEventListener('click', btn => {
    calculator.delete()
    calculator.updateScreen()
})