"use strict";

const baseURL = "http://localhost:9090";

const fetchData = async () => {
    const response = await fetch(`${baseURL}/task`);
    const data = await response.json();
    dataRender(data)
}
fetchData()

function dataRender(data = []) {
    data.length > 0 ? data.forEach((el, i) => {
        const tr = createElement('tr', 'item', `
        
        <td>${i + 1}</td>
        <td>${el.title}</td>
        <td>${el.description}</td>
        <td>${el.date}</td> 
        <td> <button class="btn btn-warning" data-edit="${el.id}">EDIT</button> </td>
        <td> <button class="btn btn-danger" data-del="${el.id}">DELETE</button> </td>
        
        `)
        $('#data').appendChild(tr)

    }) : $('#data').innerHTML = "NOT FOUND";
}


const addTask = () => {
    const taskTitle = $('#taskTitle').value.trim();
    const taskDesc = $('#taskDesc').value.trim();
    const taskDate = $('#taskDate').value.trim();

    if (taskTitle.length === 0 || taskDesc.length === 0 || taskDate.length === 0) {
        alert('Please fill in the task form')
    } {
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
    }

}

$('#add').addEventListener('submit', () => {
    addTask();
})