import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HotTable from 'react-handsontable';
import Handsontable from 'handsontable';
import { Button, Spin } from 'antd';
import { withRouter } from 'react-router';
import { mergeMetrics, mergeHeadersExecRecap } from 'helpers';
import { saveBudget, fetchBudgetData, resetState } from '../common/viewActions';
import { headers, columns } from '../common/grid/index';

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
        const { budget, location, version } = this.props;
        this.props.fetchBudgetData(budget, version, 'men', location.query));
    }

    componentWillUnmount() {
        this.props.resetState();
        console.log('gone men');
    }

    componentWillReceiveProps = (nextProps) => {
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

    changeCell = (cellEdits) => {
        // on load this is called, hence the check
        // if (cellEdits) {
        //     const row = cellEdits[0][0];
        //     const col = cellEdits[0][1];
        //     const prevValue = cellEdits[0][2];
        //     const newValue = cellEdits[0][3];
        //     if (prevValue !== newValue) {
        //         const newData = {
        //             row,
        //             col,
        //             value: newValue,
        //         };
        //         // check if cell has been modified already
        //         const checkDuplicate = this.dataToSave.filter(e => e.row !== row || e.col !== col);
        //         checkDuplicate.push(newData);
        //         this.dataToSave = checkDuplicate;
        //     }
        //     if (this.state.disabledBtn) {
        //         this.setState({
        //             disabledBtn: false,
        //         });
        //     }
        // }
    }

    save = () => {
        const dataToSend = {};
        dataToSend.data = this.dataToSave;
        this.props.saveBudget(this.props.budget, this.props.version, 'men', dataToSend);
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        const { currentMonthColumn, season } = this.state.grid.info;
        const cols = columns(currentMonthColumn, season, 'men');
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
                afterChange={this.changeCell}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
        </div>);
    }

    render() {
        // console.log(this.props.viewData);
        console.log(this.props.viewDataFetched.length);
        const budgetListData = this.props.viewDataFetched ? this.buildTable() : <Spin size="large" />;
        return (
            <div>
                {budgetListData}
            </div>
        );
    }
}


MenViewContainer.propTypes = {
    viewData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    viewDataFetched: PropTypes.bool.isRequired,
    saveBudget: PropTypes.func.isRequired,
    fetchBudgetData: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    // updateData: PropTypes.func.isRequired,
    budget: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    router: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MenViewContainer));
