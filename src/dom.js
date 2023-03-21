import { projects, newProject } from './project'
import { tasks, filterTasks, newTask } from './task'
import { filterDeleted } from './filtering'

let currentFilter = null

;(function getNewProject() {
    const form = document.querySelector('.new-project')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        updateProjects(filterDeleted(newProject(form.elements[0].value)))
    })
})()
;(function getNewTask() {
    const form = document.querySelector('.new-task')
    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const title = form.elements[0].value
        const description = form.elements[1].value
        const deadline = form.elements[2].value
        const priority = form.elements[3].value
        const project = parseFloat(form.elements[4].value)

        const updatedTaskArray = newTask(title, description, deadline, priority, project)

        if (typeof currentFilter === 'number') {
            const filteredTasks = filterTasks(currentFilter)
            updateTasks(filteredTasks)
        } else {
            updateTasks(updatedTaskArray)
        }
    })
})()

function updateProjects(projectsArray) {
    const projectList = document.querySelector('.projects')
    projectList.textContent = ''
    for (let i = 0; i < projectsArray.length; i++) {
        const projectItem = document.createElement('div')
        projectItem.classList.add('project-item')

        const singularProject = document.createElement('button')
        singularProject.textContent = `${projectsArray[i].name}`
        singularProject.classList.add('project-pick')
        singularProject.addEventListener('click', (event) => {
            currentFilter = projectsArray[i].projectId
            console.log(currentFilter)
            updateTasks(filterTasks(currentFilter))
        })

        projectItem.appendChild(singularProject)

        const singularProjectDelete = document.createElement('button')
        singularProjectDelete.innerHTML = '&times;'
        singularProjectDelete.addEventListener('click', (event) => {
            projects[projectsArray[i].projectId].delete()
            updateProjects(filterDeleted(projects))
        })
        projectItem.appendChild(singularProjectDelete)
        projectList.appendChild(projectItem)
    }
}

function updateTasks(tasksArray) {
    const taskList = document.querySelector('.tasks')
    taskList.textContent = ''
    for (let i = 0; i < tasksArray.length; i++) {
        const taskItem = document.createElement('div')
        taskItem.classList.add('task-item')

        taskItem.appendChild(createTaskCompleteCheckbox(i, tasksArray))

        const singularTask = document.createElement('div')
        singularTask.textContent = `Title: ${tasksArray[i].title} | Project: "${tasksArray[i].project}" |  Desc: ${tasksArray[i].description} | DDL: ${tasksArray[i].deadline} | Prio: ${tasksArray[i].priority}`

        taskItem.appendChild(createTaskItemDivs(i, tasksArray))
        taskList.appendChild(taskItem)
    }
}

function createTaskCompleteCheckbox(i, tasksArray) {
    const statusCheckbox = document.createElement('input')
    statusCheckbox.type = 'checkbox'
    statusCheckbox.id = 'TaskStatus'
    statusCheckbox.name = 'TaskStatus'
    statusCheckbox.checked = tasks[tasksArray[i].taskId].status
    statusCheckbox.addEventListener('change', (event) => {
        event.preventDefault()
        tasks[tasksArray[i].taskId].changeStatus()
        updateTasks(tasksArray)
    })
    return statusCheckbox
}

function createTaskItemDivs(i, tasksArray) {
    const taskTable = document.createElement('div')
    taskTable.classList.add('task-table')

    const taskTitle = document.createElement('div')
    taskTitle.classList.add('task-title')
    taskTitle.innerText = tasksArray[i].title

    const taskDeadline = document.createElement('div')
    const date = document.createElement('div')
    taskDeadline.classList.add('task-deadline')
    date.classList.add('task-date')
    date.innerText = tasksArray[i].deadline
    taskDeadline.appendChild(date)

    const taskPriority = document.createElement('div')
    taskPriority.innerText = tasksArray[i].priority

    const taskDescription = document.createElement('div')
    taskDescription.classList.add('task-description')
    taskDescription.innerText = tasksArray[i].description

    taskTable.appendChild(taskTitle)
    taskTable.appendChild(taskDeadline)
    taskTable.appendChild(taskPriority)
    taskTable.appendChild(taskDescription)

    return taskTable
}

export { updateProjects, updateTasks }
