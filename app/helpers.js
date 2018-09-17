export default function getApiUrl(withApi = true) {
    // @TODO: I don't really like this.
    // toogle prefixing path with `/api`
    // eslint-disable-next-line no-undef
    return process.env.NODE_ENV === 'test' ?
        withApi ? `${UI_PLANNING_HOST}/api` : `${UI_PLANNING_HOST}/` :
        withApi ? '/api' : '';
}
