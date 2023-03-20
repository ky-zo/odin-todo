export default class Task {
    constructor(taskId, title, desc, deadline, priority, project = 0, status = false, bin = false) {
        this.taskId = taskId
        this.title = title
        this.desc = desc
        this.deadline = deadline
        this.priority = priority
        this.project = project
        this.status = status
        this.bin = bin
    }

    changeProject(newProject) {
        this.project = newProject
    }

    changeStatus() {
        this.status === false ? (this.status = true) : (this.status = false)
    }

    changeTitle(newTitle) {
        this.title = newTitle
    }

    changeDesc(newDesc) {
        this.desc = newDesc
    }

    changeDeadline(newDeadline) {
        this.deadline = newDeadline
    }

    changePriority(newPriority) {
        this.priority = newPriority
    }

    delete() {
        this.bin = true
    }
}

const tasks = []

function newTask(title, desc, deadline, priority, project = 0, status = false, bin = false) {
    tasks.push(new Task(tasks.length, title, desc, deadline, priority, project, status, bin))
}

export { tasks, newTask }
