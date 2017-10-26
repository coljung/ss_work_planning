module.exports = {
    server: {
        host: process.env.HTTP_UI_HOST || '0.0.0.0',
        port: process.env.HTTP_UI_PORT || 8007
    },
    auth: {
        password: process.env.HTTP_AUTH_PASSWORD || 'development',
    },
    node_env: {
        env: process.env.NODE_ENV || 'development',
    }
};
