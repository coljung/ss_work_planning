export default function getApiUrl() {
    return `http://${process.env.UI_PLANNING_HOST}:${process.env.UI_PLANNING_PORT}/api/`;
}
