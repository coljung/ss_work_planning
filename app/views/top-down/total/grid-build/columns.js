import Handsontable from 'handsontable';

const columns = (month, season) => {
    const leftBorderCols = [
        'stdpremarkdown',
        'previous',
    ];

    const currentYear = parseInt(new Date().getFullYear().toString().substr(-2), 10);

    function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
        // console.log(instance);
        cellProperties = {};
        // const currentRowYear = instance.getDataAtCell(row, 1);
        // const currentRowIntYear = parseInt(currentRowYear.substr(-2), 10);

        if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
          td.style.background = '#eee';
        }

        if (leftBorderCols.indexOf(prop) !== -1) {
            td.className += ' leftCellBorder';
        }

        const rowSpan = 5;
        if ((row + 1) % rowSpan === 0) {
            td.className += ' bottomCellBorder';
        }
        if (isNaN(value)) {
            cellProperties.type = 'text';
            td.innerHTML = 'N/A';
            td.className += ' cellNA';
            return td;
        }

        cellProperties.type = 'numeric';
        cellProperties.format = '$0,000';
        const currentRowYear = instance.getDataAtCell(row, 1);
        const currentRowIntYear = parseInt(currentRowYear.substr(-2), 10);
        const currentColMonth = instance.getDataAtCell(1, col);

        if (currentRowIntYear < currentYear) {
          instance.setCellMeta(row, col, 'readOnly', true);
          // console.log(instance.getDataAtCell(0, col));
        }

        // console.log(cellProperties);

            Handsontable.renderers.NumericRenderer.apply(this, arguments);
        return cellProperties;
    }

    function cellValueRenderIncr(instance, td, row, col, prop, value, cellProperties) {
        cellProperties = {};

        if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
          td.style.background = '#eee';
        }

        if (leftBorderCols.indexOf(prop) !== -1) {
            td.className += ' leftCellBorder';
        }

        const rowSpan = 5;
        if ((row + 1) % rowSpan === 0) {
            td.className += ' bottomCellBorder';
        }
        if (isNaN(value)) {
            cellProperties.type = 'text';
            td.innerHTML = 'N/A';
            td.className += ' cellNA';
            return td;
        }
        cellProperties.type = 'numeric';
        cellProperties.format = '$0,000';
        const currentRowYear = instance.getDataAtCell(row, 1);
        const currentRowIntYear = parseInt(currentRowYear.substr(-2), 10);

        if (currentRowIntYear < currentYear) {
            instance.setCellMeta(row, col, 'readOnly', true);
        }

        Handsontable.renderers.NumericRenderer.apply(this, arguments);
        cellProperties.type = 'numeric';
        cellProperties.format = '0%';

        return td;
    }

    const commonColums = [
        {
            data: 'metric',
            type: 'text',
            readOnly: true,
        },
        {
            data: 'seasonyear',
            type: 'text',
            readOnly: true,
        },
        {
            data: 'stdpremarkdown',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'incr_stdpremarkdown',
            renderer: cellValueRenderIncr,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'stdpostmarkdown',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'incr_stdpostmarkdown',
            renderer: cellValueRenderIncr,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'full',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'full_incr',
            renderer: cellValueRenderIncr,
            type: 'numeric',
            format: '0%',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'previous',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            colWidths: 100,
        },
    ];

    const SS = [
        {
            data: 'aug0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'sep0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'oct0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'nov0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'dec0',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jan1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'feb1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'mar1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'apr1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'may1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jun1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jul1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'aug1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'sep1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'oct1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'nov1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'dec1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jan2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'future',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
    ];

    const FW = [
        {
            data: 'feb1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'mar1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'apr1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'may1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jun1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jul1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'aug1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'sep1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'oct1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'nov1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'dec1',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jan2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'feb2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'mar2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'apr2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'may2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jun2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'jul2',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
        {
            data: 'future',
            renderer: cellValueRender,
            type: 'numeric',
            format: '$0,000',
            readOnly: true,
            colWidths: 100,
        },
    ];

    const SSData = commonColums.concat(SS);
    const FWData = commonColums.concat(FW);

    const test = [SSData, FWData];
    return test;
};

export default columns;
