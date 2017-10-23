import React, { Component } from 'react';
import HotTable from 'react-handsontable';
import Handsontable  from 'handsontable';
import { data } from './test';

// const colHeaders = ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'];

const rowHeaders = ['Sales', 'COGS', 'GM'];

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

const merge = [   
    {row: 2, col: 0, rowspan: 5, colspan: 1},
    {row: 7, col: 0, rowspan: 5, colspan: 1},
    {row: 12, col: 0, rowspan: 5, colspan: 1},

    {row: 0, col: 2, rowspan: 1, colspan: 4},
    {row: 0, col: 6, rowspan: 1, colspan: 4},
    {row: 0, col: 10, rowspan: 1, colspan: 4},
];

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
  td.style.background = '#CCC';
}

const highlight = function (row, col, prop) {
  var cellProperties = {};
  if (row === 5 && col !== 0) {
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
                root="hot"
                data={this.handsontableData}
                cells={highlight}
                fixedRowsTop={2} 
                contextMenu={true}
                height={800}
                width={1500}
                mergeCells={merge}
                customBorders={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true}
                afterChange={this.test.bind(this)} />
        );
    }
}
