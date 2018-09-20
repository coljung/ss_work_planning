import superagent from 'superagent';
import getApiUrl from './helpers';

const formatUrl = (path) => {
    const adjustedPath = path[0] !== '/' ? `/${path}` : path;
    let targetApi = true;

    // @TODO Change this logic.
    if (adjustedPath.startsWith('/auth')) {
        targetApi = false;
    }

    return `${getApiUrl(targetApi)}${adjustedPath}`;
};

export default class ApiClient {
    makeRequest = (method, path, { query, body } = {}) =>
        new Promise((resolve, reject) => {
            // create request
            const request = superagent[method](formatUrl(path))
            // send cookies from the origin,
            // however only when Access-Control-Allow-Origin is not a wildcard ("*"),
            // and Access-Control-Allow-Credentials is "true".
            .withCredentials();

            if (query) {
                request.query(query);
            }

            // send request
            if (body) {
                request.send(body);
            }

            // resolve or reject promise
            // res.body, res.headers, res.status
            request.end((err, res = {}) => (
                err ? reject(res.body || err) : resolve(res.body)
            ));
        });

    get = this.makeRequest.bind(this, 'get');

    post = this.makeRequest.bind(this, 'post');

    put = this.makeRequest.bind(this, 'put');

    patch = this.makeRequest.bind(this, 'patch');

    del = this.makeRequest.bind(this, 'del');
}
