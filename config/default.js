const dummyURL = 'http://ad71216a29d4f11e795480af2199cf9d-1539557604.us-west-2.elb.amazonaws.com/';

module.exports = {
    server: {
        host: "0.0.0.0",
        port: 80,
        exposedHost: process.env.UI_PLANNING_HOST || 'localhost',
        exposedPort: process.env.UI_PLANNING_PORT || '3000'
    },
    auth: {
        password: process.env.HTTP_AUTH_PASSWORD
    },
    api: {
        planning: {
            host: process.env.MS_PLANNING_HOST,
            port: process.env.MS_PLANNING_PORT || '80',
        }
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    }
};
