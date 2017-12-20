import React, { Component } from 'react';
import HotTable from 'react-handsontable';
import Handsontable  from 'handsontable';
import { data } from './test';

const columns = [
    {
        type: 'numeric'
    },
    {
        type: 'numeric',
        format: '$0,0.00',
        language: 'en-US', // this is the default locale, set up for USD
    },
    {
        type: 'numeric',
        format: '$0,0.00',
        language: 'en-US', // this is the default locale, set up for USD
    },
    {
        type: 'numeric',
        format: '$0,0.00',
        language: 'en-US', // this is the default locale, set up for USD
    },
    {
        type: 'numeric',
        format: '$0,0.00',
        language: 'en-US', // this is the default locale, set up for USD
    },
];

// WITHOUT THE EMPTY CELLS HACK
// const merge = [
//     {row: 2, col: 0, rowspan: 5, colspan: 1},
//     {row: 7, col: 0, rowspan: 5, colspan: 1},
//     {row: 12, col: 0, rowspan: 5, colspan: 1},

//     {row: 0, col: 2, rowspan: 1, colspan: 4},
//     {row: 0, col: 6, rowspan: 1, colspan: 4},
//     {row: 0, col: 10, rowspan: 1, colspan: 4},
// ];

const merge = [
    {row: 2, col: 0, rowspan: 5, colspan: 1},
    {row: 8, col: 0, rowspan: 5, colspan: 1},
    {row: 14, col: 0, rowspan: 5, colspan: 1},

    {row: 0, col: 2, rowspan: 1, colspan: 3},
    {row: 0, col: 5, rowspan: 1, colspan: 3},
    {row: 0, col: 8, rowspan: 1, colspan: 3},
];

const cellStyle = [
    {row: 0, col: 2, className: "bold"},
    {row: 0, col: 6, className: "bold"},
    {row: 0, col: 10, className: "bold"},
    {row: 1, col: 2, className: "bold"},
    {row: 1, col: 3, className: "bold"},
    {row: 1, col: 4, className: "bold"},
    {row: 1, col: 5, className: "bold"},
    {row: 1, col: 6, className: "bold"},
    {row: 1, col: 7, className: "bold"},
    {row: 1, col: 8, className: "bold"},
    {row: 1, col: 9, className: "bold"},
    {row: 1, col: 10, className: "bold"},
    {row: 1, col: 11, className: "bold"},
    {row: 1, col: 12, className: "bold"}
]

const customBorders = [
    {range: {
        from: {row: 0, col: 0},
        to: {row: 3, col: 4}},
        left: {},
        right: {},
        top: {},
        bottom: {}
    }
];

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    // debugger;
  Handsontable.renderers.TextRenderer.apply(this, arguments);
  td.style.fontWeight = 'bold';
  td.style.background = '#DCDCDC';
  td.className = 'grey';
}

const highlight = function (row, col, prop) {
  var cellProperties = {};
  if (row === 6 && col !== 0 || row === 12 && col !== 0 || row === 18 && col !== 0 ) {
    cellProperties.renderer = firstRowRenderer; // uses function directly
  }
  return cellProperties;

}



export default class TodoContainer extends Component {

    constructor(props) {
        super(props);
        this.handsontableData = data;
    }

    test(val) {
        console.log(val);
    }

    render() {
        return (
            <HotTable
                root='hot'
                data={this.handsontableData}
                cells={highlight}
                cell={cellStyle}
                fixedRowsTop={2}
                fixedColumnsLeft={2}
                formulas={true}
                contextMenu={true}
                height={900}
                width={1200}
                mergeCells={merge}
                customBorders={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true}
                afterChange={this.test.bind(this)}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
        );
    }
}
