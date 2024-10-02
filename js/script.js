import {
  addTaskContainer,
  addTaskCover,
  addCover,
  addTaskInput,
  addTaskForm,
  taskListElement,
  noTask,
  searchInput,
  searchForm,
} from "./selectors.js";

import { Task } from "./classes.js";

/******************************
 *         Variáveis          *
 ******************************/

let tasksList = [];
let id = Date.now();

/******************************
 *          Funções           *
 ******************************/

function generateNewId() {
  return (id = Date.now());
}

function addTask(title) {
  const newTask = new Task(title, generateNewId());
  tasksList.unshift(newTask);
  verifyList();
}

function removeTask(taskId) {
  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i].id == taskId) {
      tasksList.splice(i, 1);
      renderTasks();
    }
  }
  verifyList();
}

function completeTask(taskId) {
  for (let i = 0; i < tasksList.length; i++) {
    const task = tasksList[i];
    if (task.id == taskId) {
      task.isCompleted = !task.isCompleted;
      renderTasks();
    }
  }
}

function renderTasks() {
  const searchInputValue = searchInput.value.toLocaleLowerCase();

  if (searchInputValue) {
    const newTasksList = tasksList.filter((task) => task.title.toLocaleLowerCase().includes(searchInputValue));
    console.log(newTasksList);
    handleTasks(newTasksList);
  } else {
    console.log(tasksList);
    handleTasks();
  }
}

function verifyList() {
  if (tasksList.length > 0) {
    noTask.style.display = "none";
  } else {
    noTask.style.display = "flex";
  }
}

function createTaskElement(title, id) {
  const li = document.createElement("li");
  li.className = "task";
  li.id = id;
  li.addEventListener("click", () => {
    completeTask(id);
  });

  const p = document.createElement("p");
  p.className = "title";
  p.textContent = title;

  const div = document.createElement("div");
  div.className = "task-btn";

  const deleteSpan = document.createElement("span");
  deleteSpan.className = "material-symbols-outlined delete cursor no-select";
  deleteSpan.textContent = "delete";
  deleteSpan.addEventListener("click", (e) => {
    const task = e.target.closest("li");
    removeTask(task.id);
  });

  div.appendChild(deleteSpan);
  li.appendChild(p);
  li.appendChild(div);

  return li;
}

function handleTasks(taskList = tasksList) {
  taskListElement.textContent = "";

  taskList.map((task) => {
    const taskVerify = createTaskElement(task.title, task.id);
    if (task.isCompleted) {
      taskVerify.classList.add("completed");
    } else {
      taskVerify.classList.remove("completed");
    }
    taskListElement.appendChild(taskVerify);
  });
}

function toggleAddCover() {
  addTaskCover.classList.toggle("hidden");
  addTaskInput.value = "";
  searchInput.value = "";
  addTaskInput.focus();
}

/******************************
 *          Eventos           *
 ******************************/

addTaskContainer.addEventListener("click", toggleAddCover);

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = addTaskInput.value;

  if (title) {
    addTask(title);
    renderTasks();
    toggleAddCover();
  }
});

searchForm.addEventListener("keyup", () => {
  renderTasks();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
