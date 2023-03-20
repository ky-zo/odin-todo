function filterBin(allItems) {
    return allItems.filter((element) => !element.bin)
}

function filterByProject(allItems, projectId) {
    return allItems.filter((element) => element.project === projectId)
}

export { filterBin, filterByProject }
