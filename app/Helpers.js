export default function getApiUrl() {
    // eslint-disable-next-line no-undef
    return process.env.NODE_ENV === 'test' ? `${UI_PLANNING_HOST}/api/` : '/api/';
}
