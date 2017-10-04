// dummy host
const dummyHost = '0.0.0.0';
const dummyPort = '8003';
const dummyEnv = 'development';
const dummyPassword = 'development'

module.exports = {
    server: {
        host: dummyHost,
        port: dummyPort,
        // exposedHost: process.env.UI_STORE_HOST,
        // exposedPort: process.env.UI_STORE_PORT
    },
    auth: {
        password: process.env.HTTP_AUTH_PASSWORD || dummyPassword,
    },
    node_env: {
        env: process.env.NODE_ENV || dummyEnv,
    }
};
