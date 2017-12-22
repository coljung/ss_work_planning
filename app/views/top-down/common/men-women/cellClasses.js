import Handsontable from 'handsontable';

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.background = '#eee';
    // td.className += 'grey';
    // td.className += 'blue';
}

function fakeHeaders(instance, td, row, col, prop, value, cellProperties) {
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
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.className += 'testborder';
}

const cellClasses = (row, col, prop) => {
    const cellProperties = {};

    
    // cellProperties.renderer = empty;
    // if (col === 2 || col === 8 || col === 15) {
    //     cellProperties.renderer = specialborder; // uses function directly
    // }
    // if ((row === 0 && col > 0) || (row === 5 && col > 1) || (row === 10 && col > 1)) {
        // cellProperties.renderer = firstRowRenderer; // uses function directly
    // }
    // if (row < 2) {
    //     cellProperties.renderer = fakeHeaders; // uses function directly
    // }
    return cellProperties;
};

export default cellClasses;
