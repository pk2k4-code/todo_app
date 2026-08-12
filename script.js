document.addEventListener("DOMContentLoaded", () => {
const addTaskButton = document.getElementById("add-task-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// we take up an array for storing the tasks that the user will give
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // we try to get the tasks from local storage, if there are none, we initialize it as an empty array

tasks.forEach((task) => renderTask(task)); // as soon as the page loads every task that is in the local storage is rendered on the page

addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();    // trim is used to remove whitespace from both ends of a string
    if(taskText === "") return; // if the input is empty, we don't add a task

    // now we create a new task object with several properties so that we can manage it later (like marking it as completed, deleting it, etc.)
    const newTask = {
        id: Date.now(), // unique id for the task
        text: taskText,
        isCompleted: false
    }
    tasks.push(newTask); // we add the new task to the tasks array
    saveTasks(); // we save the tasks array to local storage
    renderTask(newTask); // we render the new task on the page
    todoInput.value = ""; // we clear the input field after adding the task
    console.log(tasks);
})

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks)); // we save the tasks array to local storage as a JSON string
}

function renderTask(task) {
    const li = document.createElement("li"); // we create a new list item element
    li.setAttribute("data-id", task.id); // we set a data attribute with the task's id for later reference
    if(task.isCompleted) li.classList.add("completed"); // if the task is completed, we add a class to the list item for styling
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;
    li.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON") return; // if the delete button is clicked, we don't want to mark the task as completed
        task.isCompleted = !task.isCompleted; // we toggle the completed status of the task
        li.classList.toggle("completed"); // we toggle the completed class on the list item for styling
        saveTasks(); // we save the updated tasks array to local storage
    })

    // query selector is another way to select elements in the DOM, it allows us to select elements using CSS selectors, like classes(.class), ids(#id), or attributes. In this case, we are selecting the button element that is a child of the list item (li) we just created.
    li.querySelector("button").addEventListener("click", (e) => {   // here we used query selector and nt getElementById because we want to select the button that is a child of the list item (li) we just created, and not any other button in the DOM. If we used getElementById, it would select the first button it finds in the DOM, which is not what we want.
        e.stopPropagation(); // we prevent the click event from bubbling up to the list item
        tasks = tasks.filter((t) => t.id !== task.id); // we remove the task from the tasks array
        saveTasks(); // we save the updated tasks array to local storage
        // instead of below code we could just remove the li element from the DOM, but we are re-rendering the whole list so that we can see clearly what element got deleted without the need of refreshing the page.
        todoList.innerHTML = ""; // we clear the todo list
        tasks.forEach((t) => renderTask(t)); // we re-render the tasks on the page
    });
    todoList.appendChild(li); // we append the new list item to the todo list
}
})