const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('config');
const basicAuth = require('node-basicauth');
const httpProxy = require('http-proxy-middleware');

const host = config.get('server.host');
const port = config.get('server.port');
const apiPlanningBaseUrl = `http://${config.get('api.planning.host')}:${config.get('api.planning.port')}`;

const target = process.env.API_HOST || `http://${config.get('api.planning.host')}:${config.get('api.planning.port')}`;
const proxy = httpProxy({
  target,
  changeOrigin: true,
  pathRewrite: {'^/api' : ''} // <-- this will remove the /api prefix
});

const app = express();

app.use(basicAuth({
    admin: config.get('auth.password'),
}));

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static(path.resolve(__dirname, 'public')));

app.use('/api', proxy);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port, host, (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return;
    }

    // eslint-disable-next-line no-console
    console.log(`Listening at http://${host}:${port}`);
});
