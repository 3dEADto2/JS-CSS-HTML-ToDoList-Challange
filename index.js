const formInputEl = document.querySelector('.form-input');
const inputEl = document.querySelector('.input');
const mainConEl = document.querySelector('.main-container');
const list = JSON.parse(localStorage.getItem('list'));

if (list.length > 0) {
    for (el of list) {
        createToDoEl(el);
    }    
}


formInputEl.addEventListener('submit', (event) => {
    event.preventDefault();
    createToDoEl();
});

function createToDoEl(object) {
    let newTask = inputEl.value;

    if (object) {
        newTask = object['name'];
    }

    const divEl = document.createElement('div');
    divEl.classList.add('task-container');
    divEl.innerHTML = `
        <h4>${newTask}</h4>
        <div class="task-icon-container">
            <form class="form-checkbox">
                <input class="checkbox" type="checkbox">
            </form>
            <img src="/JS-CSS-HTML-ToDoList-Challange/files/trashIcon.svg" alt="icon">
        </div>
    `;

    if (object && object['checked']) {
        divEl.classList.add('checked');
        divEl.querySelector('.checkbox').checked = true;
    }    

    mainConEl.appendChild(divEl);

    const checkbox = divEl.querySelector('.checkbox');
    checkbox.addEventListener('click', () => {
        if (checkbox.checked) {
            divEl.classList.add('checked');
        } else {
            divEl.classList.remove('checked');  
        }
        updateLocalStorage();
    });

    const trashEl = divEl.querySelector('img');
    trashEl.addEventListener('click', () => {
        divEl.remove();
        updateLocalStorage();
    });

    updateLocalStorage();
    inputEl.value = '';
}

function updateLocalStorage () {
    const divEls = document.querySelectorAll('.task-container');
    const list = [];
    for (el of divEls) {
        list.push({
            name: el.querySelector('h4').innerText,
            checked: el.classList.contains('checked')
        });
    }

    localStorage.setItem('list', JSON.stringify(list));
}
