import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import HotTable from 'react-handsontable';
import { data } from './test';

const colHeaders = ['', 'Tesla', 'Nissan', 'Toyota', 'Honda'];

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
                fixedColumnsLeft={1}
                fixedRowsTop={1}
                colHeaders={colHeaders}
                rowHeaders={false}
                columns={columns}
                width={1200}
                height={600}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true}
                afterChange={this.test.bind(this)}
                stretchH="all" />
        );
    }
}
