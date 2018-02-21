const customBorders = (startRow = 0, rowSpan, totalRows, totalCols, sample) => {
    const customBorderArr = [];
    // debugger;
    for (let i = startRow; i < totalRows; ++i) {
        if (i % rowSpan === 0) {
            customBorderArr.push({
                range: {
                    from: {
                        row: i,
                        col: 0,
                    },
                    to: {
                        row: i,
                        col: totalCols - 1,
                    },
                },
                top: {
                    width: 1,
                    color: '#5292F7',
                },
            });
        }
    }

    // for (let i = 0; i < totalCols; ++i) {
    //     if (i % rowSpan === 0) {
    //         customBorderArr.push({
    //             range: {
    //                 from: {
    //                     row: i,
    //                     col: 0,
    //                 },
    //                 to: {
    //                     row: i,
    //                     col: totalCols - 1,
    //                 },
    //             },
    //             top: {
    //                 width: 1,
    //                 color: '#5292F7',
    //             },
    //         });
    //     }
    // }

    return customBorderArr;
};

export default customBorders;

// [{
//     range: {
//         from: {
//             row: 5,
//             col: 1,
//         },
//         to: {
//             row: 5,
//             col: 20,
//         },
//     },
//     top: {
//         width: 1,
//         color: '#5292F7',
//     },
// }]
