import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Spin } from 'antd';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { fetchBudgetMenData, resetState } from './MenViewActions';
import datagrid from './test';
import { cellClasses, headers, columns } from './grid-build/index';

class MenViewContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };

        this.dataToSave = [];
    }

    componentDidMount() {
        this.props.fetchBudgetMenData();
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
                console.log(this.dataToSave);
            }
        }
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
                observeChanges={true}
                afterChange={this.changeCell} />
        </div>);
    }

    render() {
        const budgetListData = this.props.viewMenDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                <h2>MEN</h2>
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
    fetchBudgetMenData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    const { MenViewReducer } = state;
    return {
        viewMenData: MenViewReducer.viewMenData,
        viewMenDataFetched: MenViewReducer.viewMenDataFetched,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchBudgetMenData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenViewContainer);
