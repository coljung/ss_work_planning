import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApiClient from '../../../../app/ApiClient';
import clientMiddleware from '../../../../app/middleware/clientMiddleware';
import operations from '../../../../app/user/duck/operations';
import { BACKEND_APP_CODE } from '../../../../app/constants/common';

const client = new ApiClient();
const middlewares = [thunk, clientMiddleware(client)];
const mockStore = configureMockStore(middlewares);

describe('User Operations', () => {

    let ssense;
    beforeAll(() => {
        const authenticateCallback = jest.fn
        ssense = {
            logout: jest.fn(() => Promise.resolve(true)),
            // authenticate: jest.fn().mockImplementation((code, callback) => callback(null, 'Foo'))
            authenticate: jest.fn((code, callback) => callback(null, 'Foo'))
            // authenticate: jest.fn((code, callback = jest.fn()) => callback())
            // authenticate: jest.fn()
            // authenticate: (code, callback = jest.fn(() => Promise.resolve({})))
        };

        global.ssense = ssense;
        // window.ssense = ssense;
    });

    it('should authenticate', async () => {
        const store = mockStore({});
        const res = store.dispatch(operations.authenticate);

        expect(ssense.authenticate.mock.calls[0][0]).toBe(BACKEND_APP_CODE);
    });

    it('should logout', async () => {
        const store = mockStore({});
        store.dispatch(operations.logout);

        expect(typeof ssense.logout.mock.calls[0][0]).toBe('function');
    });

    it('Expect authenticate to failed', async () => {
        const store = mockStore({});
        ssense.authenticate.mockReset();
        ssense.authenticate = jest.fn((code, callback) => callback({ statusCode: 403 }, null));
        store.dispatch(operations.authenticate);

        expect(typeof ssense.authenticate.mock.calls[0][1]).toBe('function');
    });

    // it('Expect authenticate to failed with 401', async () => {
    //     const store = mockStore({});
    //     ssense.authenticate.mockReset();
    //     ssense.authenticate = jest.fn().mockReturnValueOnce((code, callback) => callback({ statusCode: 401 }, null))
    //         .mockReturnValue((code, callback) => callback(null, 'Foo'));
    //     store.dispatch(operations.authenticate);

    //     expect(ssense.authenticate.mock.calls).toBe(true);
    // });

});
