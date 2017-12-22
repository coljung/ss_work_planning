import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Button, Spin } from 'antd';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { saveBudget, fetchBudgetMenData, resetState } from './MenViewActions';
import { cellClasses, headers, columns } from '../common/men-women/index';

class MenViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            disabledBtn: true,
        };

        this.dataToSave = [];
    }

    componentDidMount() {
        this.props.fetchBudgetMenData(this.props.budget, this.props.version);
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewMenData.length !== nextProps.viewMenData) {
            this.setState({
                grid: nextProps.viewMenData,
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

    save = () => {
        const dataToSend = {};
        dataToSend.data = this.dataToSave;
        this.props.saveBudget(this.props.budget, this.props.version, 'men', dataToSend);
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
                cells={cellClasses}
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
                afterChange={this.changeCell}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
        </div>);
    }

    render() {
        const budgetListData = this.props.viewMenDataFetched ? this.buildTable() : <Spin size="large" />;
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


MenViewContainer.propTypes = {
    viewMenData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewMenDataFetched: PropTypes.bool.isRequired,
    saveBudget: PropTypes.func.isRequired,
    fetchBudgetMenData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    const { MenViewReducer } = state;
    return {
        viewMenData: MenViewReducer.viewMenData,
        viewMenDataFetched: MenViewReducer.viewMenDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetMenData, resetState, saveBudget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenViewContainer);
