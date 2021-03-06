import newrelic from 'newrelic';

export function observeAsyncTime(indicator) {
    return (
        target,
        propertyKey,
        descriptor,
    ) => {
        const method = descriptor.value;
        const key = indicator
            ? `Custom/${indicator}`
            : `Custom/${target.constructor.name}/${propertyKey}`;

        descriptor.value = async (...args) => {
            const start = (new Date()).getTime();
            const result = await method.call(this, ...args);
            const end = (new Date()).getTime();

            // Record in NewRelic metric for analysis
            newrelic.addToTrace({
                name: key,
                start,
                end,
                // origin,
                // type
            });

            return result;
        };
    };
}

export function observeTime(indicator) {
    return (target,
            propertyKey,
            descriptor) => {
        const method = descriptor.value;
        const key = indicator
            ? `Custom/${indicator}`
            : `Custom/${target.constructor.name}/${propertyKey}`;

        descriptor.value = (...args) => {
            const start = (new Date()).getTime();
            const result = method.call(this, ...args);
            const end = (new Date()).getTime();

            // Record in NewRelic metric for analysis
            newrelic.addToTrace({
                name: key,
                start,
                end,
                // origin,
                // type
            });

            return result;
        };
    };
}

// Uses
// import { observeAsyncTime, observeTime } from '../observers/observetime';
// Place it on top of a function that we want to observe in future
// @observeTime()
