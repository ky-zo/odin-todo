import { projects, newProject } from './project'
import { tasks, filterTasks, newTask } from './task'
import { filterDeleted, filterCompleted, filterIncomplete, filterOnlyDeleted } from './filtering'

let currentFilter = null

;(function getNewProject() {
    const form = document.querySelector('.new-project')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const newProjectsArray = newProject(form.elements[0].value)
        updateProjects(filterDeleted(newProjectsArray))
        localStorage.setItem('projects', newProjectsArray)
        console.log(localStorage.getItem('projects'))
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
        localStorage.setItem('tesks', updatedTaskArray)

        if (typeof currentFilter === 'number') {
            const filteredTasks = filterTasks(currentFilter)
            updateTasks(filterDeleted(filteredTasks))
        } else {
            updateTasks(filterDeleted(updatedTaskArray))
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
            updateTasks(filterDeleted(filterIncomplete(filterTasks(currentFilter))))
            document.querySelector('#header-content').innerText = `🚀 ${projectsArray[i].name} Tasks`
            document.querySelector('#taskProject').value = projectsArray[i].projectId
        })

        projectItem.appendChild(singularProject)

        const singularProjectDelete = document.createElement('button')
        singularProjectDelete.innerHTML = '&times;'
        singularProjectDelete.addEventListener('click', (event) => {
            projects[projectsArray[i].projectId].delete()
            updateProjects(filterDeleted(projects))
            localStorage.setItem('projects', projects)
            console.log(localStorage.getItem('projects'))
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
        taskItem.appendChild(createTaskDeleteButton(i, tasksArray))

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
        updateTasks(filterDeleted(tasksArray))
    })
    return statusCheckbox
}

function createTaskDeleteButton(i, tasksArray) {
    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.innerHTML = '&times;'
    deleteButton.id = 'TaskDelete'
    deleteButton.name = 'TaskDelete'
    deleteButton.checked = tasks[tasksArray[i].taskId].status
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault()
        tasks[tasksArray[i].taskId].delete()
        console.log(`${tasks[tasksArray[i].taskId]}deleted`)
        updateTasks(filterDeleted(tasksArray))
    })
    return deleteButton
}

function createTaskItemDivs(i, tasksArray) {
    const taskTable = document.createElement('div')
    taskTable.classList.add('task-table')

    const taskTitle = document.createElement('div')
    taskTitle.classList.add('task-title')
    taskTitle.innerText = tasksArray[i].title

    const taskProperties = document.createElement('div')
    const date = document.createElement('div')
    taskProperties.classList.add('task-properties')
    date.classList.add('task-date')
    date.innerText = tasksArray[i].deadline
    if (date.innerText !== '') {
        taskProperties.appendChild(date)
    }

    const taskPriority = document.createElement('div')
    taskPriority.classList.add('task-priority')
    taskPriority.innerText = convertTasksPriority(tasksArray[i].priority)
    if (taskPriority.innerText !== '') {
        taskProperties.appendChild(taskPriority)
    }

    const taskDescription = document.createElement('div')
    taskDescription.classList.add('task-description')
    taskDescription.innerText = tasksArray[i].description

    taskTable.appendChild(taskTitle)
    taskTable.appendChild(taskProperties)
    taskTable.appendChild(taskDescription)

    return taskTable
}

// function showDescriptionOnHover() {
//     const
// }

;(function showAllTasks() {
    const allTasksButton = document.querySelector('#all-tasks')
    allTasksButton.addEventListener('click', (e) => {
        updateTasks(filterDeleted(tasks))
        document.querySelector('#header-content').innerText = '📬 All Tasks'
    })
})()
;(function showCompleted() {
    const completedTasksButton = document.querySelector('#completed-tasks')
    completedTasksButton.addEventListener('click', (e) => {
        updateTasks(filterCompleted(filterDeleted(tasks)))
        document.querySelector('#header-content').innerText = '✅ Completed Tasks'
    })
})()
;(function showIncomplete() {
    const scheduledTasksButton = document.querySelector('#scheduled-tasks')
    scheduledTasksButton.addEventListener('click', (e) => {
        updateTasks(filterIncomplete(filterDeleted(tasks)))
        document.querySelector('#header-content').innerText = '📆 Scheduled Tasks'
    })
})()

// ;(function showDeleted() {
//     const deletedTasksButton = document.querySelector('#deleted-tasks')
//     deletedTasksButton.addEventListener('click', (e) => {
//         updateTasks(filterOnlyDeleted(tasks))
//         document.querySelector('#header-content').innerText = '🗑️ Deleted Tasks'
//     })
// })()

function convertTasksPriority(priorityNumber) {
    switch (priorityNumber) {
        case '5':
            return '🔥 Ultra'
        case '4':
            return '🔴 High'
        case '3':
            return '🟠 Medium'
        case '2':
            return '🟡 Low'
        case '1':
            return '🟢 Someday'
        default:
            return null
    }
}

console.log(convertTasksPriority(2))

export { updateProjects, updateTasks }
