import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { fetchBudgetWomenData, resetState } from './WomenViewActions';
import datagrid from './test';
import { cellClasses, headers, columns } from './grid-build/index';

class WomenViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetWomenData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewWomenData.length !== nextProps.viewWomenData) {
            this.setState({
                grid: nextProps.viewWomenData,
            });
        }
    }

    mergeCells = () => {
        console.log(this.props.viewWomenData);
        console.log(this.state.grid);
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        return (<div className="parentDiv">
            <HotTable
                root="hot"
                data={this.state.grid.data}
                cells={cellClasses}
                nestedHeaders= {headers}
                colHeaders= {true}
                columns={columns}
                formulas={true}
                contextMenu={false}
                mergeCells={newMerge}
                persistentState={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true} />
        </div>);
    }

    render() {
        const budgetListData = this.props.viewWomenDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                <h2>WOMEN</h2>
                {budgetListData}
            </div>
        );
    }
}


WomenViewContainer.propTypes = {
    viewWomenData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewWomenDataFetched: PropTypes.bool.isRequired,
    fetchBudgetWomenData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { WomenViewReducer } = state;
    return {
        viewWomenData: WomenViewReducer.viewWomenData,
        viewWomenDataFetched: WomenViewReducer.viewWomenDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetWomenData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WomenViewContainer);
