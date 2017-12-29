import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { saveBudget, fetchBudgetData, resetState } from '../common/viewActions';
import { headers, columns } from '../common/grid/index';

class ViewCommonContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetData(this.props.budget, this.props.version, this.props.view);
    }

    componentWillUnmount() {
        this.props.resetState();
        console.log('gone ', this.props.view);
    }

    componentWillReceiveProps = (nextProps) => {
        // debugger;
        if (this.props.viewData.length !== nextProps.viewData) {
            this.setState({
                grid: nextProps.viewData,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        const { currentMonthColumn, season } = this.state.grid.info;
        const cols = columns(currentMonthColumn, season);
        const seasonColumns = season === 'SS' ? cols[0] : cols[1];
        const seasonHeaders = season === 'SS' ? headers[0] : headers[1];
        return (<div className="parentDiv">
            <HotTable
                root='hot'
                data={this.state.grid.data}
                nestedHeaders={seasonHeaders}
                colHeaders={true}
                columns={seasonColumns}
                formulas={true}
                contextMenu={false}
                mergeCells={newMerge}
                persistentState={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
        </div>);
    }

    render() {
        // console.log(this.props.viewData);
        // console.log(this.props.viewDataFetched);
        const budgetListData = this.props.viewDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                <h2>{this.props.view}</h2>
                {budgetListData}
            </div>
        );
    }
}


ViewCommonContainer.propTypes = {
    viewData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewDataFetched: PropTypes.bool.isRequired,
    fetchBudgetData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const { ViewReducers } = state;
    return {
        viewData: ViewReducers.viewData,
        viewDataFetched: ViewReducers.viewDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCommonContainer);
