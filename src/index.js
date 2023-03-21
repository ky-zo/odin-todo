import './styles.css'
import { tasks, newTask } from './task'
import { projects, newProject } from './project'
import { getNewTask, updateProjects, updateTasks } from './dom.js'
import { filterDeleted, filterByProject } from './filtering.js'

newTask('Do Laundry', 'Wash and dry towels', '03/22/2023', '3', 1)
newTask('Do some Work', 'Send follow-up email to client', '03/23/2023', '2', 1)
newTask('Iron', 'Iron dress shirts', '03/24/2023', '4')
newTask('Meeting', 'Create presentation for team meeting', '03/25/2023', '5', 1)
newTask('Do fold away', 'Fold and put away clean laundry', '03/26/2023', '2', 0)
newTask(
    'Review',
    'Review project progress with team members. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis corporis voluptate est quos, optio quia aspernatur ea officiis praesentium iure!',
    '03/28/2023',
    '3',
    1
)
newTask('title', 'desc', 'ddl', 'prio', 0)
newTask('Meeting', 'Create presentation for team meeting', '03/25/2023', '5', 3)
newTask('Do fold away', 'Fold and put away clean laundry', '03/26/2023', '2', 4)
newTask('Review', 'Review project progress with team members', '03/28/2023', '3', 5)
newTask('title', 'desc', 'ddl', 'prio', 6)

newProject('Default')
newProject('Work')
newProject('School')
newProject('Home')
newProject('Errands')
tasks[1].delete()

updateProjects(filterDeleted(projects))
updateTasks(tasks)

export { tasks }
