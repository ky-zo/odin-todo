export default class Project {
    constructor(name, projectId = 0, bin = false) {
        this.name = name
        this.projectId = projectId
        this.bin = bin
    }

    changeName(newName) {
        this.name = newName
    }

    delete() {
        this.bin = true
    }
}

const projects = []

function newProject(name) {
    projects.push(new Project(name, projects.length))
}

export { projects, newProject }
