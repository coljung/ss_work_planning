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

    test = (cellEdits) => {
        if (cellEdits) {
            const row = cellEdits[0][0];
            const col = cellEdits[0][1];
            const prevValue = cellEdits[0][2];
            const newValue = cellEdits[0][3];
            debugger;
            if (prevValue !== newValue) {
                this.dataToSave[row][col] = newValue;
            }
            // console.log(this.dataToSave);
            console.log(newValue);
        }
        // const relations = datagrid.relationships;
        // if (cellEdits) {
        //     const edit = cellEdits[0];
        //     const [row, col, prevValue, newValue] = edit;
        //     const whattochange = relations[row][col];
        //
        //     let item = Object.assign({}, this.state.datagrid.data[whattochange.row], { [whattochange.col]: newValue });
        //     items[1] = item;
        //     this.setState({items: items});
        //     // debugger;
        // }
    }

    buildTable = () => {
        const newMerge = this.mergeCells();
        return (<div className="parentDiv">
            <HotTable
                root='hot'
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
                afterChange={this.test}
                licenseKey= 'a389a-f2591-70b41-a480d-1911a' />
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
    return bindActionCreators({ fetchBudgetMenData, resetState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenViewContainer);
