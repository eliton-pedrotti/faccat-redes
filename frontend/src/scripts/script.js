
window.onload = async (e) => {

    let inputValue = await get(1).then((res) => res.json());

    inputValue.forEach((item) => {

        let li = document.createElement("li");
        let t = document.createTextNode(item.description);
        li.appendChild(t)

        document.getElementById("myUL").appendChild(li);
        document.getElementById("myInput").value = "";

        let spanEdit = document.createElement("span");

        let iconEdit = document.createElement("i");
        iconEdit.className = "fas fa-edit"

        spanEdit.className = "closeSpanEdit";
        iconEdit.id = item.id;
        spanEdit.id = item.id;
        spanEdit.style = 'cursor:pointer;';
        spanEdit.appendChild(iconEdit);

        let span = document.createElement("span");

        let i = document.createElement("i");
        i.className = "fas fa-trash"

        span.className = "close";
        i.id = item.id;
        span.id = item.id;
        span.style = 'cursor:pointer;';
        span.appendChild(i);

        li.appendChild(span);
        li.appendChild(spanEdit)

        let close = document.getElementsByClassName('close')

        for (let i = 0; i < close.length; i++) {
            close[i].value = "anonymous function"
            close[i].onclick = async (e) => await deleteTask(e.target.id);
        }

        let closeSpanEdit = document.getElementsByClassName('closeSpanEdit')
        let modal = document.getElementById("myModal");
        let spanEditTask = document.getElementsByClassName("close-edit-task")[0];
        let saveEditTask = document.getElementsByClassName("save-edit-task");
        let editInput = document.getElementById("editInput");

        for (let i = 0; i < closeSpanEdit.length; i++) {
            closeSpanEdit[i].value = "anonymous function"
            closeSpanEdit[i].onclick = async (e) => {
                saveEditTask.id = e.target.id
                modal.style.display = "block";
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            };
        }

        for (let i = 0; i < saveEditTask.length; i++) {
            saveEditTask[i].onclick = async (e) => {
                let data = { description: editInput.value }
                await put(data, saveEditTask.id)
            }
        }

        spanEditTask.onclick = function () {
            modal.style.display = "none";
        }
    })
}

async function post(data, user_id) {
    return await fetch(`http://localhost:8000/create/task?user_id=${user_id}`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

async function get(user_id) {
    return await fetch(`http://localhost:8000/tasks?user_id=${user_id}`, {
        method: 'GET'
    });
}

async function del(task_id) {
    return await fetch(`http://localhost:8000/delete/task?task_id=${task_id}`, {
        method: "DELETE"
    });
}

async function put(data, task_id) {
    return await fetch(`http://localhost:8000/update/task?task_id=${task_id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

async function login() {
    event.preventDefault();

    let email = document.getElementById('email').value
    let senha = document.getElementById('password').value

    let userData = await fetch(`http://localhost:8000/login?email=${email}&password=${senha}`, {
        method: 'GET',
    })

    if (userData.statusText === 'OK') {
        window.location.href = './task.html'

    }

    alert('Email ou senha incorretos!')
}

async function deleteTask(task_id) {
    return await del(task_id);
}

/**Como eu vou pegar o id do usuario? Vamos deixar o valor 1 estatico? Provavelmente sim kk */
async function criaTask() {
    let inputValue = document.getElementById("myInput").value;
    if (inputValue === '') alert("Escreva uma tarefa antes!");
    let data = { description: inputValue }
    return await post(data, 1);
}

