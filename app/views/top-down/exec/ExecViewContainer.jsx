import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { fetchBudgetExecData, resetState } from './ExecViewActions';
import { data } from './test_exec';


const merge = [
    { row: 0, col: 2, rowspan: 1, colspan: 6 },
    { row: 0, col: 8, rowspan: 1, colspan: 7 },
    { row: 0, col: 15, rowspan: 1, colspan: 7 },

    { row: 2, col: 0, rowspan: 5, colspan: 1 },
    { row: 7, col: 0, rowspan: 5, colspan: 1 },
    { row: 12, col: 0, rowspan: 5, colspan: 1 },
];

const cellStyle = [
    { row: 0, col: 2, className: 'bold' },
    { row: 0, col: 6, className: 'bold' },
    { row: 0, col: 10, className: 'bold' },
    { row: 1, col: 2, className: 'bold' },
    { row: 1, col: 3, className: 'bold' },
    { row: 1, col: 4, className: 'bold' },
    { row: 1, col: 5, className: 'bold' },
    { row: 1, col: 6, className: 'bold' },
    { row: 1, col: 7, className: 'bold' },
    { row: 1, col: 8, className: 'bold' },
    { row: 1, col: 9, className: 'bold' },
    { row: 1, col: 10, className: 'bold' },
    { row: 1, col: 11, className: 'bold' },
    { row: 1, col: 12, className: 'bold' },
];


// const nested = [
//     [
//         { label: '&nbsp;', colspan: 2, className: 'ffffff' },
//         { label: 'Women + Men', colspan: 3 },
//         { label: 'Women', colspan: 3 },
//         { label: 'Men', colspan: 3 },
//     ],
//     [
//         'Metrics',
//         'Season/Year',
//         { label: 'Before Markdowns', colspan: 1 },
//         { label: 'Inc %', colspan: 1 },
//         { label: 'Full Season', colspan: 1 },
//         { label: 'Before Markdowns', colspan: 1 },
//         { label: 'Inc %', colspan: 1 },
//         { label: 'Full Season', colspan: 1 },
//         { label: 'Before Markdowns', colspan: 1 },
//         { label: 'Inc %', colspan: 1 },
//         { label: 'Full Season', colspan: 1 },
//     ],
// ];


const customBorders = [

    { range: { from: { row: 1, col: 4}, to: {row: 20, col: 5}}, right: {width: 1, color: '#000'}, left: {width: 1, color: '#000'},
    },
    { range: { from: { row: 1, col: 8}, to: {row: 20, col: 9}}, right: {width: 1, color: '#000'}, left: {width: 1, color: '#000'},
    },
    { range: { from: { row: 1, col: 12}, to: {row: 20, col: 14}}, right: {width: 1, color: '#000'}, left: {width: 1, color: '#000'},
    },
    { range: { from: { row: 1, col: 17}, to: {row: 20, col: 18}}, right: {width: 1, color: '#000'}, left: {width: 1, color: '#000'},
    },
];

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.background = '#DCDCDC';
    td.className = 'grey';
}

function fakeHeaders(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.className = 'headerCell';
}

const cellStyles = (row, col, prop) => {
    const cellProperties = {};
    if (row < 2) {
        cellProperties.renderer = fakeHeaders; // uses function directly
    }
    if ((row === 6 && col > 1) || (row === 12 && col > 1) || (row === 18 && col > 1)) {
        cellProperties.renderer = firstRowRenderer; // uses function directly
    }
    return cellProperties;
};


class ExecViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        this.props.fetchBudgetExecData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewExecData.length !== nextProps.viewExecData.length) {
            this.setState({
                data: nextProps.viewExecData,
            });
        }
    }

    buildTable = () => (
            <div className="parentDiv">
                <HotTable
                    root="hot"
                    data={data}
                    cells={cellStyles}
                    cell={cellStyle}
                    fixedRowsTop={2}
                    fixedColumnsLeft={2}
                    formulas={true}
                    contextMenu={true}

                    mergeCells={merge}
                    customBorders={customBorders}
                    currentRowClassName= {'currentRow'}
                    currentColClassName= {'currentCol'}
                    function={true}
                    observeChanges={true}
                    afterChange={this.test.bind(this)} />
            </div>
        )

    test(val) {
        // console.log(val);
    }

    render() {
        const budgetListData = this.props.viewExecDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}


ExecViewContainer.propTypes = {
    viewExecData: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array,
    ]).isRequired,
    viewExecDataFetched: PropTypes.bool.isRequired,
    fetchBudgetExecData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { ExecViewReducer } = state;
    return {
        viewExecData: ExecViewReducer.viewExecData,
        viewExecDataFetched: ExecViewReducer.viewExecDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetExecData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecViewContainer);
