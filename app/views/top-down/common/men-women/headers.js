const commonColums = [
    'A-Name',
    'B-Season/Year',
    'C-STD Pre Mkd',
    'D-Incr%',
    'E-STD Post Mkd',
    'F-Incr%',
    'G-Full Season',
    'H-Incr%',
    'I-Previous',
];

const SS = [
    'J-Aug',
    'K-Sep',
    'L-Oct',
    'M-Nov',
    'N-Dec',
    'O-Jan',
    'P-Feb',
    'Q-Mar',
    'R-Apr',
    'S-May',
    'T-Jun',
    'U-Jul',
    'V-Aug',
    'W-Sep',
    'X-Oct',
    'Y-Nov',
    'Z-Dec',
    'AA-Jan',
    'AB-Future',
];

const FW = [
    'J-Feb',
    'K-Mar',
    'L-Apr',
    'M-May',
    'N-Jun',
    'O-Jul',
    'P-Aug',
    'Q-Sep',
    'R-Oct',
    'S-Nov',
    'T-Dec',
    'U-Jan',
    'V-Feb',
    'W-Mar',
    'X-Apr',
    'Y-May',
    'Z-Jun',
    'AA-Jul',
    'AB-Future',
];

const SSData = commonColums.concat(SS);
const FWData = commonColums.concat(FW);

const headers = [[SSData], [FWData]];

export default headers;
