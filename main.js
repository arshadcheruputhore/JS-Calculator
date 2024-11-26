let result = 0;
textField.value = '0';

const showData = (data) => {
    if (textField.value === '0' && data !== '+' && data !== '-' && data !== '%' && data !== '/' && data !== 'x') {
        textField.value = '';
    }
    else if (!result && data === '+' && data === '-' && data === '/' && data === 'x') {
        textField.value += data;
    }
    else if (result && data !== '+' && data !== '-' && data !== '%' && data !== '/' && data !== 'x') {
        textField.value = "";
        result = 0;
    }

    result = 0;
    textField.value += data;
    clrBtn.innerText = "C";
}

const removeAllData = () => {
    textField.value = "0";
    clrBtn.innerText = "AC";
    result = 0;
}

const removeLastData = () => {
    textField.value = textField.value.slice(0, -1);
}

const showEval = () => {
    const expression = textField.value.replace(/x/g, '*');

    try {
        result = eval(expression);
        textField.value = result;
    } catch (error) {
        textField.value = 'Error';
    }
    
}