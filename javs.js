// Load tasks from localStorage on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    createTask(task.text, task.completed);
  });
  updateTaskCount();
};

function addTask() {
  const input = document.getElementById("taskip");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  createTask(taskText, false); // default: not completed
  input.value = "";

  saveTasks();
  updateTaskCount();
}

// Create a task (used by both addTask and load)
function createTask(taskText, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;

  const btnDiv = document.createElement("div");
  btnDiv.className = "task-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.className = "complete-btn";
  completeBtn.onclick = function () {
    li.classList.toggle("completed");
    saveTasks();
    updateTaskCount();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = function () {
    li.remove();
    saveTasks();
    updateTaskCount();
  };

  btnDiv.appendChild(completeBtn);
  btnDiv.appendChild(deleteBtn);

  li.appendChild(taskSpan);
  li.appendChild(btnDiv);

  document.getElementById("list").appendChild(li);
}

// Save all tasks to localStorage
function saveTasks() {
  const tasks = [];
  const allTasks = document.querySelectorAll("#list li");
  allTasks.forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update task count
function updateTaskCount() {
  const allTasks = document.querySelectorAll("#list li");
  const completedTasks = document.querySelectorAll("#list li.completed");
  document.getElementById("completedCount").textContent = completedTasks.length;
  document.getElementById("notCompletedCount").textContent = allTasks.length - completedTasks.length;
}

// Add task with Enter key
document.getElementById("taskip").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
