function filterDeleted(allItems) {
    return allItems.filter((element) => !element.deleted)
}

function filterByProject(allItems, projectId) {
    return allItems.filter((element) => element.project === projectId)
}

export { filterDeleted, filterByProject }
