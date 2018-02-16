module.exports = {
    server: {
        host: process.env.HTTP_UI_HOST || '0.0.0.0',
        port: process.env.HTTP_UI_PORT || 8007,
        // exposedHost: process.env.UI_PLANNING_HOST || 'localhost',
        exposedHost: process.env.UI_PLANNING_HOST || 'http://127.0.0.1',
        exposedPort: process.env.UI_PLANNING_PORT || 8007
    },
    auth: {
        enabled: true,
        user: process.env.HTTP_AUTH_USER || 'admin',
        password: process.env.HTTP_AUTH_PASSWORD || 'admin'
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
