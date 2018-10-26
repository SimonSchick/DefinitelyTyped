import * as timers from 'timers';
import * as util from 'util';

{
    const immediateId = timers.setImmediate(() => { console.log("immediate"); });
    timers.clearImmediate(immediateId);
}
{
    const counter = 0;
    const timeout = timers.setInterval(() => { console.log("interval"); }, 20);
    timeout.unref();
    timeout.ref();
    timers.clearInterval(timeout);
}
{
    const counter = 0;
    const timeout = timers.setTimeout(() => { console.log("timeout"); }, 20);
    timeout.unref();
    timeout.ref();
    timers.clearTimeout(timeout);
}
async function testPromisify() {
    const setTimeout = util.promisify(timers.setTimeout);
    let v: void = await setTimeout(100); // tslint:disable-line no-void-expression void-return
    let s: string = await setTimeout(100, "");

    const setImmediate = util.promisify(timers.setImmediate);
    v = await setImmediate(); // tslint:disable-line no-void-expression
    s = await setImmediate("");
}

{
    queueMicrotask(() => {
    });
}
