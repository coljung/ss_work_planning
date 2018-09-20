module.exports = {
    server: {
        host: process.env.HTTP_UI_HOST || '0.0.0.0',
        port: process.env.HTTP_UI_PORT || 8007,
        // exposedHost: process.env.UI_PLANNING_HOST || 'localhost',
        exposedHost: process.env.UI_PLANNING_HOST || 'http://127.0.0.1',
        exposedPort: process.env.UI_PLANNING_PORT || 8007,
    },
    auth: {
        enabled: true,
        user: process.env.HTTP_AUTH_USER || 'admin',
        password: process.env.HTTP_AUTH_PASSWORD || 'admin',
    },
    api: {
        planning: {
            host: process.env.MS_PLANNING_HOST || 'localhost',
            port: process.env.MS_PLANNING_PORT || '3000',
        },
        auth: {
            enabled: process.env.AUTH_ENABLED === 'false' ? false : true, // make default to true
            host: process.env.AUTH_HOST || 'dm-auth:8080',
            secure: process.env.AUTH_SERVER_SECURE === 'true' || false,
        },
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    },
};
