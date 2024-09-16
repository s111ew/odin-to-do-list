import { projects } from "./index.js";
import { repaintPage } from "./index.js";
import * as utils from "./utility.js"
import { currentProject } from "./index.js";

export function renderNewToDoInput() {
    const toDoGrid = document.querySelector(".to-do-grid")

    const ntdContainer = document.createElement("div");
    ntdContainer.classList.add("to-do");
    ntdContainer.classList.add("new-to-do");

    const ntdInputContainer = document.createElement("div");
    ntdInputContainer.classList.add("input-container");

    const ntdTitleInput = document.createElement("input");
    ntdTitleInput.type = "text";
    ntdTitleInput.placeholder = "New To-Do Title";
    ntdTitleInput.id = "new-to-do-title";

    ntdInputContainer.appendChild(ntdTitleInput);

    const ntdDueInput = document.createElement("input");
    ntdDueInput.type = "text";
    ntdDueInput.id = "new-to-do-due-date"
    ntdDueInput.placeholder = "Due Date";
    ntdDueInput.onfocus = function() {
        this.type = 'date';
    };
    ntdDueInput.onblur = function() {
        this.type = 'text';
    };

    ntdInputContainer.appendChild(ntdDueInput);

    const ntdDescInput = document.createElement("input");
    ntdDescInput.type = "text";
    ntdDescInput.id = "new-to-do-desc"
    ntdDescInput.placeholder = "New To-Do Description";

    ntdInputContainer.appendChild(ntdDescInput);

    const ntdPriorityInput = document.createElement("select");
    ntdPriorityInput.id = "new-to-do-priority";
    
    const ntdPriorityInputPlaceholder = document.createElement("option");
    ntdPriorityInputPlaceholder.value = "";
    ntdPriorityInputPlaceholder.disabled = true;
    ntdPriorityInputPlaceholder.selected = true;
    ntdPriorityInputPlaceholder.textContent = "Select Priority";

    ntdPriorityInput.appendChild(ntdPriorityInputPlaceholder);

    const ntdPriorityInputUrgent = document.createElement("option");
    ntdPriorityInputUrgent.value = "urgent";
    ntdPriorityInputUrgent.textContent = "Urgent";

    ntdPriorityInput.appendChild(ntdPriorityInputUrgent);

    const ntdPriorityInputModerate = document.createElement("option");
    ntdPriorityInputModerate.value = "moderate";
    ntdPriorityInputModerate.textContent = "Moderate";

    ntdPriorityInput.appendChild(ntdPriorityInputModerate);

    const ntdPriorityInputLow = document.createElement("option");
    ntdPriorityInputLow.value = "low";
    ntdPriorityInputLow.textContent = "Low";

    ntdPriorityInput.appendChild(ntdPriorityInputLow);

    ntdInputContainer.appendChild(ntdPriorityInput);

    ntdContainer.appendChild(ntdInputContainer);

    const ntdButtonContainer = document.createElement("div");
    ntdButtonContainer.classList.add("button-container");

    const ntdCancelButton = document.createElement("div");
    ntdCancelButton.classList.add("pill");
    ntdCancelButton.classList.add("cancel-button");
    ntdCancelButton.textContent = "Cancel";
    ntdCancelButton.addEventListener("click", removeNewToDoInput)

    ntdButtonContainer.appendChild(ntdCancelButton);

    const ntdAddButton = document.createElement("div");
    ntdAddButton.classList.add("pill");
    ntdAddButton.classList.add("add-button");
    ntdAddButton.textContent = "Add";
    ntdAddButton.addEventListener("click", addNewToDo);

    ntdButtonContainer.appendChild(ntdAddButton);

    ntdContainer.appendChild(ntdButtonContainer);

    toDoGrid.insertBefore(ntdContainer, toDoGrid.firstChild)
}

export function removeNewToDoInput() {
    let ntdInput = document.querySelector(".new-to-do");

    if (ntdInput) {
        ntdInput.remove();
    }
}

export function addNewToDo() {
    const ntdInputTitle = document.querySelector("#new-to-do-title");
    const ntdInputDesc = document.querySelector("#new-to-do-desc");
    const ntdInputDueDate = document.querySelector("#new-to-do-due-date");
    const ntdInputPriority = document.querySelector("#new-to-do-priority");

    if (ntdInputTitle.value && ntdInputDesc.value && ntdInputDueDate.value && ntdInputPriority.value) {
        pushNewToDo(ntdInputTitle.value, ntdInputDesc.value, ntdInputDueDate.value, ntdInputPriority.value);
        removeNewToDoInput();
        repaintPage();
    }
}

export function pushNewToDo(title, desc, dueDate, priority) {
    const newToDo = createNewToDo(title, desc, dueDate, priority);
    currentProject.currentP.toDo.unshift(newToDo);
}

export function createNewToDo(title, desc, dueDate, priority) {
    let priorityValue;

    if (priority === 'urgent') {
        priorityValue = 3;
    } else if (priority === 'moderate') {
        priorityValue = 2;
    } else if (priority === 'low') {
        priorityValue = 1;
    } else {
        priorityValue = 0;
    }

    return {
        "name": title,
        "description": desc,
        "due": dueDate,
        "priority": priorityValue
    };
}
