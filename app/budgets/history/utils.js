
export const getView = (state, view, defaultView) =>
  (state[view] === undefined ? defaultView : state[view]);
