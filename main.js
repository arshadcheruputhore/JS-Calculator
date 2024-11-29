const inputField = document.getElementById('textField');
inputField.addEventListener('cut', (e) => e.preventDefault());
inputField.addEventListener('paste', (e) => e.preventDefault());


let result = 0;
let preOpr = '';
textField.value = '0';
const operators = ['+', '-', '×', '÷'];

const showData = (data) => {
    textField.style.fontWeight = 'normal';

    if (operators.includes(preOpr) && operators.includes(data)) {
        return;
    }
    if (textField.value === '0' && !operators.includes(data)) {
        textField.value = data;
    }
    else if (operators.includes(data)) {
        result = 0;
        textField.value += data;
        preOpr = data;
    }
    else if (result && !operators.includes(data)) {
        result = 0;
        textField.value = data;
        preOpr = '';
    }
    else {
    result = 0;
    textField.value += data;
    preOpr = operators.includes(data) ? data : '';
    }
    clrBtn.innerText = "C";
}

const removeAllData = () => {
    textField.style.fontWeight = 'normal';
    textField.value = "0";
    clrBtn.innerText = "AC";
    result = 0;
    preOpr = '';
}

const removeLastData = () => {
    if (textField.value !== '0') {
        if (result || textField.value === 'Malformed Expression') {
            textField.style.fontWeight = 'normal';
            result = 0;
            textField.value = "0";
            clrBtn.innerText = "AC";
        }
        else{
            if (preOpr) preOpr = '';
    
            textField.value = textField.value.slice(0, -1);
            
            if (!textField.value) {
                textField.value = '0';
                clrBtn.innerText = "AC";
                
            }
        }
    }
}

const showEval = () => {
    if (textField.value !== 'Malformed Expression') {
        let expression = textField.value.replace(/×/g, '*').replace(/÷/g, '/');

        try {
            result = eval(expression);
            textField.style.fontWeight = 'bold';

            textField.value = result;
        } catch (error) {
            textField.value = 'Malformed Expression';
        }
    }
}

const showRemain = () => {
    if (!preOpr) {
        if (!operators.some(opr => textField.value.includes(opr))) {
            result = parseFloat(textField.value / 100);
            textField.value = result;
            result = 0;
        }
        else {
            let lastOptrIndex = -1;
            let lastOptr = '';
            let percentRes = 0;
    
            for (const opr of operators) {
                let index = textField.value.lastIndexOf(opr);
                if (index > lastOptrIndex) {
                    lastOptrIndex = index;
                    lastOptr = opr;
                }
            }

            let expression = textField.value.replace(/×/g, '*').replace(/÷/g, '/');

            if (lastOptr === "+" || lastOptr === '-') {
                const NumBfr = eval(expression.slice(0, lastOptrIndex));
                const numAfr = parseFloat(expression.slice(lastOptrIndex));
            
    
                // const percent = parseFloat(((numAfr / 100) * NumBfr).toFixed(1));
                percentRes = parseFloat(((numAfr / 100) * NumBfr + NumBfr));
            }
            else {

                let regExp = /[+\-*/]/g;
    
                let operatorMatches = [...expression.matchAll(regExp)];

                if (operatorMatches.length < 2) {
                    const Oneopr = operatorMatches[0].index;                    
                    const NumBfr = expression.slice(0, Oneopr + 1);
                    const numAfr = eval(expression.slice(Oneopr + 1) / 100);
                    percentRes = parseFloat(eval(NumBfr + numAfr));
                    // console.log(percentRes);
                }
                else {
                    let secondLastOprIndex = operatorMatches[operatorMatches.length - 2].index;
                    
                    const NumBfr = eval(expression.slice(0, secondLastOprIndex));
                    const numAfr = (eval(expression.slice(secondLastOprIndex)) * 100);
                    
                    percentRes = parseFloat((NumBfr + numAfr));

                    // console.log(NumBfr, numAfr, expression);
                }
            }
    
            textField.value = percentRes;
            textField.style.fontWeight = 'bold';
    
        }
    }
}
