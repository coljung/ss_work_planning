import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { fetchBudgetTotalData, resetState } from './TotalViewActions';


const merge = [
    { row: 2, col: 0, rowspan: 5, colspan: 1 },
    { row: 8, col: 0, rowspan: 5, colspan: 1 },
    { row: 14, col: 0, rowspan: 5, colspan: 1 },

    { row: 0, col: 2, rowspan: 1, colspan: 3 },
    { row: 0, col: 5, rowspan: 1, colspan: 3 },
    { row: 0, col: 8, rowspan: 1, colspan: 3 },
];

const cellStyle = [
    { row: 0, col: 2, className: 'bold' },
    { row: 0, col: 6, className: 'bold' },
    { row: 0, col: 10, className: 'bold' },
];

function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
    // debugger;
    Handsontable.renderers.TextRenderer.apply(this, arguments);
    td.style.fontWeight = 'bold';
    td.style.background = '#DCDCDC';
    td.className = 'grey';
}

const highlight = function (row, col, prop) {
    const cellProperties = {};
    if (row === 6 && col !== 0 || row === 12 && col !== 0 || row === 18 && col !== 0) {
        cellProperties.renderer = firstRowRenderer; // uses function directly
    }
    return cellProperties;
};


class TotalViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetTotalData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        // console.log(this.props.viewTotalData, nextProps.viewTotalData);
        if (this.props.viewTotalData.length !== nextProps.viewTotalData.length) {
            this.setState({
                data: nextProps.viewTotalData,
            });
        }
    }

    buildTable = () => {
        return (
            <HotTable
                root="hot"
                data={this.state.data}
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
                afterChange={this.test.bind(this)} />
        );
    }

    test(val) {
        console.log(val);
    }

    render() {
        console.log(typeof this.props.viewTotalData);
        const budgetListData = this.props.viewTotalDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                <h2>TOTAL</h2>
                {budgetListData}
            </div>
        );
    }
}


TotalViewContainer.propTypes = {
    viewTotalData: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.array,
    ]).isRequired,
    viewTotalDataFetched: PropTypes.bool.isRequired,
    fetchBudgetTotalData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { TotalViewReducer } = state;
    return {
        viewTotalData: TotalViewReducer.viewTotalData,
        viewTotalDataFetched: TotalViewReducer.viewTotalDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetTotalData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalViewContainer);
