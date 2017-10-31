import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { fetchBudgetViewData } from './BudgetViewActions';


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


class ExecViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentWillMount() {
        this.props.fetchBudgetViewData();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewData.length !== nextProps.viewData.length) {
            this.setState({
                data: nextProps.viewData,
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
        const budgetListData = this.props.viewDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}


ExecViewContainer.propTypes = {
    viewData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewDataFetched: PropTypes.bool.isRequired,
    fetchBudgetViewData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { BudgetViewReducer } = state;
    return {
        viewData: BudgetViewReducer.viewData,
        viewDataFetched: BudgetViewReducer.viewDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetViewData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExecViewContainer);
