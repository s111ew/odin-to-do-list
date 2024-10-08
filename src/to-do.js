import removeIconSvg from './images/cancel_button.svg';
import { currentProject, projects, repaintPage } from './index.js';
import * as utility from './utility.js'

export function createToDoElement(toDo) {
    const toDoGrid = document.querySelector(".to-do-grid");

    const toDoContainer = document.createElement("div");
    toDoContainer.classList.add("to-do");
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
    completeButton.addEventListener("click", () => {
        completeToDo(toDo)
    });
    
    toDoContainer.appendChild(completeButton);

    const toDoBody = document.createElement("div");
    toDoBody.classList.add("to-do-body");

    const toDoTitle = document.createElement("div");
    toDoTitle.classList.add("to-do-title");

    const toDoHeader = document.createElement("h3");
    toDoHeader.textContent = toDo["name"];

    toDoTitle.appendChild(toDoHeader);

    const removeIcon = document.createElement("img");
    removeIcon.alt = "Remove icon";
    removeIcon.src = removeIconSvg;
    removeIcon.addEventListener("click", () => {
        completeToDo(toDo)
})

    toDoTitle.appendChild(removeIcon);

    toDoBody.appendChild(toDoTitle);

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

export function emptyToDoNotice() {
    const toDoGrid = document.querySelector(".to-do-grid");

    const noToDos = document.createElement("div");
    noToDos.classList.add("no-to-dos");
    noToDos.textContent = "Click 'New' to add a new to-do for this project"

    toDoGrid.appendChild(noToDos);
}


export function completeToDo(toDo) {
    const currentToDoIndex = currentProject.currentP["toDo"].indexOf(toDo);
    const toDoNodeList = document.querySelectorAll(".to-do");

    toDoNodeList[currentToDoIndex].classList.add("fade-out");

    setTimeout(() => {
        currentProject.currentP["toDo"].splice(currentToDoIndex, 1);
        localStorage.setItem("storedProjects", JSON.stringify(projects));
        repaintPage();
    }, 450);
}