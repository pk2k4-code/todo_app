const addTaskButton = document.getElementById("add-task-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// we take up an array for storing the tasks that the user will give
let tasks = [];

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
    todoInput.value = ""; // we clear the input field after adding the task
    console.log(tasks);
})