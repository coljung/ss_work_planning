module.exports = {
    server: {
        host: process.env.HTTP_UI_HOST || '0.0.0.0',
        port: process.env.HTTP_UI_PORT || 8007,
        exposedHost: process.env.UI_PLANNING_HOST || 'localhost',
        exposedPort: process.env.UI_PLANNING_PORT || 8007
    },
    auth: {
        password: process.env.HTTP_AUTH_PASSWORD
    },
    api: {
        planning: {
            host: process.env.MS_PLANNING_HOST || 'localhost',
            port: process.env.MS_PLANNING_PORT || '3001',
        }
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    }
};
