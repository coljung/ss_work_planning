export const getView = (state, view, defaultView) => state[view] === undefined ? defaultView : state[view];

export const push = (view, item) => {
	console.log('currentIndex', view.currentIndex, +view.currentIndex + 1);
	// if (view.currentIndex && view.history && +view.currentIndex != +view.history.length - 1) {
	if (+view.currentIndex != +view.history.length - 1) {
		console.log('SLICE HISTORY');
		// view.history = view.history.slice(0, view.currentIndex + 1);
		view.history = view.history.slice(0, view.currentIndex);
	}

	view.history.push(item);
	view.currentIndex = view.history.length - 1;
	view.length = view.history.length;


	return view;
};

export const canGo = (state, view, n, defaultView) => {
	const vLength = viewLength(state, view, defaultView);

	return n >= 0 && n <= vLength - 1;
};

export const viewLength = (state, view, defaultView) => getView(state, view, defaultView).history.length;
