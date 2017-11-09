import Handsontable from 'handsontable';

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    // console.log('-2B-: firstRowRenderer', row, col);
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.background = '#DCDCDC';
    // console.log('1', td);
    td.className += 'grey';
}

function fakeHeaders(instance, td, row, col, prop, value, cellProperties) {
    // console.log('-3B-: fakeHeaders', row, col);
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.className += 'headerCell';
}

function empty(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    if (!value || value === '' || value == null) {
        td.innerHTML = '--';
    }
}

function specialborder(instance, td, row, col, prop, value, cellProperties) {
    // console.log('-1B-: specialborder', row, col);
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    // console.log('2', td);
    td.className += 'testborder';
}

const cellClasses = (row, col, prop) => {
    const cellProperties = {};
    cellProperties.renderer = empty;
    if (col === 2 || col === 8 || col === 15) {
        // console.log('1A-: specialborder', row, col);
        cellProperties.renderer = specialborder; // uses function directly
    }
    if ((row === 6 && col > 1) || (row === 12 && col > 1) || (row === 18 && col > 1)) {
        // console.log('2A-: firstRowRenderer', row, col);
        cellProperties.renderer = firstRowRenderer; // uses function directly
    }
    if (row < 2) {
        // console.log('3A-: fakeHeaders', row, col);
        cellProperties.renderer = fakeHeaders; // uses function directly
    }
    return cellProperties;
};

export default cellClasses;
