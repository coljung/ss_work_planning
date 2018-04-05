import agent from 'superagent';
import wrap from 'superagent-promise';
import { messages } from 'notifications/NotificationActions';
import { fetchColumnData } from '../ColumnActions';
import getApiUrl, { defaultMetricSequence } from '../../../Helpers.js';

const request = wrap(agent, Promise);

export const REQUEST_BUDGETS_VIEW = 'REQUEST_BUDGETS_VIEW';
export const RECEIVE_BUDGETS_VIEW = 'RECEIVE_BUDGETS_VIEW';
export const RESET_BUDGETS_VIEW = 'RESET_BUDGETS_VIEW';
export const REQUEST_BUDGETS_SAVE_BUDGET = 'REQUEST_BUDGETS_SAVE_BUDGET';
export const RECEIVE_BUDGETS_SAVE_BUDGET = 'RECEIVE_BUDGETS_SAVE_BUDGET';

export const requestBudgetViewData = () => ({
    type: REQUEST_BUDGETS_VIEW,
});

export const receiveBudgetViewData = (viewData, view) => ({
    type: RECEIVE_BUDGETS_VIEW,
    viewData,
    view,
});

export const requestBudgetSave = () => ({
    type: REQUEST_BUDGETS_SAVE_BUDGET,
});

export const receiveBudgetSave = version => ({
    type: RECEIVE_BUDGETS_SAVE_BUDGET,
    version,
});

export const resetState = () => ({
    type: RESET_BUDGETS_VIEW,
});

