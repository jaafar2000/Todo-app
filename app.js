let todoInput = document.querySelector(".todo-input");
let todoButtton = document.querySelector(".todo-button");
let todoList = document.querySelector(".todo-list");
let filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButtton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  let newTodo = document.createElement("li");
  newTodo.innerHTML = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  savaLocalTodos(todoInput.value);

  let completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  let trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  let item = e.target;
  if (item.classList[0] === "trash-btn") {
    let todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
      removeLocalTodo(todo);
    });
  } else if (item.classList[0] === "complete-btn") {
    let todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  let todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function savaLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    let newTodo = document.createElement("li");
    newTodo.innerHTML = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    let completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    let trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}
function removeLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
