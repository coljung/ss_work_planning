import i18n from 'i18next';

export const currencyFormat = (decimals = false) => ({
    pattern: {
        output: 'currency',
        mantissa: decimals ? 2 : 0,
        thousandSeparated: true,
    },
    culture: 'en-US',
});

export const percentageFormat = {
    pattern: {
        output: 'percent',
        mantissa: 0,
        spaceSeparated: true,
    },
};

export const numericFormat = {
    pattern: {
        output: 'number',
        mantissa: 0,
        spaceSeparated: true,
    },
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
