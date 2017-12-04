export default function getApiUrl() {
    return `http://${process.env.UI_PLANNING_HOST}:${process.env.UI_PLANNING_PORT}/api/`;
}


export const mergeMetrics = (startRow = 0, rowSpan, totalRows, totalCols, hasGap = false) => {
    const mergeArr = [];

    // span between metrics
    const metricSpan = hasGap ? rowSpan + 1 : rowSpan;

    // span between gaps
    const emptyRowSpan = hasGap ? rowSpan : null;


    for (let i = startRow; i < totalRows; ++i) {
        if (i % metricSpan === 0) {
            mergeArr.push({
                row: i + startRow,
                col: 0,
                rowspan: rowSpan,
                colspan: 1,
            });
            if (hasGap) {
                mergeArr.push({
                    row: i - 1,
                    col: 0,
                    rowspan: 1,
                    colspan: totalCols,
                });
            }
        }
    }

    return mergeArr;
};


export const mergeHeadersExecRecap = () => {
    const mergeArr = [
        { row: 0, col: 0, rowspan: 1, colspan: 2 },
        { row: 0, col: 2, rowspan: 1, colspan: 6 },
        { row: 0, col: 8, rowspan: 1, colspan: 7 },
        { row: 0, col: 15, rowspan: 1, colspan: 7 },
    ];
    return mergeArr;
};
