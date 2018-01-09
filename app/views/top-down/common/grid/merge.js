const mergeMetrics = (startRow = 0, rowSpan, totalRows, totalCols, hasGap = false) => {
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

export default mergeMetrics;
