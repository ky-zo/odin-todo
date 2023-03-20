import './styles.css'
import Task, { tasks, newTask } from './task'
import Project, { projects, newProject } from './project'
import { showProjects, showTasks, getNewProject, getNewTask } from './dom.js'
import { filterBin, filterByProject } from './filtering.js'

let tempProjects = []
let tempTasks = []

newTask('Do Laundry', 'Wash and dry towels', '03/22/2023', '3', 1)
newTask('Do some Work', 'Send follow-up email to client', '03/23/2023', '2', 1)
newTask('Iron', 'Iron dress shirts', '03/24/2023', '4')
newTask('Meeting', 'Create presentation for team meeting', '03/25/2023', '5', 1)
newTask('Do fold away', 'Fold and put away clean laundry', '03/26/2023', '2', 0)
newTask('Review', 'Review project progress with team members', '03/28/2023', '3', 1)
newTask('title', 'desc', 'ddl', 'prio', 0)

newProject('Errands')
newProject('Work')
newProject('School')
newProject('Home')

projects[3].delete()
tasks[2].delete()

tempProjects = filterBin(projects)
showProjects(tempProjects)

tempTasks = filterBin(tasks)
showTasks(tempTasks)

export { tempProjects, tempTasks }
