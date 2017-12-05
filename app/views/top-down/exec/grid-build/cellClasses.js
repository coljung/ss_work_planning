import Handsontable from 'handsontable';

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.background = '#DCDCDC';
    td.className += 'grey';
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

const cellClasses = (row, col, prop) => {
    // console.log(row, col, prop, instance);
    const cellProperties = {};
    // if (col === 2) {
    //     cellProperties.renderer = specialborder;
    // }
    // cellProperties.renderer = empty;
    // if (col === 2 || col === 8 || col === 15) {
    //     cellProperties.renderer = specialborder; // uses function directly
    // }
    // if ((row === 6 && col > 1) || (row === 12 && col > 1) || (row === 18 && col > 1)) {
    //     cellProperties.renderer = firstRowRenderer; // uses function directly
    // }
    // if (row < 2) {
    //     cellProperties.renderer = fakeHeaders; // uses function directly
    // }
    return cellProperties;
};

export default cellClasses;
