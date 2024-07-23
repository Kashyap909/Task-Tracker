// Add a new task.
let taskInput = document.getElementById("new-task");

// first button
let addButton = document.getElementsByTagName("button")[0];

// incomplete-tasks
let incompleteTaskHolder = document.getElementById("incomplete-tasks");

// completed-tasks
let completedTasksHolder = document.getElementById("completed-tasks");

// function to create a new task item
let createNewTaskElement = function (taskString) {

	let listItem = document.createElement("li");
	let checkBox = document.createElement("input");
	let label = document.createElement("label");
	let editInput = document.createElement("input");
	let editButton = document.createElement("button");
	let deleteButton = document.createElement("button");

	label.innerText = taskString;

	checkBox.type = "checkbox";
	editInput.type = "text";


	editButton.innerText = "Edit";
	editButton.className = "edit";
	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";


	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
}


let addTask = function () {

	let listItem = createNewTaskElement(taskInput.value);

	if (taskInput.value === "") {
		return;
	}

	// Append listItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";

}

let editTask = function () {
	let listItem = this.parentNode;

	let editInput = listItem.querySelector('input[type=text]');
	let label = listItem.querySelector("label");
	let containsClass = listItem.classList.contains("editMode");

	if (containsClass) {
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}
	listItem.classList.toggle("editMode");
}

let deleteTask = function () {

	let listItem = this.parentNode;
	let ul = listItem.parentNode;

  ul.removeChild(listItem);

}


let taskCompleted = function () {

	let listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}

let taskIncomplete = function () {

  let listItem = this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

}

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {

	let checkBox = taskListItem.querySelector("input[type=checkbox]");
	let editButton = taskListItem.querySelector("button.edit");
	let deleteButton = taskListItem.querySelector("button.delete");

	editButton.onclick = editTask;
	deleteButton.onclick = deleteTask;
	checkBox.onchange = checkBoxEventHandler;
}

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {

  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

// Cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {

  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
