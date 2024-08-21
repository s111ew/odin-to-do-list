const PRIORITY_URGENT = 3;

export function countUrgentTasks(toDos) {
    return toDos.reduce((count, toDo) => {
        return count + (toDo.priority === PRIORITY_URGENT ? 1 : 0);
    }, 0);
}

export function parsePriority(toDo) {
    switch (toDo["priority"]) {
        case 1:
            return "Low"
            break;
        case 2:
            return "Moderate"
            break;
        case 3:
            return "Urgent"
            break;
     }
}