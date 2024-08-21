import editIconSvg from './images/edit.svg';

import * as utility from './utility.js'

export function createToDoElement(toDo) {
    const toDoGrid = document.querySelector(".to-do-grid");

    const toDoContainer = document.createElement("div");
    toDoContainer.classList.add("to-do");
    //refactor as utility function
     switch (toDo["priority"]) {
        case 1:
            toDoContainer.classList.add("low");
            break;
        case 2:
            toDoContainer.classList.add("moderate");
            break;
        case 3:
            toDoContainer.classList.add("urgent");
            break;
     }
    
    const completeButton = document.createElement("div");
    completeButton.classList.add("complete-button");
    
    toDoContainer.appendChild(completeButton);

    const toDoBody = document.createElement("div");
    toDoBody.classList.add("to-do-body");

    const toDoTitle = document.createElement("div");
    toDoTitle.classList.add("to-do-title");

    const toDoHeader = document.createElement("h3");
    toDoHeader.textContent = toDo["name"];

    toDoTitle.appendChild(toDoHeader);

    const editIcon = document.createElement("img");
    editIcon.alt = "Edit icon";
    editIcon.src = editIconSvg;

    toDoTitle.appendChild(editIcon);

    toDoBody.appendChild(toDoTitle);

    toDoContainer.appendChild(toDoBody);

     const toDoDescription = document.createElement("p");
     toDoDescription.textContent = toDo["description"];

     toDoBody.appendChild(toDoDescription);

     const toDoExtras = document.createElement("div");
     toDoExtras.classList.add("to-do-extras");

     const dueDate = document.createElement("span");
     dueDate.textContent = `Due: ${toDo["due"]}`;

     toDoExtras.appendChild(dueDate);

     const priority = document.createElement("span");
     priority.textContent = `Priority: ${utility.parsePriority(toDo)}`

     toDoExtras.appendChild(priority);

     toDoBody.appendChild(toDoExtras);

     toDoContainer.appendChild(toDoBody);

     toDoGrid.appendChild(toDoContainer);
}