import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { fetchBudgetTotalData, resetState } from './TotalViewActions';
import { headers, columns } from '../common/grid/index';

class TotalViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };

        this.dataToSave = [];
    }

    componentDidMount() {
        this.props.fetchBudgetTotalData(this.props.budget, this.props.version);
    }

    componentWillUnmount() {
        this.props.resetState();
        console.log('gone total');
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewTotalData.length !== nextProps.viewTotalData) {
            this.setState({
                grid: nextProps.viewTotalData,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = this.state.grid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
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

    buildTable = () => {
        const newMerge = this.mergeCells();
        const { currentMonthColumn, season } = this.state.grid.info;
        const cols = columns(currentMonthColumn, season, 'total');
        const seasonColumns = season === 'SS' ? cols[0] : cols[1];
        const seasonHeaders = season === 'SS' ? headers[0] : headers[1];
        return (<div className="parentDiv">
            <HotTable
                root='hot'
                data={this.state.grid.data}
                nestedHeaders= {seasonHeaders}
                colHeaders= {true}
                columns={seasonColumns}
                formulas={true}
                contextMenu={false}
                mergeCells={newMerge}
                persistentState={true}
                currentRowClassName= {'currentRow'}
                currentColClassName= {'currentCol'}
                function={true}
                observeChanges={true}
                afterChange={this.test}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
        </div>);
    }

    render() {
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
    resetState: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
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
