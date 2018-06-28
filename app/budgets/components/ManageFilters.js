const filterData = (configData) => {
    const tempTree = [];
    const tempCheckedKeys = [];
    configData.available_metrics.forEach((e) => {
        const createEntry = {};
        createEntry.title = e;
        createEntry.key = e;
        // pending ms-planning ticket for metrics to not be case sensitive
        // createEntry.key = e.toLowerCase();
        tempTree.push(createEntry);
        tempCheckedKeys.push(createEntry.key);
    });
    const filterObj = {};
    filterObj.available_metrics = tempTree;
    filterObj.checkedKeys = tempCheckedKeys;

    return filterObj;
};

export default filterData;
