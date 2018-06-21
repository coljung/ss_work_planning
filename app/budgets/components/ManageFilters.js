const filters = (configData) => {
    const tempTree = [];
    const tempCheckedKeys = [];
    configData.forEach((e) => {
        const createEntry = {};
        createEntry.title = e;
        createEntry.key = e.toLowerCase();
        tempTree.push(createEntry);
        tempCheckedKeys.push(createEntry.key);
    });
    const filterObj = {};
    filterObj.available_metrics = tempTree;
    filterObj.checkedKeys = tempCheckedKeys;

    return filterObj;
};

export default filters;
