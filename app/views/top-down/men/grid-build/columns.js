import Handsontable from 'handsontable';

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

    // if (cellProperties.editor = true) {
    //   td.style.background = '#bada55';
    // }

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

    if (currentRowIntYear > currentYear) {
        cellProperties.editor = true;
        td.style.background = '#666';
        console.log(currentRowIntYear < currentYear);

        // console.log(row, col, value, cellProperties);
        console.log(currentRowIntYear, currentYear);
    } else {
      // console.log(currentRowIntYear < currentYear);
      // td.style.background = '#bada55';
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

    // if (cellProperties.editor = false) {
    //   td.style.background = '#bada55';
    // }

    if (leftBorderCols.indexOf(prop) !== -1) {
        // td.className += ' leftCellBorder';
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

    // cellProperties.type = 'numeric';
    // cellProperties.format = '$0,000';
    const currentRowYear = instance.getDataAtCell(row, 1);
    const currentRowIntYear = parseInt(currentRowYear.substr(-2), 10);

    if (currentRowIntYear > currentYear) {
        cellProperties.editor = true;
        td.style.background = '#666';
        console.log(currentRowIntYear < currentYear);

        // console.log(row, col, value, cellProperties);
        console.log(currentRowIntYear, currentYear);
    } else {
      // console.log(currentRowIntYear < currentYear);
      td.style.background = '#bada55';
    }

    Handsontable.renderers.NumericRenderer.apply(this, arguments);
    cellProperties.type = 'numeric';
    cellProperties.format = '0%';

    return td;
}
const columns = [
    {
        data: 'metric',
        type: 'text',
        // editor: false,
    },
    {
        data: 'seasonyear',
        type: 'text',
        // editor: false,
    },
    {
        data: 'stdpremarkdown',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        // editor: false,
        colWidths: 100,
    },
    {
        data: 'incr_stdpremarkdown',
        renderer: cellValueRenderIncr,
        type: 'numeric',
        format: '0%',
        // editor: false,
        colWidths: 100,
    },
    {
        data: 'stdpostmarkdown',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        // editor: false,
        colWidths: 100,
    },
    {
        data: 'incr_stdpostmarkdown',
        renderer: cellValueRenderIncr,
        type: 'numeric',
        format: '0%',
        // editor: false,
        colWidths: 100,
    },
    {
        data: 'full',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        // editor: false,
        colWidths: 100,
    },
    {
        data: 'full_incr',
        renderer: cellValueRenderIncr,
        type: 'numeric',
        format: '0%',
        // editor: false,
        colWidths: 100,
    },
    {
        data: 'previous',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'feb1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'mar1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'apr1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'may1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'jun1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'jul1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'aug1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'sep1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'oct1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'nov1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'dec1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'jan2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'feb2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'mar2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'apr2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'may2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'jun2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'jul2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
    {
        data: 'future',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        colWidths: 100,
    },
];

export default columns;
