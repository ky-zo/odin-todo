import { projects, newProject } from './project'
import { tasks, newTask } from './task'
import { tempProjects, tempTasks } from './index.js'

;(function getNewProject() {
    const form = document.querySelector('.new-project')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        newProject(form.elements[0].value)
        tempProjects.push(projects[projects.length - 1])
        showProjects(tempProjects)
    })
})()
;(function getNewTask() {
    const form = document.querySelector('.new-task')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const title = form.elements[0].value
        const desc = form.elements[1].value
        const deadline = form.elements[2].value
        const priority = form.elements[3].value
        newTask(title, desc, deadline, priority)
        console.log(form)
        tempTasks.push(tasks[tasks.length - 1])
        showTasks(tempTasks)
    })
})()

function showProjects(projectsArray) {
    const projects = document.querySelector('.projects')
    projects.textContent = ''
    for (let i = 0; i < projectsArray.length; i++) {
        const proj = document.createElement('div')
        proj.textContent = `${projectsArray[i].projectId} ${projectsArray[i].name}`
        projects.appendChild(proj)
    }
}

function showTasks(tasksArray) {
    const projects = document.querySelector('.tasks')
    projects.textContent = ''
    for (let i = 0; i < tasksArray.length; i++) {
        const proj = document.createElement('div')
        proj.textContent = `ID: ${tasksArray[i].taskId} | Title: ${tasksArray[i].title} | Project: "${tasksArray[i].project}" |  Desc: ${tasksArray[i].desc} | DDL: ${tasksArray[i].deadline} | Prio: ${tasksArray[i].priority} | Status: ${tasksArray[i].status}`
        projects.appendChild(proj)
    }
}

export { showProjects, showTasks }
