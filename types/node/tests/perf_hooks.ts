import * as perf_hooks from 'perf_hooks';

perf_hooks.performance.mark('start');
(
    () => {}
)();
perf_hooks.performance.mark('end');

const { duration } = perf_hooks.performance.getEntriesByName('discover')[0];
const timeOrigin = perf_hooks.performance.timeOrigin;

const performanceObserverCallback: perf_hooks.PerformanceObserverCallback = (list, obs) => {
    const {
        duration,
        entryType,
        name,
        startTime,
    } = list.getEntries()[0];
    obs.disconnect();
    perf_hooks.performance.clearFunctions();
};
const obs = new perf_hooks.PerformanceObserver(performanceObserverCallback);
obs.observe({
    entryTypes: ['function'],
    buffered: true,
});
