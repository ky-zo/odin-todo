export default class Task {
    constructor(taskId, title, description, deadline, priority, project = 0, status = false, deleted = false) {
        this.taskId = taskId
        this.title = title
        this.description = description
        this.deadline = deadline
        this.priority = priority
        this.project === null ? (this.project = 0) : (this.project = project)
        this.status = status
        this.deleted = deleted
    }

    changeProject(newProject) {
        this.project = newProject
    }

    changeStatus() {
        this.status = !this.status
    }

    changeTitle(newTitle) {
        this.title = newTitle
    }

    changeDesc(newDesc) {
        this.description = newDesc
    }

    changeDeadline(newDeadline) {
        this.deadline = newDeadline
    }

    changePriority(newPriority) {
        this.priority = newPriority
    }

    delete() {
        this.deleted = true
    }
}

const tasks = []

function newTask(title, description, deadline, priority, project = 0, status = false, deleted = false) {
    tasks.push(new Task(tasks.length, title, description, deadline, priority, project, status, deleted))
    return tasks
}

function filterTasks(selectedProjectFilter) {
    return tasks.filter((task) => task.project === selectedProjectFilter)
}

export { tasks, newTask, filterTasks }
