import * as events from 'events';
import * as assert from 'assert';
import * as p from 'process';

{
    let eventEmitter: events.EventEmitter;
    eventEmitter = process;                // Test that process implements EventEmitter...

    let _p: p.Process = process;
    _p = p;
}
{
    assert(process.argv[0] === process.argv0);
}
{
    let module: NodeModule | undefined;
    module = process.mainModule;
}
{
    process.on("message", (req: any) => { });
    process.addListener("beforeExit", (code: number) => { });
    process.once("disconnect", () => { });
    process.prependListener("exit", (code: number) => { });
    process.prependOnceListener("rejectionHandled", (promise: Promise<any>) => { });
    process.on("uncaughtException", (error: Error) => { });
    process.addListener("unhandledRejection", (reason: any, promise: Promise<any>) => { });
    process.once("warning", (warning: Error) => { });
    process.prependListener("message", (message: any, sendHandle: any) => { });
    process.prependOnceListener("SIGBREAK", () => { });
    process.on("newListener", (event: string | symbol, listener: Function) => { });
    process.once("removeListener", (event: string | symbol, listener: Function) => { });
    process.on("multipleResolves", (type: p.MultipleResolveType, prom: Promise<any>, value: any) => {});

    const listeners = process.listeners('uncaughtException');
    const oldHandler = listeners[listeners.length - 1];
    process.addListener('uncaughtException', oldHandler);
}
{
    function myCb(err: Error): void {
    }
    process.setUncaughtExceptionCaptureCallback(myCb);
    process.setUncaughtExceptionCaptureCallback(null);
    const b: boolean = process.hasUncaughtExceptionCaptureCallback();
}
{
    process.allowedNodeEnvironmentFlags.has('asdf');
}
