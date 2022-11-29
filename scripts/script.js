"use strict";

let error = `<i class="bi bi-x-octagon text-white fs-3"></i>`;
let warning = `<i class="bi bi-exclamation-circle text-dark fs-3"></i>`;
let success = `<i class="bi bi-check-circle text-white fs-3"></i>`;

const baseURL = "http://localhost:7070";

// ================== FETCH ALL DATA FUNCTION start ============== //

const fetchData = async () => {
    const response = await fetch(`${baseURL}/task`);
    const data = await response.json();
    dataRender(data)
}
fetchData()

// ================== FETCH ALL DATA FUNCTION end ============== //


// ================== RENDER DATA start ===================== //

function dataRender(data = []) {
    data.length > 0 ? data.forEach((el, i) => {
        const tr = createElement('tr', 'item', `
        
        <td>${i + 1}</td>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.date}</td> 
        <td> <button class="btn btn-warning editData" data-edit="${el.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">EDIT</button> </td>
        <td> <button class="btn btn-danger editDanger" data-del="${el.id}">DELETE</button> </td>
        
        `)
        $('#data').appendChild(tr)

    }) : $('#data').innerHTML = "NOT FOUND";
}

// ================== RENDER DATA end ===================== //


// ================= ADD TASK FUNCTION start ================= //

const addTask = () => {
    const taskTitle = $('#taskTitle').value.trim();
    const taskDesc = $('#taskDesc').value.trim();
    const taskDate = $('#taskDate').value.trim();

    if (taskTitle.length === 0 || taskDesc.length === 0 || taskDate.length === 0) {
        toastifyFunc(error, "Please fill form elements", "crimson")
    } else {

        toastifyFunc(success, "successfully added new task", "seagreen")

        setTimeout(() => {
            fetch(`${baseURL}/task`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": taskTitle,
                    "description": taskDesc,
                    "date": taskDate
                },)
            })
        }, 2000)
    }

}

$('#add').addEventListener('submit', () => {
    addTask();
})

// ================= ADD TASK FUNCTION end ================= //


// =================     FUNCTION start ================== //

$('#data').addEventListener("click", (e) => {

    if (e.target.classList.contains("editData")) {
        let editID = e.target.getAttribute("data-edit");
        sendModal(editID)
    }

    if (e.target.classList.contains("editDanger")) {
        let delID = e.target.getAttribute("data-del");
        deleteTask(delID)
    }

});


async function sendModal(id) {
    localStorage.setItem('editID', id);
    const response = await fetch(`${baseURL}/task/${id}`);
    const result = await response.json();

    const { title, description, date } = result;

    $('#editTitle').value = title;
    $('#editDesc').value = description;
    $('#editDate').value = date;

}

// =================     FUNCTION end ================== //


// ==================== EDIT DATA start ==================== //

$('#edit').addEventListener('submit', (e) => {
    e.preventDefault();

    let id = localStorage.getItem('editID');

    const taskTitle = $('#editTitle').value.trim();
    const taskDesc = $('#editDesc').value.trim();
    const taskDate = $('#editDate').value.trim();

    if (taskTitle.length === 0 || taskDesc.length === 0 || taskDate.length === 0) {
        alert('Please fill in the task form')
    } {
        fetch(`${baseURL}/task/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": taskTitle,
                "description": taskDesc,
                "date": taskDate
            },)
        })
    }

})

// ==================== EDIT DATA end ==================== //


// =============== DELETE TASK FUNCTION start ============= //

function deleteTask(id) {

    toastifyFunc(error, "Task successfully deleted", "seagreen")

    setTimeout(() => {

        $('.toastify').classList.add('hide-toastify')

        fetch(`${baseURL}/task/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({})
        });
    }, 2000)
}

// =============== DELETE TASK FUNCTION end ============= //