export function fetchBudgetData(budget, version, view, query) {
    return (dispatch) => {
        // merge query with the default if is not defined
        query = {
            ...query,
            metricSeq: query && query.metricSeq ? query.metricSeq : defaultMetricSequence(),
        };

        dispatch(requestBudgetViewData());
        return request
            .get(`${getApiUrl()}planning/budgets/${budget}/versions/${version}/${view}`)
            .query(query)
            .then(
            res => dispatch(receiveBudgetViewData(
                {
                    "info": {
                        "total": 200,
                        "metrics": 10,
                        "start_row": 0,
                        "row_span": 20,
                        "total_cols": 22,
                        "has_gaps": false,
                        "currentMonthColumn": 0,
                        "season": "FW",
                        "hidden_rows": [
                            180,
                            181,
                            182,
                            183,
                            184,
                            185,
                            186,
                            187,
                            188,
                            189,
                            190,
                            191,
                            192,
                            193,
                            194,
                            195,
                            196,
                            197,
                            198,
                            199,
                            120,
                            121,
                            122,
                            123,
                            124,
                            125,
                            126,
                            127,
                            128,
                            129,
                            130,
                            131,
                            132,
                            133,
                            134,
                            135,
                            136,
                            137,
                            138,
                            139
                        ]
                    },
                    "data": [
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= I1 + P1"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I1 + P1)-(I5 + P5)) /(I5 + P5)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= K1 + R1"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K1 + R1)-(K5 + R5)) /(K5 + R5)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= M1 + T1"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M1 + T1) - ( M5 + T5))/ ( M5 + T5) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 19372165.14,
                                'readOnly': true,
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I1 - I5)/I5"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 56292802.92,
                                'readOnly': false,
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K1 - K5)/K5"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 61556856.71000001
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M1 - M5)/M5"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=M1/ (T1 + M1)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 20230813.03
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P1 - P5) /P5"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 64142774.61
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R1 - R5) /R5"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 71698745.03999999
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T1 - T5) /T5"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=T1 / (T1 + M1)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I2 + P2"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I2 + P2)-(I6 + P6)) /(I6 + P6)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K2 + R2"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K2 + R2)-(K6 + R6)) /(K6 + R6)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M2 + T2"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M2 + T2) - ( M6 + T6))/ ( M6 + T6) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 19372165.14
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I2 - I6)/I6"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 56292802.92
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K2 - K6)/K6"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 61556856.71000001
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M2 - M6)/M6"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M2/ (T2 + M2)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 20230813.03
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P2 - P6) /P6"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 64142774.61
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R2 - R6) /R6"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 71698745.03999999
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T2 - T6) /T6"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T2 / (T2 + M2)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I3 + P3"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I3 + P3)-(I7 + P7)) /(I7 + P7)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K3 + R3"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K3 + R3)-(K7 + R7)) /(K7 + R7)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M3 + T3"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M3 + T3) - ( M7 + T7))/ ( M7 + T7) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I3 - I7)/I7"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K3 - K7)/K7"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M3 - M7)/M7"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M3/ (T3 + M3)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P3 - P7) /P7"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R3 - R7) /R7"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T3 - T7) /T7"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T3 / (T3 + M3)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I4 + P4"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I4 + P4)-(I8 + P8)) /(I8 + P8)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K4 + R4"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K4 + R4)-(K8 + R8)) /(K8 + R8)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M4 + T4"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M4 + T4) - ( M8 + T8))/ ( M8 + T8) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I4 - I8)/I8"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K4 - K8)/K8"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M4 - M8)/M8"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M4/ (T4 + M4)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P4 - P8) /P8"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R4 - R8) /R8"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T4 - T8) /T8"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T4 / (T4 + M4)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= I5 + P5"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I5 + P5)-(I9 + P9)) /(I9 + P9)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= K5 + R5"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K5 + R5)-(K9 + R9)) /(K9 + R9)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= M5 + T5"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M5 + T5) - ( M9 + T9))/ ( M9 + T9) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 11312425.700000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I5 - I9)/I9"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 32099925.01
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K5 - K9)/K9"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 36356204.71
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M5 - M9)/M9"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=M5/ (T5 + M5)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 14632660.23
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P5 - P9) /P9"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 40508302.65
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R5 - R9) /R9"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 46066091.31000001
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T5 - T9) /T9"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=T5 / (T5 + M5)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I6 + P6"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I6 + P6)-(I10 + P10)) /(I10 + P10)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K6 + R6"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K6 + R6)-(K10 + R10)) /(K10 + R10)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M6 + T6"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M6 + T6) - ( M10 + T10))/ ( M10 + T10) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 11312425.700000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I6 - I10)/I10"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 32099925.01
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K6 - K10)/K10"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 36356204.71
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M6 - M10)/M10"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M6/ (T6 + M6)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 14632660.23
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P6 - P10) /P10"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 40508302.65
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R6 - R10) /R10"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 46066091.31000001
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T6 - T10) /T10"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T6 / (T6 + M6)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I7 + P7"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I7 + P7)-(I11 + P11)) /(I11 + P11)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K7 + R7"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K7 + R7)-(K11 + R11)) /(K11 + R11)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M7 + T7"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M7 + T7) - ( M11 + T11))/ ( M11 + T11) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I7 - I11)/I11"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K7 - K11)/K11"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M7 - M11)/M11"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M7/ (T7 + M7)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P7 - P11) /P11"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R7 - R11) /R11"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T7 - T11) /T11"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T7 / (T7 + M7)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I8 + P8"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I8 + P8)-(I12 + P12)) /(I12 + P12)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K8 + R8"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K8 + R8)-(K12 + R12)) /(K12 + R12)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M8 + T8"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M8 + T8) - ( M12 + T12))/ ( M12 + T12) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I8 - I12)/I12"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K8 - K12)/K12"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M8 - M12)/M12"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M8/ (T8 + M8)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P8 - P12) /P12"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R8 - R12) /R12"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T8 - T12) /T12"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T8 / (T8 + M8)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= I9 + P9"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I9 + P9)-(I13 + P13)) /(I13 + P13)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= K9 + R9"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K9 + R9)-(K13 + R13)) /(K13 + R13)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= M9 + T9"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M9 + T9) - ( M13 + T13))/ ( M13 + T13) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 4831663.98
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I9 - I13)/I13"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 21754336.540000003
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K9 - K13)/K13"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 23759737.589999996
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M9 - M13)/M13"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=M9/ (T9 + M9)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 7902887.74
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P9 - P13) /P13"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 27791838.29
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R9 - R13) /R13"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 31554863.700000007
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T9 - T13) /T13"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=T9 / (T9 + M9)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I10 + P10"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I10 + P10)-(I14 + P14)) /(I14 + P14)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K10 + R10"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K10 + R10)-(K14 + R14)) /(K14 + R14)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M10 + T10"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M10 + T10) - ( M14 + T14))/ ( M14 + T14) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 4831663.98
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I10 - I14)/I14"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 21754336.540000003
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K10 - K14)/K14"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 23759737.589999996
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M10 - M14)/M14"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M10/ (T10 + M10)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 7902887.74
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P10 - P14) /P14"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 27791838.29
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R10 - R14) /R14"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 31554863.700000007
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T10 - T14) /T14"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T10 / (T10 + M10)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I11 + P11"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I11 + P11)-(I15 + P15)) /(I15 + P15)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K11 + R11"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K11 + R11)-(K15 + R15)) /(K15 + R15)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M11 + T11"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M11 + T11) - ( M15 + T15))/ ( M15 + T15) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I11 - I15)/I15"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K11 - K15)/K15"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M11 - M15)/M15"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M11/ (T11 + M11)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P11 - P15) /P15"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R11 - R15) /R15"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T11 - T15) /T15"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T11 / (T11 + M11)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I12 + P12"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I12 + P12)-(I16 + P16)) /(I16 + P16)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K12 + R12"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K12 + R12)-(K16 + R16)) /(K16 + R16)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M12 + T12"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M12 + T12) - ( M16 + T16))/ ( M16 + T16) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I12 - I16)/I16"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K12 - K16)/K16"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M12 - M16)/M16"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M12/ (T12 + M12)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P12 - P16) /P16"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R12 - R16) /R16"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T12 - T16) /T16"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T12 / (T12 + M12)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= I13 + P13"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I13 + P13)-(I17 + P17)) /(I17 + P17)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= K13 + R13"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K13 + R13)-(K17 + R17)) /(K17 + R17)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= M13 + T13"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M13 + T13) - ( M17 + T17))/ ( M17 + T17) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 3646055.31
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I13 - I17)/I17"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 14813668.450000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K13 - K17)/K17"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 15811240.37
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M13 - M17)/M17"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=M13/ (T13 + M13)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 6047175.64
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P13 - P17) /P17"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 18506517.07
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R13 - R17) /R17"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 19315777.27000001
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T13 - T17) /T17"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=T13 / (T13 + M13)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I14 + P14"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I14 + P14)-(I18 + P18)) /(I18 + P18)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K14 + R14"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K14 + R14)-(K18 + R18)) /(K18 + R18)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M14 + T14"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M14 + T14) - ( M18 + T18))/ ( M18 + T18) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 3646055.31
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I14 - I18)/I18"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 14813668.450000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K14 - K18)/K18"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 15811240.37
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M14 - M18)/M18"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M14/ (T14 + M14)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 6047175.64
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P14 - P18) /P18"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 18506517.07
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R14 - R18) /R18"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 19315777.27000001
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T14 - T18) /T18"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T14 / (T14 + M14)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I15 + P15"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I15 + P15)-(I19 + P19)) /(I19 + P19)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K15 + R15"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K15 + R15)-(K19 + R19)) /(K19 + R19)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M15 + T15"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M15 + T15) - ( M19 + T19))/ ( M19 + T19) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I15 - I19)/I19"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K15 - K19)/K19"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M15 - M19)/M19"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M15/ (T15 + M15)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P15 - P19) /P19"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R15 - R19) /R19"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T15 - T19) /T19"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T15 / (T15 + M15)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I16 + P16"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I16 + P16)-(I20 + P20)) /(I20 + P20)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K16 + R16"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K16 + R16)-(K20 + R20)) /(K20 + R20)"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M16 + T16"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M16 + T16) - ( M20 + T20))/ ( M20 + T20) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I16 - I20)/I20"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K16 - K20)/K20"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M16 - M20)/M20"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M16/ (T16 + M16)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P16 - P20) /P20"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R16 - R20) /R20"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T16 - T20) /T20"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T16 / (T16 + M16)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= I17 + P17"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= K17 + R17"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "= M17 + T17"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 1966773.6
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 7914727.64
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 8556015.069999998
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=M17/ (T17 + M17)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 2804049.9299999997
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 9685311.709999999
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": 9995415.600000001
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act",
                                "key": 0,
                                "value": "=T17 / (T17 + M17)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I18 + P18"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K18 + R18"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M18 + T18"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 1966773.6
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 7914727.64
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 8556015.069999998
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M18/ (T18 + M18)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 2804049.9299999997
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9685311.709999999
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9995415.600000001
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T18 / (T18 + M18)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I19 + P19"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K19 + R19"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M19 + T19"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M19/ (T19 + M19)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T19 / (T19 + M19)"
                            }
                        },
                        {
                            "metric": "SALES",
                            "seasonyear": {
                                "value": "SALES FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I20 + P20"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K20 + R20"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M20 + T20"
                            },
                            "total_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M20/ (T20 + M20)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "SALES",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T20 / (T20 + M20)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= I21 + P21"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I21 + P21)-(I25 + P25)) /(I25 + P25)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= K21 + R21"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K21 + R21)-(K25 + R25)) /(K25 + R25)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= M21 + T21"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M21 + T21) - ( M25 + T25))/ ( M25 + T25) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 7203572.670000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I21 - I25)/I25"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 27009824.57
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K21 - K25)/K25"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 30226838.900000002
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M21 - M25)/M25"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=M21/ (T21 + M21)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 7523134.220000001
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P21 - P25) /P25"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 33553396.03
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R21 - R25) /R25"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 38191580.29000001
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T21 - T25) /T25"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=T21 / (T21 + M21)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I22 + P22"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I22 + P22)-(I26 + P26)) /(I26 + P26)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K22 + R22"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K22 + R22)-(K26 + R26)) /(K26 + R26)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M22 + T22"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M22 + T22) - ( M26 + T26))/ ( M26 + T26) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 7203572.670000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I22 - I26)/I26"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 27009824.57
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K22 - K26)/K26"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 30226838.900000002
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M22 - M26)/M26"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M22/ (T22 + M22)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 7523134.220000001
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P22 - P26) /P26"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 33553396.03
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R22 - R26) /R26"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 38191580.29000001
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T22 - T26) /T26"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T22 / (T22 + M22)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I23 + P23"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I23 + P23)-(I27 + P27)) /(I27 + P27)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K23 + R23"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K23 + R23)-(K27 + R27)) /(K27 + R27)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M23 + T23"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M23 + T23) - ( M27 + T27))/ ( M27 + T27) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I23 - I27)/I27"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K23 - K27)/K27"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M23 - M27)/M27"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M23/ (T23 + M23)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P23 - P27) /P27"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R23 - R27) /R27"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T23 - T27) /T27"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T23 / (T23 + M23)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I24 + P24"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I24 + P24)-(I28 + P28)) /(I28 + P28)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K24 + R24"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K24 + R24)-(K28 + R28)) /(K28 + R28)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M24 + T24"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M24 + T24) - ( M28 + T28))/ ( M28 + T28) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I24 - I28)/I28"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K24 - K28)/K28"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M24 - M28)/M28"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M24/ (T24 + M24)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P24 - P28) /P28"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R24 - R28) /R28"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T24 - T28) /T28"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T24 / (T24 + M24)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= I25 + P25"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I25 + P25)-(I29 + P29)) /(I29 + P29)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= K25 + R25"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K25 + R25)-(K29 + R29)) /(K29 + R29)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= M25 + T25"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M25 + T25) - ( M29 + T29))/ ( M29 + T29) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 4160885.37
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I25 - I29)/I29"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 15778537.69
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K25 - K29)/K29"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 18632330.389999993
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M25 - M29)/M29"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=M25/ (T25 + M25)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 5181016.7
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P25 - P29) /P29"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 20074212.78
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R25 - R29) /R29"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 23533990.909999996
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T25 - T29) /T29"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=T25 / (T25 + M25)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I26 + P26"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I26 + P26)-(I30 + P30)) /(I30 + P30)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K26 + R26"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K26 + R26)-(K30 + R30)) /(K30 + R30)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M26 + T26"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M26 + T26) - ( M30 + T30))/ ( M30 + T30) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 4160885.37
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I26 - I30)/I30"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 15778537.69
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K26 - K30)/K30"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 18632330.389999993
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M26 - M30)/M30"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M26/ (T26 + M26)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5181016.7
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P26 - P30) /P30"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 20074212.78
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R26 - R30) /R30"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 23533990.909999996
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T26 - T30) /T30"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T26 / (T26 + M26)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I27 + P27"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I27 + P27)-(I31 + P31)) /(I31 + P31)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K27 + R27"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K27 + R27)-(K31 + R31)) /(K31 + R31)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M27 + T27"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M27 + T27) - ( M31 + T31))/ ( M31 + T31) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I27 - I31)/I31"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K27 - K31)/K31"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M27 - M31)/M31"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M27/ (T27 + M27)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P27 - P31) /P31"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R27 - R31) /R31"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T27 - T31) /T31"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T27 / (T27 + M27)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I28 + P28"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I28 + P28)-(I32 + P32)) /(I32 + P32)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K28 + R28"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K28 + R28)-(K32 + R32)) /(K32 + R32)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M28 + T28"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M28 + T28) - ( M32 + T32))/ ( M32 + T32) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I28 - I32)/I32"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K28 - K32)/K32"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M28 - M32)/M32"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M28/ (T28 + M28)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P28 - P32) /P32"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R28 - R32) /R32"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T28 - T32) /T32"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T28 / (T28 + M28)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= I29 + P29"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I29 + P29)-(I33 + P33)) /(I33 + P33)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= K29 + R29"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K29 + R29)-(K33 + R33)) /(K33 + R33)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= M29 + T29"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M29 + T29) - ( M33 + T33))/ ( M33 + T33) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 1775483.46
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I29 - I33)/I33"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 12390606.350000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K29 - K33)/K33"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 13721119.329999998
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M29 - M33)/M33"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=M29/ (T29 + M29)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 2799574.76
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P29 - P33) /P33"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 15093366.909999998
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R29 - R33) /R33"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 17043674.979999993
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T29 - T33) /T33"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=T29 / (T29 + M29)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I30 + P30"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I30 + P30)-(I34 + P34)) /(I34 + P34)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K30 + R30"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K30 + R30)-(K34 + R34)) /(K34 + R34)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M30 + T30"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M30 + T30) - ( M34 + T34))/ ( M34 + T34) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 1775483.46
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I30 - I34)/I34"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 12390606.350000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K30 - K34)/K34"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 13721119.329999998
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M30 - M34)/M34"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M30/ (T30 + M30)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 2799574.76
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P30 - P34) /P34"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 15093366.909999998
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R30 - R34) /R34"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 17043674.979999993
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T30 - T34) /T34"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T30 / (T30 + M30)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I31 + P31"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I31 + P31)-(I35 + P35)) /(I35 + P35)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K31 + R31"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K31 + R31)-(K35 + R35)) /(K35 + R35)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M31 + T31"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M31 + T31) - ( M35 + T35))/ ( M35 + T35) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I31 - I35)/I35"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K31 - K35)/K35"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M31 - M35)/M35"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M31/ (T31 + M31)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P31 - P35) /P35"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R31 - R35) /R35"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T31 - T35) /T35"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T31 / (T31 + M31)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I32 + P32"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I32 + P32)-(I36 + P36)) /(I36 + P36)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K32 + R32"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K32 + R32)-(K36 + R36)) /(K36 + R36)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M32 + T32"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M32 + T32) - ( M36 + T36))/ ( M36 + T36) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I32 - I36)/I36"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K32 - K36)/K36"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M32 - M36)/M36"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M32/ (T32 + M32)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P32 - P36) /P36"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R32 - R36) /R36"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T32 - T36) /T36"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T32 / (T32 + M32)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= I33 + P33"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I33 + P33)-(I37 + P37)) /(I37 + P37)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= K33 + R33"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K33 + R33)-(K37 + R37)) /(K37 + R37)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= M33 + T33"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M33 + T33) - ( M37 + T37))/ ( M37 + T37) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 1353408.9
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I33 - I37)/I37"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 8289520.21
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K33 - K37)/K37"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 9139985.789999997
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M33 - M37)/M37"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=M33/ (T33 + M33)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 2199441.27
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P33 - P37) /P37"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 9779190.35
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R33 - R37) /R37"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 10293114.280000005
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T33 - T37) /T37"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=T33 / (T33 + M33)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I34 + P34"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I34 + P34)-(I38 + P38)) /(I38 + P38)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K34 + R34"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K34 + R34)-(K38 + R38)) /(K38 + R38)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M34 + T34"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M34 + T34) - ( M38 + T38))/ ( M38 + T38) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 1353408.9
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I34 - I38)/I38"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 8289520.21
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K34 - K38)/K38"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9139985.789999997
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M34 - M38)/M38"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M34/ (T34 + M34)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 2199441.27
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P34 - P38) /P38"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9779190.35
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R34 - R38) /R38"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 10293114.280000005
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T34 - T38) /T38"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T34 / (T34 + M34)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I35 + P35"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I35 + P35)-(I39 + P39)) /(I39 + P39)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K35 + R35"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K35 + R35)-(K39 + R39)) /(K39 + R39)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M35 + T35"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M35 + T35) - ( M39 + T39))/ ( M39 + T39) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I35 - I39)/I39"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K35 - K39)/K39"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M35 - M39)/M39"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M35/ (T35 + M35)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P35 - P39) /P39"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R35 - R39) /R39"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T35 - T39) /T39"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T35 / (T35 + M35)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I36 + P36"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I36 + P36)-(I40 + P40)) /(I40 + P40)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K36 + R36"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K36 + R36)-(K40 + R40)) /(K40 + R40)"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M36 + T36"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M36 + T36) - ( M40 + T40))/ ( M40 + T40) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I36 - I40)/I40"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K36 - K40)/K40"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M36 - M40)/M40"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M36/ (T36 + M36)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P36 - P40) /P40"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R36 - R40) /R40"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T36 - T40) /T40"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T36 / (T36 + M36)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= I37 + P37"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= K37 + R37"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "= M37 + T37"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 745746.48
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 4571799.35
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 5012813.03
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=M37/ (T37 + M37)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 1006436.8899999999
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 5145083.34
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": 5334538.120000003
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act",
                                "key": 0,
                                "value": "=T37 / (T37 + M37)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I38 + P38"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K38 + R38"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M38 + T38"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 745746.48
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 4571799.35
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5012813.03
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M38/ (T38 + M38)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 1006436.8899999999
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5145083.34
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5334538.120000003
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T38 / (T38 + M38)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I39 + P39"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K39 + R39"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M39 + T39"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M39/ (T39 + M39)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T39 / (T39 + M39)"
                            }
                        },
                        {
                            "metric": "COGS",
                            "seasonyear": {
                                "value": "COGS FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I40 + P40"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K40 + R40"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M40 + T40"
                            },
                            "total_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M40/ (T40 + M40)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "COGS",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T40 / (T40 + M40)"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM$",
                            "seasonyear": {
                                "value": "GM$ FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "GM%",
                            "seasonyear": {
                                "value": "GM% FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I81 + P81"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I81 + P81)-(I85 + P85)) /(I85 + P85)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K81 + R81"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K81 + R81)-(K85 + R85)) /(K85 + R85)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M81 + T81"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M81 + T81) - ( M85 + T85))/ ( M85 + T85) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 32594072.08
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I81 - I85)/I85"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 32519975.119999997
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K81 - K85)/K85"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 31769434.13
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M81 - M85)/M85"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M81/ (T81 + M81)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 39840166.690000005
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P81 - P85) /P85"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 40743158.14
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R81 - R85) /R85"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 40285864.16
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T81 - T85) /T85"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T81 / (T81 + M81)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I82 + P82"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I82 + P82)-(I86 + P86)) /(I86 + P86)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K82 + R82"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K82 + R82)-(K86 + R86)) /(K86 + R86)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M82 + T82"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M82 + T82) - ( M86 + T86))/ ( M86 + T86) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 32594072.08
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I82 - I86)/I86"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 32519975.119999997
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K82 - K86)/K86"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 31769434.13
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M82 - M86)/M86"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M82/ (T82 + M82)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 39840166.690000005
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P82 - P86) /P86"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 40743158.14
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R82 - R86) /R86"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 40285864.16
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T82 - T86) /T86"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T82 / (T82 + M82)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I83 + P83"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I83 + P83)-(I87 + P87)) /(I87 + P87)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K83 + R83"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K83 + R83)-(K87 + R87)) /(K87 + R87)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M83 + T83"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M83 + T83) - ( M87 + T87))/ ( M87 + T87) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I83 - I87)/I87"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K83 - K87)/K87"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M83 - M87)/M87"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M83/ (T83 + M83)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P83 - P87) /P87"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R83 - R87) /R87"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T83 - T87) /T87"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T83 / (T83 + M83)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I84 + P84"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I84 + P84)-(I88 + P88)) /(I88 + P88)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K84 + R84"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K84 + R84)-(K88 + R88)) /(K88 + R88)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M84 + T84"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M84 + T84) - ( M88 + T88))/ ( M88 + T88) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I84 - I88)/I88"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K84 - K88)/K88"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M84 - M88)/M88"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M84/ (T84 + M84)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P84 - P88) /P88"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R84 - R88) /R88"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T84 - T88) /T88"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T84 / (T84 + M84)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I85 + P85"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I85 + P85)-(I89 + P89)) /(I89 + P89)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K85 + R85"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K85 + R85)-(K89 + R89)) /(K89 + R89)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M85 + T85"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M85 + T85) - ( M89 + T89))/ ( M89 + T89) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 18797400.61
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I85 - I89)/I89"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 19164986.48
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K85 - K89)/K89"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 18972269.04
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M85 - M89)/M89"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M85/ (T85 + M85)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 24029431.400000002
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P85 - P89) /P89"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 24249594.020000003
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R85 - R89) /R89"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 23862351.610000003
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T85 - T89) /T89"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T85 / (T85 + M85)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I86 + P86"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I86 + P86)-(I90 + P90)) /(I90 + P90)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K86 + R86"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K86 + R86)-(K90 + R90)) /(K90 + R90)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M86 + T86"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M86 + T86) - ( M90 + T90))/ ( M90 + T90) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 18797400.61
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I86 - I90)/I90"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 19164986.48
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K86 - K90)/K90"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 18972269.04
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M86 - M90)/M90"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M86/ (T86 + M86)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 24029431.400000002
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P86 - P90) /P90"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 24249594.020000003
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R86 - R90) /R90"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 23862351.610000003
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T86 - T90) /T90"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T86 / (T86 + M86)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I87 + P87"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I87 + P87)-(I91 + P91)) /(I91 + P91)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K87 + R87"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K87 + R87)-(K91 + R91)) /(K91 + R91)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M87 + T87"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M87 + T87) - ( M91 + T91))/ ( M91 + T91) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I87 - I91)/I91"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K87 - K91)/K91"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M87 - M91)/M91"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M87/ (T87 + M87)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P87 - P91) /P91"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R87 - R91) /R91"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T87 - T91) /T91"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T87 / (T87 + M87)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I88 + P88"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I88 + P88)-(I92 + P92)) /(I92 + P92)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K88 + R88"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K88 + R88)-(K92 + R92)) /(K92 + R92)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M88 + T88"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M88 + T88) - ( M92 + T92))/ ( M92 + T92) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I88 - I92)/I92"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K88 - K92)/K92"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M88 - M92)/M92"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M88/ (T88 + M88)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P88 - P92) /P92"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R88 - R92) /R92"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T88 - T92) /T92"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T88 / (T88 + M88)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I89 + P89"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I89 + P89)-(I93 + P93)) /(I93 + P93)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K89 + R89"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K89 + R89)-(K93 + R93)) /(K93 + R93)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M89 + T89"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M89 + T89) - ( M93 + T93))/ ( M93 + T93) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 13825771.330000002
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I89 - I93)/I93"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 14089233.510000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K89 - K93)/K93"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 14049458.67
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M89 - M93)/M93"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M89/ (T89 + M89)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 16958642.5
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P89 - P93) /P93"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 17375494.439999998
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R89 - R93) /R93"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 17272157.05
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T89 - T93) /T93"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T89 / (T89 + M89)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I90 + P90"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I90 + P90)-(I94 + P94)) /(I94 + P94)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K90 + R90"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K90 + R90)-(K94 + R94)) /(K94 + R94)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M90 + T90"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M90 + T90) - ( M94 + T94))/ ( M94 + T94) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 13825771.330000002
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I90 - I94)/I94"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 14089233.510000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K90 - K94)/K94"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 14049458.67
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M90 - M94)/M94"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M90/ (T90 + M90)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 16958642.5
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P90 - P94) /P94"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 17375494.439999998
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R90 - R94) /R94"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 17272157.05
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T90 - T94) /T94"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T90 / (T90 + M90)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I91 + P91"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I91 + P91)-(I95 + P95)) /(I95 + P95)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K91 + R91"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K91 + R91)-(K95 + R95)) /(K95 + R95)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M91 + T91"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M91 + T91) - ( M95 + T95))/ ( M95 + T95) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I91 - I95)/I95"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K91 - K95)/K95"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M91 - M95)/M95"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M91/ (T91 + M91)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P91 - P95) /P95"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R91 - R95) /R95"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T91 - T95) /T95"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T91 / (T91 + M91)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I92 + P92"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I92 + P92)-(I96 + P96)) /(I96 + P96)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K92 + R92"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K92 + R92)-(K96 + R96)) /(K96 + R96)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M92 + T92"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M92 + T92) - ( M96 + T96))/ ( M96 + T96) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I92 - I96)/I96"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K92 - K96)/K96"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M92 - M96)/M96"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M92/ (T92 + M92)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P92 - P96) /P96"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R92 - R96) /R96"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T92 - T96) /T96"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T92 / (T92 + M92)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I93 + P93"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I93 + P93)-(I97 + P97)) /(I97 + P97)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K93 + R93"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K93 + R93)-(K97 + R97)) /(K97 + R97)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M93 + T93"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M93 + T93) - ( M97 + T97))/ ( M97 + T97) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 8739198.120000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I93 - I97)/I97"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 9239938.840000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K93 - K97)/K97"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 9233363.550000004
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M93 - M97)/M97"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M93/ (T93 + M93)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 10040857.86
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P93 - P97) /P97"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 10391582.629999999
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R93 - R97) /R97"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 10376251.639999997
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T93 - T97) /T97"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T93 / (T93 + M93)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I94 + P94"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I94 + P94)-(I98 + P98)) /(I98 + P98)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K94 + R94"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K94 + R94)-(K98 + R98)) /(K98 + R98)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M94 + T94"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M94 + T94) - ( M98 + T98))/ ( M98 + T98) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 8739198.120000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I94 - I98)/I98"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9239938.840000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K94 - K98)/K98"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9233363.550000004
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M94 - M98)/M98"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M94/ (T94 + M94)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 10040857.86
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P94 - P98) /P98"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 10391582.629999999
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R94 - R98) /R98"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 10376251.639999997
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T94 - T98) /T98"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T94 / (T94 + M94)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I95 + P95"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I95 + P95)-(I99 + P99)) /(I99 + P99)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K95 + R95"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K95 + R95)-(K99 + R99)) /(K99 + R99)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M95 + T95"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M95 + T95) - ( M99 + T99))/ ( M99 + T99) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I95 - I99)/I99"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K95 - K99)/K99"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M95 - M99)/M99"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M95/ (T95 + M95)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P95 - P99) /P99"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R95 - R99) /R99"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T95 - T99) /T99"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T95 / (T95 + M95)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I96 + P96"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I96 + P96)-(I100 + P100)) /(I100 + P100)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K96 + R96"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K96 + R96)-(K100 + R100)) /(K100 + R100)"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M96 + T96"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M96 + T96) - ( M100 + T100))/ ( M100 + T100) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I96 - I100)/I100"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K96 - K100)/K100"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M96 - M100)/M100"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M96/ (T96 + M96)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P96 - P100) /P100"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R96 - R100) /R100"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T96 - T100) /T100"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T96 / (T96 + M96)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I97 + P97"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K97 + R97"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M97 + T97"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 4803378.14
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 5041020.39
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 5036558.79
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M97/ (T97 + M97)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 5230898.720000001
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 5347965.58
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": 5330556.379999999
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T97 / (T97 + M97)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I98 + P98"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K98 + R98"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M98 + T98"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 4803378.14
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5041020.39
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5036558.79
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M98/ (T98 + M98)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5230898.720000001
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5347965.58
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 5330556.379999999
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T98 / (T98 + M98)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I99 + P99"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K99 + R99"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M99 + T99"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M99/ (T99 + M99)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T99 / (T99 + M99)"
                            }
                        },
                        {
                            "metric": "RECEIPT$",
                            "seasonyear": {
                                "value": "RECEIVED COST FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I100 + P100"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K100 + R100"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M100 + T100"
                            },
                            "total_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M100/ (T100 + M100)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "RECEIVED COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T100 / (T100 + M100)"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "RECEIPT%",
                            "seasonyear": {
                                "value": "RECEIPT% FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I121 + P121"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I121 + P121)-(I125 + P125)) /(I125 + P125)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K121 + R121"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K121 + R121)-(K125 + R125)) /(K125 + R125)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M121 + T121"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M121 + T121) - ( M125 + T125))/ ( M125 + T125) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 76563598.12
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I121 - I125)/I125"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 126002383.91000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K121 - K125)/K125"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 159826705
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M121 - M125)/M125"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M121/ (T121 + M121)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 103490573.45
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P121 - P125) /P125"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 170778196.51000002
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R121 - R125) /R125"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 214881859.90999997
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T121 - T125) /T125"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T121 / (T121 + M121)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I122 + P122"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I122 + P122)-(I126 + P126)) /(I126 + P126)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K122 + R122"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K122 + R122)-(K126 + R126)) /(K126 + R126)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M122 + T122"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M122 + T122) - ( M126 + T126))/ ( M126 + T126) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 76563598.12
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I122 - I126)/I126"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 126002383.91000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K122 - K126)/K126"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 159826705
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M122 - M126)/M126"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M122/ (T122 + M122)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 103490573.45
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P122 - P126) /P126"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 170778196.51000002
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R122 - R126) /R126"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 214881859.90999997
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T122 - T126) /T126"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T122 / (T122 + M122)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I123 + P123"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I123 + P123)-(I127 + P127)) /(I127 + P127)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K123 + R123"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K123 + R123)-(K127 + R127)) /(K127 + R127)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M123 + T123"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M123 + T123) - ( M127 + T127))/ ( M127 + T127) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I123 - I127)/I127"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K123 - K127)/K127"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M123 - M127)/M127"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M123/ (T123 + M123)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P123 - P127) /P127"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R123 - R127) /R127"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T123 - T127) /T127"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T123 / (T123 + M123)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I124 + P124"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I124 + P124)-(I128 + P128)) /(I128 + P128)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K124 + R124"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K124 + R124)-(K128 + R128)) /(K128 + R128)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M124 + T124"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M124 + T124) - ( M128 + T128))/ ( M128 + T128) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I124 - I128)/I128"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K124 - K128)/K128"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M124 - M128)/M128"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M124/ (T124 + M124)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P124 - P128) /P128"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R124 - R128) /R128"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T124 - T128) /T128"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T124 / (T124 + M124)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I125 + P125"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I125 + P125)-(I129 + P129)) /(I129 + P129)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K125 + R125"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K125 + R125)-(K129 + R129)) /(K129 + R129)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M125 + T125"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M125 + T125) - ( M129 + T129))/ ( M129 + T129) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 39593784.41
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I125 - I129)/I129"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 68703035.21
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K125 - K129)/K129"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 98204165.89999999
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M125 - M129)/M129"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M125/ (T125 + M125)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 52858855.41
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P125 - P129) /P129"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 90942330.88
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R125 - R129) /R129"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 119868691.12999998
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T125 - T129) /T129"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T125 / (T125 + M125)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I126 + P126"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I126 + P126)-(I130 + P130)) /(I130 + P130)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K126 + R126"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K126 + R126)-(K130 + R130)) /(K130 + R130)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M126 + T126"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M126 + T126) - ( M130 + T130))/ ( M130 + T130) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 39593784.41
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I126 - I130)/I130"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 68703035.21
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K126 - K130)/K130"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 98204165.89999999
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M126 - M130)/M130"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M126/ (T126 + M126)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 52858855.41
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P126 - P130) /P130"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 90942330.88
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R126 - R130) /R130"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 119868691.12999998
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T126 - T130) /T130"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T126 / (T126 + M126)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I127 + P127"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I127 + P127)-(I131 + P131)) /(I131 + P131)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K127 + R127"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K127 + R127)-(K131 + R131)) /(K131 + R131)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M127 + T127"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M127 + T127) - ( M131 + T131))/ ( M131 + T131) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I127 - I131)/I131"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K127 - K131)/K131"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M127 - M131)/M131"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M127/ (T127 + M127)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P127 - P131) /P131"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R127 - R131) /R131"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T127 - T131) /T131"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T127 / (T127 + M127)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I128 + P128"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I128 + P128)-(I132 + P132)) /(I132 + P132)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K128 + R128"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K128 + R128)-(K132 + R132)) /(K132 + R132)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M128 + T128"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M128 + T128) - ( M132 + T132))/ ( M132 + T132) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I128 - I132)/I132"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K128 - K132)/K132"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M128 - M132)/M132"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M128/ (T128 + M128)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P128 - P132) /P132"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R128 - R132) /R132"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T128 - T132) /T132"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T128 / (T128 + M128)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I129 + P129"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I129 + P129)-(I133 + P133)) /(I133 + P133)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K129 + R129"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K129 + R129)-(K133 + R133)) /(K133 + R133)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M129 + T129"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M129 + T129) - ( M133 + T133))/ ( M133 + T133) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 27468418.520000003
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I129 - I133)/I133"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 51470296.02000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K129 - K133)/K133"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 70901107.24000002
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M129 - M133)/M133"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M129/ (T129 + M129)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 34211559.510000005
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P129 - P133) /P133"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 63284655.800000004
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R129 - R133) /R133"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 84291055.16000003
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T129 - T133) /T133"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T129 / (T129 + M129)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I130 + P130"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I130 + P130)-(I134 + P134)) /(I134 + P134)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K130 + R130"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K130 + R130)-(K134 + R134)) /(K134 + R134)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M130 + T130"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M130 + T130) - ( M134 + T134))/ ( M134 + T134) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 27468418.520000003
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I130 - I134)/I134"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 51470296.02000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K130 - K134)/K134"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 70901107.24000002
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M130 - M134)/M134"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M130/ (T130 + M130)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 34211559.510000005
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P130 - P134) /P134"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 63284655.800000004
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R130 - R134) /R134"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 84291055.16000003
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T130 - T134) /T134"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T130 / (T130 + M130)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I131 + P131"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I131 + P131)-(I135 + P135)) /(I135 + P135)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K131 + R131"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K131 + R131)-(K135 + R135)) /(K135 + R135)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M131 + T131"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M131 + T131) - ( M135 + T135))/ ( M135 + T135) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I131 - I135)/I135"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K131 - K135)/K135"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M131 - M135)/M135"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M131/ (T131 + M131)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P131 - P135) /P135"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R131 - R135) /R135"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T131 - T135) /T135"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T131 / (T131 + M131)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I132 + P132"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I132 + P132)-(I136 + P136)) /(I136 + P136)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K132 + R132"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K132 + R132)-(K136 + R136)) /(K136 + R136)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M132 + T132"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M132 + T132) - ( M136 + T136))/ ( M136 + T136) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I132 - I136)/I136"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K132 - K136)/K136"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M132 - M136)/M136"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M132/ (T132 + M132)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P132 - P136) /P136"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R132 - R136) /R136"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T132 - T136) /T136"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T132 / (T132 + M132)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I133 + P133"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I133 + P133)-(I137 + P137)) /(I137 + P137)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K133 + R133"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K133 + R133)-(K137 + R137)) /(K137 + R137)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M133 + T133"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M133 + T133) - ( M137 + T137))/ ( M137 + T137) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 16488857.530000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I133 - I137)/I137"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 32678372.55
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K133 - K137)/K137"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 40319480.719999984
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M133 - M137)/M137"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M133/ (T133 + M133)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 19604905.869999997
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P133 - P137) /P137"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 36077794.199999996
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R133 - R137) /R137"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 40561511.74999994
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T133 - T137) /T137"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T133 / (T133 + M133)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I134 + P134"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I134 + P134)-(I138 + P138)) /(I138 + P138)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K134 + R134"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K134 + R134)-(K138 + R138)) /(K138 + R138)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M134 + T134"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M134 + T134) - ( M138 + T138))/ ( M138 + T138) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 16488857.530000001
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I134 - I138)/I138"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 32678372.55
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K134 - K138)/K138"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 40319480.719999984
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M134 - M138)/M138"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M134/ (T134 + M134)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 19604905.869999997
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P134 - P138) /P138"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 36077794.199999996
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R134 - R138) /R138"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 40561511.74999994
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T134 - T138) /T138"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T134 / (T134 + M134)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I135 + P135"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I135 + P135)-(I139 + P139)) /(I139 + P139)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K135 + R135"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K135 + R135)-(K139 + R139)) /(K139 + R139)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M135 + T135"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M135 + T135) - ( M139 + T139))/ ( M139 + T139) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I135 - I139)/I139"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K135 - K139)/K139"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M135 - M139)/M139"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M135/ (T135 + M135)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P135 - P139) /P139"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R135 - R139) /R139"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T135 - T139) /T139"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T135 / (T135 + M135)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I136 + P136"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I136 + P136)-(I140 + P140)) /(I140 + P140)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K136 + R136"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K136 + R136)-(K140 + R140)) /(K140 + R140)"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M136 + T136"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M136 + T136) - ( M140 + T140))/ ( M140 + T140) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I136 - I140)/I140"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K136 - K140)/K140"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M136 - M140)/M140"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M136/ (T136 + M136)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P136 - P140) /P140"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R136 - R140) /R140"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T136 - T140) /T140"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T136 / (T136 + M136)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= I137 + P137"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= K137 + R137"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "= M137 + T137"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 8135789.77
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 17170622.69
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 21680263.96
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=M137/ (T137 + M137)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 9096919.31
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 18019905.09
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": 19586373.52999998
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act",
                                "key": 0,
                                "value": "=T137 / (T137 + M137)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I138 + P138"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K138 + R138"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M138 + T138"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 8135789.77
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 17170622.69
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 21680263.96
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M138/ (T138 + M138)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 9096919.31
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 18019905.09
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 19586373.52999998
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T138 / (T138 + M138)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I139 + P139"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K139 + R139"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M139 + T139"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M139/ (T139 + M139)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T139 / (T139 + M139)"
                            }
                        },
                        {
                            "metric": "BOM",
                            "seasonyear": {
                                "value": "BOM COST FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I140 + P140"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K140 + R140"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M140 + T140"
                            },
                            "total_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M140/ (T140 + M140)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "BOM COST",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T140 / (T140 + M140)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= I141 + P141"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I141 + P141)-(I145 + P145)) /(I145 + P145)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= K141 + R141"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K141 + R141)-(K145 + R145)) /(K145 + R145)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= M141 + T141"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M141 + T141) - ( M145 + T145))/ ( M145 + T145) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 19935011.79
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I141 - I145)/I145"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 78586957.74000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K141 - K145)/K145"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 87812355.1
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M141 - M145)/M145"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=M141/ (T141 + M141)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 20674684.35
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P141 - P145) /P145"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 98525043.64
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R141 - R145) /R145"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 112052517.39
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T141 - T145) /T145"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=T141 / (T141 + M141)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I142 + P142"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I142 + P142)-(I146 + P146)) /(I146 + P146)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K142 + R142"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K142 + R142)-(K146 + R146)) /(K146 + R146)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M142 + T142"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M142 + T142) - ( M146 + T146))/ ( M146 + T146) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 19935011.79
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I142 - I146)/I146"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 78586957.74000001
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K142 - K146)/K146"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 87812355.1
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M142 - M146)/M146"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M142/ (T142 + M142)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 20674684.35
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P142 - P146) /P146"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 98525043.64
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R142 - R146) /R146"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 112052517.39
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T142 - T146) /T146"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T142 / (T142 + M142)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I143 + P143"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I143 + P143)-(I147 + P147)) /(I147 + P147)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K143 + R143"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K143 + R143)-(K147 + R147)) /(K147 + R147)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M143 + T143"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M143 + T143) - ( M147 + T147))/ ( M147 + T147) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I143 - I147)/I147"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K143 - K147)/K147"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M143 - M147)/M147"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M143/ (T143 + M143)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P143 - P147) /P147"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R143 - R147) /R147"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T143 - T147) /T147"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T143 / (T143 + M143)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I144 + P144"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I144 + P144)-(I148 + P148)) /(I148 + P148)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K144 + R144"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K144 + R144)-(K148 + R148)) /(K148 + R148)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M144 + T144"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M144 + T144) - ( M148 + T148))/ ( M148 + T148) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I144 - I148)/I148"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K144 - K148)/K148"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M144 - M148)/M148"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M144/ (T144 + M144)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P144 - P148) /P148"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R144 - R148) /R148"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T144 - T148) /T148"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T144 / (T144 + M144)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= I145 + P145"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I145 + P145)-(I149 + P149)) /(I149 + P149)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= K145 + R145"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K145 + R145)-(K149 + R149)) /(K149 + R149)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= M145 + T145"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M145 + T145) - ( M149 + T149))/ ( M149 + T149) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 11757877.45
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I145 - I149)/I149"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 47561953.449999996
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K145 - K149)/K149"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 55940873.78
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M145 - M149)/M149"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=M145/ (T145 + M145)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 15068480.990000002
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P145 - P149) /P149"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 62454384.64
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R145 - R149) /R149"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 72895805.84
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T145 - T149) /T149"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=T145 / (T145 + M145)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I146 + P146"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I146 + P146)-(I150 + P150)) /(I150 + P150)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K146 + R146"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K146 + R146)-(K150 + R150)) /(K150 + R150)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M146 + T146"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M146 + T146) - ( M150 + T150))/ ( M150 + T150) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 11757877.45
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I146 - I150)/I150"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 47561953.449999996
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K146 - K150)/K150"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 55940873.78
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M146 - M150)/M150"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M146/ (T146 + M146)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 15068480.990000002
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P146 - P150) /P150"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 62454384.64
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R146 - R150) /R150"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 72895805.84
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T146 - T150) /T150"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T146 / (T146 + M146)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I147 + P147"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I147 + P147)-(I151 + P151)) /(I151 + P151)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K147 + R147"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K147 + R147)-(K151 + R151)) /(K151 + R151)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M147 + T147"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M147 + T147) - ( M151 + T151))/ ( M151 + T151) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I147 - I151)/I151"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K147 - K151)/K151"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M147 - M151)/M151"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M147/ (T147 + M147)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P147 - P151) /P151"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R147 - R151) /R151"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T147 - T151) /T151"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T147 / (T147 + M147)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I148 + P148"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I148 + P148)-(I152 + P152)) /(I152 + P152)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K148 + R148"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K148 + R148)-(K152 + R152)) /(K152 + R152)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M148 + T148"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M148 + T148) - ( M152 + T152))/ ( M152 + T152) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I148 - I152)/I152"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K148 - K152)/K152"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M148 - M152)/M152"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M148/ (T148 + M148)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P148 - P152) /P152"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R148 - R152) /R152"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T148 - T152) /T152"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T148 / (T148 + M148)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= I149 + P149"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I149 + P149)-(I153 + P153)) /(I153 + P153)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= K149 + R149"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K149 + R149)-(K153 + R153)) /(K153 + R153)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= M149 + T149"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M149 + T149) - ( M153 + T153))/ ( M153 + T153) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 4936471
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I149 - I153)/I153"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 36432918.97
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K149 - K153)/K153"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 40485407.96
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M149 - M153)/M153"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=M149/ (T149 + M149)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 8041250.99
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P149 - P153) /P153"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 46435534.400000006
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R149 - R153) /R153"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 52581494.18000001
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T149 - T153) /T153"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=T149 / (T149 + M149)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I150 + P150"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I150 + P150)-(I154 + P154)) /(I154 + P154)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K150 + R150"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K150 + R150)-(K154 + R154)) /(K154 + R154)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M150 + T150"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M150 + T150) - ( M154 + T154))/ ( M154 + T154) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 4936471
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I150 - I154)/I154"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 36432918.97
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K150 - K154)/K154"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 40485407.96
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M150 - M154)/M154"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M150/ (T150 + M150)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 8041250.99
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P150 - P154) /P154"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 46435534.400000006
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R150 - R154) /R154"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 52581494.18000001
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T150 - T154) /T154"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T150 / (T150 + M150)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I151 + P151"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I151 + P151)-(I155 + P155)) /(I155 + P155)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K151 + R151"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K151 + R151)-(K155 + R155)) /(K155 + R155)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M151 + T151"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M151 + T151) - ( M155 + T155))/ ( M155 + T155) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I151 - I155)/I155"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K151 - K155)/K155"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M151 - M155)/M155"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M151/ (T151 + M151)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P151 - P155) /P155"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R151 - R155) /R155"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T151 - T155) /T155"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T151 / (T151 + M151)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I152 + P152"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I152 + P152)-(I156 + P156)) /(I156 + P156)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K152 + R152"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K152 + R152)-(K156 + R156)) /(K156 + R156)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M152 + T152"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M152 + T152) - ( M156 + T156))/ ( M156 + T156) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I152 - I156)/I156"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K152 - K156)/K156"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M152 - M156)/M156"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M152/ (T152 + M152)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P152 - P156) /P156"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R152 - R156) /R156"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T152 - T156) /T156"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T152 / (T152 + M152)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= I153 + P153"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I153 + P153)-(I157 + P157)) /(I157 + P157)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= K153 + R153"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K153 + R153)-(K157 + R157)) /(K157 + R157)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= M153 + T153"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M153 + T153) - ( M157 + T157))/ ( M157 + T157) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 3693718.79
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I153 - I157)/I157"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 23413686.810000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K153 - K157)/K157"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 25957596.319999997
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M153 - M157)/M157"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=M153/ (T153 + M153)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 6131348.94
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P153 - P157) /P157"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 28478508.9
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R153 - R157) /R157"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 29984618.769999996
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T153 - T157) /T157"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=T153 / (T153 + M153)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I154 + P154"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I154 + P154)-(I158 + P158)) /(I158 + P158)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K154 + R154"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K154 + R154)-(K158 + R158)) /(K158 + R158)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M154 + T154"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M154 + T154) - ( M158 + T158))/ ( M158 + T158) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 3693718.79
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I154 - I158)/I158"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 23413686.810000002
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K154 - K158)/K158"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 25957596.319999997
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M154 - M158)/M158"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M154/ (T154 + M154)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 6131348.94
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P154 - P158) /P158"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 28478508.9
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R154 - R158) /R158"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 29984618.769999996
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T154 - T158) /T158"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T154 / (T154 + M154)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I155 + P155"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I155 + P155)-(I159 + P159)) /(I159 + P159)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K155 + R155"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K155 + R155)-(K159 + R159)) /(K159 + R159)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M155 + T155"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M155 + T155) - ( M159 + T159))/ ( M159 + T159) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I155 - I159)/I159"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K155 - K159)/K159"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M155 - M159)/M159"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M155/ (T155 + M155)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P155 - P159) /P159"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R155 - R159) /R159"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T155 - T159) /T159"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T155 / (T155 + M155)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I156 + P156"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I156 + P156)-(I160 + P160)) /(I160 + P160)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K156 + R156"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K156 + R156)-(K160 + R160)) /(K160 + R160)"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M156 + T156"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M156 + T156) - ( M160 + T160))/ ( M160 + T160) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I156 - I160)/I160"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K156 - K160)/K160"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M156 - M160)/M160"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M156/ (T156 + M156)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P156 - P160) /P160"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R156 - R160) /R160"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T156 - T160) /T160"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T156 / (T156 + M156)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= I157 + P157"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= K157 + R157"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "= M157 + T157"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 2010901.33
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 12486189.299999999
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 13755800.88
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=M157/ (T157 + M157)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 2844335.04
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 14427755.879999999
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": 14944738.630000003
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act",
                                "key": 0,
                                "value": "=T157 / (T157 + M157)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I158 + P158"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K158 + R158"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M158 + T158"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 2010901.33
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 12486189.299999999
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 13755800.88
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M158/ (T158 + M158)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 2844335.04
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 14427755.879999999
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 14944738.630000003
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T158 / (T158 + M158)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I159 + P159"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K159 + R159"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M159 + T159"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M159/ (T159 + M159)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T159 / (T159 + M159)"
                            }
                        },
                        {
                            "metric": "iSALE",
                            "seasonyear": {
                                "value": "iRETAIL FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I160 + P160"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K160 + R160"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M160 + T160"
                            },
                            "total_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M160/ (T160 + M160)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "iRETAIL",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T160 / (T160 + M160)"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "iGM%",
                            "seasonyear": {
                                "value": "iGM% FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "total_full": {
                                "value": "N/A"
                            },
                            "total_full_incr": {
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "women_full": {
                                "value": "N/A"
                            },
                            "women_full_incr": {
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "value": "N/A"
                            },
                            "men_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpremarkdown": {
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_incr_stdpostmarkdown": {
                                "value": "N/A"
                            },
                            "men_full": {
                                "value": "N/A"
                            },
                            "men_full_incr": {
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "value": "N/A"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW16 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= I181 + P181"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I181 + P181)-(I185 + P185)) /(I185 + P185)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= K181 + R181"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K181 + R181)-(K185 + R185)) /(K185 + R185)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= M181 + T181"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M181 + T181) - ( M185 + T185))/ ( M185 + T185) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I181 - I185)/I185"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K181 - K185)/K185"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M181 - M185)/M185"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=M181/ (T181 + M181)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P181 - P185) /P185"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R181 - R185) /R185"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T181 - T185) /T185"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=T181 / (T181 + M181)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW16 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I182 + P182"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I182 + P182)-(I186 + P186)) /(I186 + P186)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K182 + R182"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K182 + R182)-(K186 + R186)) /(K186 + R186)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M182 + T182"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M182 + T182) - ( M186 + T186))/ ( M186 + T186) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I182 - I186)/I186"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K182 - K186)/K186"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M182 - M186)/M186"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M182/ (T182 + M182)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P182 - P186) /P186"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R182 - R186) /R186"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T182 - T186) /T186"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T182 / (T182 + M182)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW16 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I183 + P183"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I183 + P183)-(I187 + P187)) /(I187 + P187)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K183 + R183"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K183 + R183)-(K187 + R187)) /(K187 + R187)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M183 + T183"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M183 + T183) - ( M187 + T187))/ ( M187 + T187) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I183 - I187)/I187"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K183 - K187)/K187"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M183 - M187)/M187"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M183/ (T183 + M183)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P183 - P187) /P187"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R183 - R187) /R187"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T183 - T187) /T187"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T183 / (T183 + M183)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW16 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I184 + P184"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I184 + P184)-(I188 + P188)) /(I188 + P188)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K184 + R184"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K184 + R184)-(K188 + R188)) /(K188 + R188)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M184 + T184"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M184 + T184) - ( M188 + T188))/ ( M188 + T188) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I184 - I188)/I188"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K184 - K188)/K188"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M184 - M188)/M188"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M184/ (T184 + M184)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P184 - P188) /P188"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R184 - R188) /R188"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T184 - T188) /T188"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T184 / (T184 + M184)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW15 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= I185 + P185"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I185 + P185)-(I189 + P189)) /(I189 + P189)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= K185 + R185"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K185 + R185)-(K189 + R189)) /(K189 + R189)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= M185 + T185"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M185 + T185) - ( M189 + T189))/ ( M189 + T189) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I185 - I189)/I189"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K185 - K189)/K189"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M185 - M189)/M189"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=M185/ (T185 + M185)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P185 - P189) /P189"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R185 - R189) /R189"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T185 - T189) /T189"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=T185 / (T185 + M185)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW15 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I186 + P186"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I186 + P186)-(I190 + P190)) /(I190 + P190)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K186 + R186"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K186 + R186)-(K190 + R190)) /(K190 + R190)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M186 + T186"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M186 + T186) - ( M190 + T190))/ ( M190 + T190) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I186 - I190)/I190"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K186 - K190)/K190"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M186 - M190)/M190"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M186/ (T186 + M186)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P186 - P190) /P190"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R186 - R190) /R190"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T186 - T190) /T190"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T186 / (T186 + M186)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW15 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I187 + P187"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I187 + P187)-(I191 + P191)) /(I191 + P191)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K187 + R187"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K187 + R187)-(K191 + R191)) /(K191 + R191)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M187 + T187"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M187 + T187) - ( M191 + T191))/ ( M191 + T191) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I187 - I191)/I191"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K187 - K191)/K191"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M187 - M191)/M191"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M187/ (T187 + M187)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P187 - P191) /P191"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R187 - R191) /R191"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T187 - T191) /T191"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T187 / (T187 + M187)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW15 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I188 + P188"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I188 + P188)-(I192 + P192)) /(I192 + P192)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K188 + R188"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K188 + R188)-(K192 + R192)) /(K192 + R192)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M188 + T188"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M188 + T188) - ( M192 + T192))/ ( M192 + T192) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I188 - I192)/I192"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K188 - K192)/K192"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M188 - M192)/M192"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M188/ (T188 + M188)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P188 - P192) /P192"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R188 - R192) /R192"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T188 - T192) /T192"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T188 / (T188 + M188)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW14 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= I189 + P189"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I189 + P189)-(I193 + P193)) /(I193 + P193)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= K189 + R189"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K189 + R189)-(K193 + R193)) /(K193 + R193)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= M189 + T189"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M189 + T189) - ( M193 + T193))/ ( M193 + T193) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I189 - I193)/I193"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K189 - K193)/K193"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M189 - M193)/M193"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=M189/ (T189 + M189)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P189 - P193) /P193"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R189 - R193) /R193"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T189 - T193) /T193"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=T189 / (T189 + M189)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW14 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I190 + P190"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I190 + P190)-(I194 + P194)) /(I194 + P194)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K190 + R190"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K190 + R190)-(K194 + R194)) /(K194 + R194)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M190 + T190"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M190 + T190) - ( M194 + T194))/ ( M194 + T194) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I190 - I194)/I194"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K190 - K194)/K194"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M190 - M194)/M194"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M190/ (T190 + M190)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P190 - P194) /P194"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R190 - R194) /R194"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T190 - T194) /T194"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T190 / (T190 + M190)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW14 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I191 + P191"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I191 + P191)-(I195 + P195)) /(I195 + P195)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K191 + R191"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K191 + R191)-(K195 + R195)) /(K195 + R195)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M191 + T191"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M191 + T191) - ( M195 + T195))/ ( M195 + T195) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I191 - I195)/I195"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K191 - K195)/K195"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M191 - M195)/M195"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M191/ (T191 + M191)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P191 - P195) /P195"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R191 - R195) /R195"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T191 - T195) /T195"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T191 / (T191 + M191)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW14 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I192 + P192"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I192 + P192)-(I196 + P196)) /(I196 + P196)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K192 + R192"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K192 + R192)-(K196 + R196)) /(K196 + R196)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M192 + T192"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M192 + T192) - ( M196 + T196))/ ( M196 + T196) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I192 - I196)/I196"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K192 - K196)/K196"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M192 - M196)/M196"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M192/ (T192 + M192)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P192 - P196) /P196"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R192 - R196) /R196"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T192 - T196) /T196"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T192 / (T192 + M192)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW13 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= I193 + P193"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((I193 + P193)-(I197 + P197)) /(I197 + P197)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= K193 + R193"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((K193 + R193)-(K197 + R197)) /(K197 + R197)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= M193 + T193"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=((M193 + T193) - ( M197 + T197))/ ( M197 + T197) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(I193 - I197)/I197"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(K193 - K197)/K197"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=(M193 - M197)/M197"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=M193/ (T193 + M193)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (P193 - P197) /P197"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (R193 - R197) /R197"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= (T193 - T197) /T197"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=T193 / (T193 + M193)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW13 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I194 + P194"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((I194 + P194)-(I198 + P198)) /(I198 + P198)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K194 + R194"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((K194 + R194)-(K198 + R198)) /(K198 + R198)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M194 + T194"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=((M194 + T194) - ( M198 + T198))/ ( M198 + T198) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(I194 - I198)/I198"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(K194 - K198)/K198"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=(M194 - M198)/M198"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M194/ (T194 + M194)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (P194 - P198) /P198"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (R194 - R198) /R198"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= (T194 - T198) /T198"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T194 / (T194 + M194)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW13 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I195 + P195"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((I195 + P195)-(I199 + P199)) /(I199 + P199)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K195 + R195"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((K195 + R195)-(K199 + R199)) /(K199 + R199)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M195 + T195"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=((M195 + T195) - ( M199 + T199))/ ( M199 + T199) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(I195 - I199)/I199"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(K195 - K199)/K199"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=(M195 - M199)/M199"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M195/ (T195 + M195)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (P195 - P199) /P199"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (R195 - R199) /R199"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= (T195 - T199) /T199"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T195 / (T195 + M195)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW13 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I196 + P196"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((I196 + P196)-(I200 + P200)) /(I200 + P200)"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K196 + R196"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((K196 + R196)-(K200 + R200)) /(K200 + R200)"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M196 + T196"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=((M196 + T196) - ( M200 + T200))/ ( M200 + T200) "
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(I196 - I200)/I200"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(K196 - K200)/K200"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=(M196 - M200)/M200"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M196/ (T196 + M196)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (P196 - P200) /P200"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (R196 - R200) /R200"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= (T196 - T200) /T200"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T196 / (T196 + M196)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW12 Act"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= I197 + P197"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= K197 + R197"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "= M197 + T197"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=M197/ (T197 + M197)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act",
                                "key": 0,
                                "value": "=T197 / (T197 + M197)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW12 Act/Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= I198 + P198"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= K198 + R198"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "= M198 + T198"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=M198/ (T198 + M198)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Act/Proj",
                                "key": 0,
                                "value": "=T198 / (T198 + M198)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW12 Proj"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= I199 + P199"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= K199 + R199"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "= M199 + T199"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=M199/ (T199 + M199)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Proj",
                                "key": 0,
                                "value": "=T199 / (T199 + M199)"
                            }
                        },
                        {
                            "metric": "TURNOVER RATE",
                            "seasonyear": {
                                "value": "TURNOVER RATE FW12 Bdg"
                            },
                            "total_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= I200 + P200"
                            },
                            "total_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= K200 + R200"
                            },
                            "total_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "total_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "= M200 + T200"
                            },
                            "total_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "women_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "women_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=M200/ (T200 + M200)"
                            },
                            "men_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpremarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_incr_stdpostmarkdown": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": 0
                            },
                            "men_full_incr": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "N/A"
                            },
                            "men_full_cont": {
                                "metric": "TURNOVER RATE",
                                "property": "Bdg",
                                "key": 0,
                                "value": "=T200 / (T200 + M200)"
                            }
                        }
                    ],
                    "header": [
                        [
                            {
                                label: 'Metrics',
                                colspan: 2,
                            },
                            {
                                label: 'Total',
                                colspan: 6,
                            },
                            {
                                label: 'Women',
                                colspan: 7,
                            },
                            {
                                label: 'Men',
                                colspan: 7,
                            },
                        ],
                        [
                            "Name",
                            "Season",
                            "C-STD Pre Mkd",
                            "D-Incr %",
                            "E-STD Post Mkd",
                            "F-Incr %",
                            "G-Full Season",
                            "H-Incr %",
                            "I-STD Pre Mkd",
                            "J-Incr %",
                            "K-STD Post Mkd",
                            "L-Incr %",
                            "M-Full Season",
                            "N-Incr %",
                            "O-Cont %",
                            "P-STD Pre Mkd",
                            "Q-Incr %",
                            "R-STD Post Mkd",
                            "S-Incr %",
                            "T-Full Season",
                            "U-Incr %",
                            "V-Cont %",
                        ],
                    ],
                }, view)),
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
        );
    };
}

export function saveBudget(budget, id, view, data) {
    return (dispatch) => {
        dispatch(requestBudgetSave());
        return request
            .post(`${getApiUrl()}planning/budgets/${budget}/versions/${id}/${view}`)
            .send(data)
            .then(
            (res) => {
                dispatch(messages({ content: 'Budget Saved successfully!', response: '', isError: false }));
                dispatch(receiveBudgetSave(res.body));
            },
            err => dispatch(messages({ content: err, response: err.response, isError: true })),
            );
    };
}
