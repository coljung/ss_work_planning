import Handsontable from 'handsontable';

const leftBorderCols = [
    'stdpremarkdown',
    'feb1',
];

function cellValueRender(instance, td, row, col, prop, value, cellProperties) {
    cellProperties = {};

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

    Handsontable.renderers.NumericRenderer.apply(this, arguments);
    cellProperties.type = 'numeric';
    cellProperties.format = '$0,000';

    return td;
}

function cellValueRenderIncr(instance, td, row, col, prop, value, cellProperties) {
    cellProperties = {};

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
    Handsontable.renderers.NumericRenderer.apply(this, arguments);
    cellProperties.type = 'numeric';
    cellProperties.format = '0%';


    return td;
}
const columns = [
    {
        data: 'metric',
        type: 'text',
        editor: false,
    },
    {
        data: 'seasonyear',
        type: 'text',
        editor: false,
    },
    {
        data: 'stdpremarkdown',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        editor: false,
    },
    {
        data: 'incr_stdpremarkdown',
        renderer: cellValueRenderIncr,
        type: 'numeric',
        format: '0%',
        editor: false,
    },
    {
        data: 'stdpostmarkdown',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
        editor: false,
    },
    {
        data: 'incr_stdpostmarkdown',
        renderer: cellValueRenderIncr,
        type: 'numeric',
        format: '0%',
        editor: false,
    },
    {
        data: 'full',
        renderer: cellValueRender,
        type: 'numeric',
        format: '0%',
        editor: false,
    },
    {
        data: 'full_incr',
        renderer: cellValueRenderIncr,
        type: 'numeric',
        format: '0%',
        editor: false,
    },
    {
        data: 'feb1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'mar1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'apr1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'may1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'jun1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'jul1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'aug1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'sep1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'oct1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'nov1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'dec1',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'jan2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'feb2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'mar2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'apr2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'may2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'jun2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
    {
        data: 'jul2',
        renderer: cellValueRender,
        type: 'numeric',
        format: '$0,000',
    },
];

export default columns;
