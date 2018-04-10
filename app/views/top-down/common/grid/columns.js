/* istanbul ignore next */
export const leftBorderColumns = [
    'seasonyear',
    'stdpremarkdown',
    'previous',
];

/* istanbul ignore next */
export const disabledRows = [
    'GM$',
];

/* istanbul ignore next */
export const percentageRows = [
    'GM%',
    'iGM%',
    'RECEIPT%',
];

/* istanbul ignore next */
export const numberRows = [
    'TURNOVER RATE',
];

// TODO This will come from the api
/* istanbul ignore next */
const commonColumns = [
    {
        label: 'Name',
        name: 'metric',
        type: 'text',
        isReadOnly: true,
    },
    {
        label: 'Season/Year',
        name: 'seasonyear',
        type: 'text',
        isReadOnly: true,
    },
    {
        label: 'C-STD Pre Mkd',
        name: 'stdpremarkdown',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'D-Incr%',
        name: 'incr_stdpremarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        label: 'E-STD Post Mkd',
        name: 'stdpostmarkdown',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'F-Incr%',
        name: 'incr_stdpostmarkdown',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        label: 'G-Full Season',
        name: 'full',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'H-Incr%',
        name: 'full_incr',
        type: 'percentage',
        isReadOnly: true,
    },
    {
        label: 'I-Previous',
        name: 'previous',
        type: 'currency',
        isReadOnly: true,
    },
];

export const summerSpringColumns = [
    ...commonColumns,
    {
        label: 'J-Aug',
        name: 'aug0',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'K-Sep',
        name: 'sep0',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'L-Oct',
        name: 'oct0',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'M-Nov',
        name: 'nov0',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'N-Dec',
        name: 'dec0',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'O-Jan',
        name: 'jan1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'P-Feb',
        name: 'feb1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'Q-Mar',
        name: 'mar1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'R-Apr',
        name: 'apr1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'S-May',
        name: 'may1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'T-Jun',
        name: 'jun1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'U-Jul',
        name: 'jul1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'V-Aug',
        name: 'aug1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'W-Sep',
        name: 'sep1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'X-Oct',
        name: 'oct1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'Y-Nov',
        name: 'nov1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'Z-Dec',
        name: 'dec1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'AA-Jan',
        name: 'jan2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'AB-Future',
        name: 'future',
        type: 'currency',
        isReadOnly: false,
    },
];

export const fallWinterColumns = [
    ...commonColumns,
    {
        label: 'J-Feb',
        name: 'feb1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'K-Mar',
        name: 'mar1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'L-Apr',
        name: 'apr1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'M-May',
        name: 'may1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'N-Jun',
        name: 'jun1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'O-Jul',
        name: 'jul1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'P-Aug',
        name: 'aug1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'Q-Sep',
        name: 'sep1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'R-Oct',
        name: 'oct1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'S-Nov',
        name: 'nov1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'T-Dec',
        name: 'dec1',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'U-Jan',
        name: 'jan2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'V-Feb',
        name: 'feb2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'W-Mar',
        name: 'mar2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'X-Apr',
        name: 'apr2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'Y-May',
        name: 'may2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'Z-Jun',
        name: 'jun2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'AA-Jul',
        name: 'jul2',
        type: 'currency',
        isReadOnly: true,
    },
    {
        label: 'AB-Future',
        name: 'future',
        type: 'currency',
        isReadOnly: false,
    },
];
