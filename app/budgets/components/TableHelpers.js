import i18n from 'i18next';

export const currencyFormat = (decimals = false) => ({
    pattern: decimals ? '$0,000.00' : '$0,000',
    culture: 'en-US',
});

export const percentageFormat = {
    pattern: '0%',
};

export const numericFormat = {
    pattern: '0',
};

export const borderLeft = (columns, prop, td) => {
    if (columns.indexOf(prop) !== -1) {
        td.className += ' leftCellBorder';
    }
};

export const borderBottom = (row, rowSpan, td) => {
    if ((row + 1) % rowSpan === 0) {
        td.className += ' bottomCellBorder';
    }
};

// grid color
export const gridColors = (dataRow, td) => {
    if (dataRow === 'wp') {
        td.className += ' wpActive';
    } else if (dataRow === 'achd') {
        td.className += ' actualActive';
    }
};

export const disableEdit = (instance, row, col) => {
    instance.setCellMeta(row, col, 'readOnly', true);
};

export const enableEdit = (instance, row, col) => {
    instance.setCellMeta(row, col, 'readOnly', false);
};

// showing N/A instead of error
export const emptyCell = (instance, td, row, col) => {
    td.innerHTML = i18n.t('notAvailable');
    td.className += ' cellNA';

    disableEdit(instance, row, col);

    return td;
};
