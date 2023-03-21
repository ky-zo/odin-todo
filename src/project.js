export default class Project {
    constructor(name, projectId = 0, deleted = false) {
        this.name = name
        this.projectId = projectId
        this.deleted = deleted
    }

    changeName(newName) {
        this.name = newName
    }

    delete() {
        if (this.projectId === 0) return
        this.deleted = true
    }
}

const projects = []

function newProject(name) {
    projects.push(new Project(name, projects.length))
    return projects
}

export { projects, newProject }
