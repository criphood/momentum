import { state } from './settings.js';

const openButton = document.querySelector('.todo-opener'),
    containerTodo = document.querySelector('.container-todo'),
    closeButton = containerTodo.querySelector('.todo-closer'),
    todoHeader = containerTodo.querySelector('.todo-header-name'),
    todoList = containerTodo.querySelector('.todo-list'),
    newTodo = containerTodo.querySelector('.todo-add'),
    deleteButtons = containerTodo.getElementsByClassName('todo-delete'),
    editButtons = containerTodo.getElementsByClassName('todo-edit'),
    checkboxes = containerTodo.getElementsByClassName('checkbox');


if (localStorage.getItem('todo') !== null) {
    todoList.innerHTML = localStorage.getItem('todo');
}

newTodo.addEventListener('keydown', (e) => {
    if (e.keyCode === 13 && newTodo.value) {
        todoList.innerHTML += `
            <li>
                <div class="todo-item">
                    <input type="checkbox" class="checkbox">
                    <input type="text" class="todo-name" value="${newTodo.value}" readonly>
                </div>
                <div class="todo-options">
                    <svg class="todo-edit" height="20px" width="20px" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M36.108,110.473l70.436-70.436L87.963,21.457L17.526,91.893c-0.378,0.302-0.671,0.716-0.803,1.22   l-5.476,20.803c-0.01,0.04-0.01,0.082-0.019,0.121c-0.018,0.082-0.029,0.162-0.039,0.247c-0.007,0.075-0.009,0.147-0.009,0.222   c-0.001,0.077,0.001,0.147,0.009,0.225c0.01,0.084,0.021,0.166,0.039,0.246c0.008,0.04,0.008,0.082,0.019,0.121   c0.007,0.029,0.021,0.055,0.031,0.083c0.023,0.078,0.053,0.154,0.086,0.23c0.029,0.067,0.057,0.134,0.09,0.196   c0.037,0.066,0.077,0.127,0.121,0.189c0.041,0.063,0.083,0.126,0.13,0.184c0.047,0.059,0.1,0.109,0.152,0.162   c0.053,0.054,0.105,0.105,0.163,0.152c0.056,0.048,0.119,0.09,0.182,0.131c0.063,0.043,0.124,0.084,0.192,0.12   c0.062,0.033,0.128,0.062,0.195,0.09c0.076,0.033,0.151,0.063,0.23,0.087c0.028,0.009,0.054,0.023,0.083,0.031   c0.04,0.01,0.081,0.01,0.121,0.02c0.081,0.017,0.162,0.028,0.246,0.037c0.077,0.009,0.148,0.011,0.224,0.01   c0.075,0,0.147-0.001,0.223-0.008c0.084-0.011,0.166-0.022,0.247-0.039c0.04-0.01,0.082-0.01,0.121-0.02l20.804-5.475   C35.393,111.146,35.808,110.853,36.108,110.473z M19.651,108.349c-0.535-0.535-1.267-0.746-1.964-0.649l3.183-12.094l11.526,11.525   L20.3,110.313C20.398,109.616,20.188,108.884,19.651,108.349z" fill:#2F3435/>
                        <path d="M109.702,36.879l-18.58-18.581l7.117-7.117c0,0,12.656,4.514,18.58,18.582L109.702,36.879z" fill:#2F3435/></g>
                    </svg>
                    <svg class="todo-delete" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve">
                        <path id="XMLID_781_" fill="#3A4047" d="M13,0H3C1.3,0,0,1.3,0,3v10c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3V3C16,1.3,14.7,0,13,0z
                                M12.7,11.3l-1.4,1.4L8,9.4l-3.3,3.3l-1.4-1.4L6.6,8L3.3,4.7l1.4-1.4L8,6.6l3.3-3.3l1.4,1.4L9.4,8L12.7,11.3z" />
                    </svg>
                </div>
            </li>
        `;

        newTodo.value = '';

        editTodoList();
    }
});

editTodoList();

openButton.addEventListener('click', () => {
    if (containerTodo.matches('.show-todo')) {
        hideTodo();
    } else {
        showTodo();
    }
});

closeButton.addEventListener('click', () => {
    hideTodo();
});

function showTodo() {
    containerTodo.classList.remove('close-todo');
    containerTodo.classList.add('show-todo');
}

function hideTodo() {
    containerTodo.classList.remove('show-todo');
    containerTodo.classList.add('close-todo');
}

function editTodoList() {
    const listItems = Array.from(todoList.getElementsByTagName('li'));

    listItems.forEach((item, i) => {
        let itemTodo = item.children[0];
        let itemName = itemTodo.children[1];

        checkboxes[i].onclick = () => {
            if (checkboxes[i].checked) {
                itemName.removeAttribute('readonly');
                itemName.classList.add('checked');
                checkboxes[i].setAttribute('checked', true);
            } else {
                itemName.classList.remove('checked');
                checkboxes[i].removeAttribute('checked');
            }
            setTodo();
        }
        deleteButtons[i].onclick = () => {
            item.remove();
            setTodo();
        }
        editButtons[i].onclick = () => {
            itemName.removeAttribute('readonly');
            itemName.focus();
            itemName.selectionStart = itemName.value.length;
        }
        itemName.addEventListener('change', () => {
            itemTodo.innerHTML = `
                <input type="checkbox" class="checkbox">
                <input type="text" class="todo-name" value="${itemName.value}" readonly>
            `;
            editTodoList();
        });
        setTodo();
    });
}

function setTodo() {
    localStorage.setItem('todo', todoList.innerHTML);
}

function translateTodo() {
    if (state.language === 'ru') {
        openButton.textContent = 'Менеджер задач';
        todoHeader.textContent = 'Список дел';
        newTodo.placeholder = 'Новая задача';
    } else {
        openButton.textContent = 'ToDo';
        todoHeader.textContent = 'Todo list';
        newTodo.placeholder = 'New Todo';
    }
}

export { translateTodo, containerTodo }










