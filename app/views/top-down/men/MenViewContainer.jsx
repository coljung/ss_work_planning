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
            data: [],
        };
    }

    componentDidMount() {
        this.props.fetchBudgetMenData();
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.viewMenData.length !== nextProps.viewMenData.length) {
            this.setState({
                data: nextProps.viewMenData,
            });
        }
    }

    mergeCells = () => {
        const { start_row, row_span, total, total_cols, has_gaps } = datagrid.info;
        const newMerge = mergeMetrics(start_row, row_span, total, total_cols, has_gaps);

        return newMerge;
    }

    test = (v) => {
        console.log(v);
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        return (<div className="parentDiv">
            <HotTable
                root="hot"
                data={datagrid.data}
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
                afterChange={this.test} />
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
        PropTypes.bool,
        PropTypes.array,
    ]).isRequired,
    viewMenDataFetched: PropTypes.bool.isRequired,
    fetchBudgetMenData: PropTypes.func.isRequired,
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
