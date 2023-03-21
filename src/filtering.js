function filterDeleted(allItems) {
    return allItems.filter((element) => !element.deleted)
}

function filterOnlyDeleted(allItems) {
    return allItems.filter((element) => element.deleted)
}

function filterByProject(allItems, projectId) {
    return allItems.filter((element) => element.project === projectId)
}

function filterIncomplete(allItems) {
    return allItems.filter((element) => element.status === false)
}

function filterCompleted(allItems) {
    return allItems.filter((element) => element.status === true)
}

export { filterDeleted, filterByProject, filterCompleted, filterIncomplete, filterOnlyDeleted }
