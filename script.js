const form = document.querySelector('.validator');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let send = true;

    const inputs = form.querySelectorAll('input');

    clearErrors();

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const check = checkInput(input);

        if (check !== true) {
            send = false;

            showError(input, check);

        }
    }

    if (send) {
        form.submit();
    }
})

function checkInput(input) {
    let rules = input.getAttribute('data-rules')

    if (rules !== null) {
        rules = rules.split('|');

        for (let k in rules) {
            const details = rules[k].split('=');

            switch (details[0]) {
                case 'required':
                    if (input.value == '') {
                        return 'Campo não pode ser vazio.';
                    }
                    break;

                case 'min':
                    if(input.value.length < details[1]) {
                        return `O campo tem que ter pelo menos ${details[1]}caracteres.`
                    }  
                    break;

                case 'email':
                    if(input.value != ''){
                        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ ;
                        if(!regex.test(input.value.toLowerCase())){
                            return 'E-mail digitado não é válido!';
                        }
                    }    
            }
        }
    }

    return true;
}

function showError(input, error) {
    input.style.borderColor = '#ff0000';

    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error

    input.parentElement.insertBefore(errorElement, input.elementSibling);

}

function clearErrors() {
    const inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style = '';
    }

    const errorElements = document.querySelectorAll('.error');

    for (let i = 0; i < errorElements.length; i++) {
        errorElements[i].remove();
    }
}