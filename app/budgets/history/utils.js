const getView = (state, view, defaultView) =>
    (state[view] === undefined ? defaultView : state[view]);

export default getView;
