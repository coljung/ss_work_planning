import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Button, Spin } from 'antd';
// import { mergeMetrics } from 'helpers';
import { saveBudget, fetchBudgetData, resetState } from '../common/viewActions';
import { headers, columns, mergeMetrics } from '../common/grid/index';

class ViewCommonContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            disabledBtn: true,
        };
        this.dataToSave = [];
    }

    componentDidMount() {
        this.props.fetchBudgetData(this.props.budget, this.props.version, this.props.view);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        const setData = nextProps.viewData[nextProps.view];
        if (this.props.viewData.length !== setData) {
            this.setState({
                grid: setData,
            });
        }
    }

    changeCell = (cellEdits) => {
        // on load this is called, hence the check
        if (cellEdits) {
            const row = cellEdits[0][0];
            const col = cellEdits[0][1];
            const prevValue = cellEdits[0][2];
            const newValue = cellEdits[0][3];
            if (prevValue !== newValue) {
                const newData = {
                    row,
                    col,
                    value: newValue,
                };
                // check if cell has been modified already
                const checkDuplicate = this.dataToSave.filter(e => e.row !== row || e.col !== col);
                checkDuplicate.push(newData);
                this.dataToSave = checkDuplicate;
            }
            if (this.state.disabledBtn) {
                this.setState({
                    disabledBtn: false,
                });
            }
        }
    }

    save = () => {
        const dataToSend = {};
        dataToSend.data = this.dataToSave;
        this.props.saveBudget(this.props.budget, this.props.version, this.props.view, dataToSend);
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        const { currentMonthColumn, season, row_span } = this.state.grid.info;
        const cols = columns(currentMonthColumn, season, row_span);
        const seasonColumns = season === 'SS' ? cols[0] : cols[1];
        const seasonHeaders = season === 'SS' ? headers[0] : headers[1];
        return (
            <div className="parentDiv">
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
                    afterChange={this.changeCell}
                    licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
            </div>
        );
    }

    spinLoad = () => {
        const mySpin = <Spin size="large" tip="Loading..." />;
        return (
            <div className="spinDiv">
                {mySpin}
            </div>
        );
    }

    render() {
        const budgetListData = this.props.viewData[this.props.view] ? this.buildTable() : this.spinLoad();
        return (
            <div>
                <Button
                    icon="save"
                    className="saveBtn"
                    disabled={this.state.disabledBtn}
                    onClick={() => this.save()}>Save Men's view</Button>
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
    saveBudget: PropTypes.func.isRequired,
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
    return bindActionCreators({ fetchBudgetData, resetState, saveBudget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCommonContainer);
