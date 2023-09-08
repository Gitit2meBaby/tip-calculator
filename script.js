const billInput = document.querySelector('#bill');
const peopleNumberInput = document.querySelector('#peopleNumber');
const customButton = document.querySelector('#custom');
const tipPerPersonOutput = document.querySelector('#tipPerPerson');
const totalOutput = document.querySelector('#total');
const resetButton = document.querySelector('#reset');
const percentageButtons = document.querySelectorAll('.percentage-button');

// ASSIGNING THE PERCENTAGE BUTTON VALUES
function buttonValue() {
    const activeButton = document.querySelector('.percentage-button.active');
    if (activeButton) {
        return parseFloat(activeButton.dataset.num);
    } else if (customButton.value) {
        return parseFloat(customButton.value);
    } else {
        return 0;
    }
}

// CALCULATE FUNCTION
function calculate() {
    const billInputValue = parseFloat(billInput.value);
    const tipPercentage = buttonValue();
    const people = parseFloat(peopleNumberInput.value);
    let tipAmount = 0;
    let total = 0;

    if (billInputValue && tipPercentage && people) {
        tipAmount = (billInputValue * tipPercentage) / 100;
        total = (billInputValue + tipAmount) / people;
    }
    tipPerPersonOutput.textContent = `$${tipAmount.toFixed(2)}`;
    totalOutput.textContent = `$${total.toFixed(2)}`;
    resetButton.style.opacity = 1
}

// ERRORS 
function error() {
    const errorDiv = document.querySelector('.title-container')
    const errorMessage = document.createElement('p')
    errorMessage.classList.add('error')
    errorMessage.textContent = "Can't be zero"
    errorDiv.appendChild(errorMessage)
    peopleNumberInput.style.border = "2px solid red"

    peopleNumberInput.addEventListener('click', () => {
        errorDiv.removeChild(errorMessage)
        peopleNumberInput.style.border = "none"

    })
}

// EVENT LISTENERS
const buttonGrid = document.querySelector('.button-grid');
const allButtons = document.querySelectorAll('.percentage-button');

buttonGrid.addEventListener('click', function (event) {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('percentage-button')) {
        allButtons.forEach(button => button.classList.remove('active'));
        clickedButton.classList.add('active');
    }
    calculate()
});

// CUSTOM TIP AMOUNT
customButton.addEventListener('input', () => {
    customButton.placeholder = ''
    const customValue = customButton.value;
    customButton.dataset.num = customValue;
    buttonValue()
    calculate()
})

// DISPLAY CALCULATION
billInput.addEventListener('input', calculate);
peopleNumberInput.addEventListener('input', calculate);

// RESET
function reset() {
    if (peopleNumberInput.value === '') {
        if (!document.querySelector('.title-container .error')) {
            error();
        }
    } else {
        billInput.value = '';
        allButtons.forEach(button => button.classList.remove('active'));
        peopleNumberInput.value = '';
        customButton.value = '';
        customButton.placeholder = 'Custom';
        tipPerPersonOutput.textContent = '$0.00';
        totalOutput.textContent = '$0.00';
    }
}

