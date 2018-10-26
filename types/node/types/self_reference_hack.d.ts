import * as process from 'process';
import { Domain } from 'domain';
import { Worker, Address, SchedulingPolicy, ClusterSettings } from 'cluster';
import { Socket, Server } from 'net';
import { InspectOptions } from 'util';
import { Writable } from 'stream';

declare global {
    namespace NodeJS {
        class EventEmitter {
            constructor();
            /** @deprecated since v4.0.0 */
            static listenerCount(emitter: EventEmitter, event: string | symbol): number;
            static defaultMaxListeners: number;
            addListener(event: string | symbol, listener: (...args: any[]) => void): this;
            on(event: string | symbol, listener: (...args: any[]) => void): this;
            once(event: string | symbol, listener: (...args: any[]) => void): this;
            prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
            prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
            removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
            off(event: string | symbol, listener: (...args: any[]) => void): this;
            removeAllListeners(event?: string | symbol): this;
            setMaxListeners(n: number): this;
            getMaxListeners(): number;
            listeners(event: string | symbol): Function[];
            rawListeners(event: string | symbol): Function[];
            emit(event: string | symbol, ...args: any[]): boolean;
            eventNames(): Array<string | symbol>;
            listenerCount(type: string | symbol): number;
        }

        interface Process extends EventEmitter {
            stdout: TTYWriteStream;
            stderr: TTYWriteStream;
            stdin: TTYReadStream;
            openStdin(): process.Socket;
            argv: string[];
            argv0: string;
            execArgv: string[];
            execPath: string;
            abort(): void;
            chdir(directory: string): void;
            cwd(): string;
            debugPort: number;
            emitWarning(warning: string | Error, name?: string, ctor?: Function): void;
            env: process.ProcessEnv;
            exit(code?: number): never;
            exitCode: number;
            getgid(): number;
            setgid(id: number | string): void;
            getuid(): number;
            setuid(id: number | string): void;
            geteuid(): number;
            seteuid(id: number | string): void;
            getegid(): number;
            setegid(id: number | string): void;
            getgroups(): number[];
            setgroups(groups: Array<string | number>): void;
            setUncaughtExceptionCaptureCallback(cb: ((err: Error) => void) | null): void;
            hasUncaughtExceptionCaptureCallback(): boolean;
            version: string;
            versions: process.ProcessVersions;
            config: process.Config;
            kill(pid: number, signal?: string | number): void;
            pid: number;
            ppid: number;
            title: string;
            arch: string;
            platform: process.Platform;
            mainModule?: NodeModule;
            memoryUsage(): process.MemoryUsage;
            cpuUsage(previousValue?: process.CpuUsage): process.CpuUsage;
            nextTick(callback: Function, ...args: any[]): void;
            release: process.ProcessRelease;
            umask(mask?: number): number;
            uptime(): number;
            hrtime(time?: [number, number]): [number, number];
            domain: Domain;

            // Worker
            send?(message: any, sendHandle?: any): void;
            disconnect(): void;
            connected: boolean;

            /**
             * The `process.allowedNodeEnvironmentFlags` property is a special,
             * read-only `Set` of flags allowable within the [`NODE_OPTIONS`][]
             * environment variable.
             */
            allowedNodeEnvironmentFlags: ReadonlySet<string>;

            addListener(event: "beforeExit", listener: process.BeforeExitListener): this;
            addListener(event: "disconnect", listener: process.DisconnectListener): this;
            addListener(event: "exit", listener: process.ExitListener): this;
            addListener(event: "rejectionHandled", listener: process.RejectionHandledListener): this;
            addListener(event: "uncaughtException", listener: process.UncaughtExceptionListener): this;
            addListener(event: "unhandledRejection", listener: process.UnhandledRejectionListener): this;
            addListener(event: "warning", listener: process.WarningListener): this;
            addListener(event: "message", listener: process.MessageListener): this;
            addListener(event: process.Signals, listener: process.SignalsListener): this;
            addListener(event: "newListener", listener: process.NewListenerListener): this;
            addListener(event: "removeListener", listener: process.RemoveListenerListener): this;
            addListener(event: "multipleResolves", listener: process.MultipleResolveListener): this;

            emit(event: "beforeExit", code: number): boolean;
            emit(event: "disconnect"): boolean;
            emit(event: "exit", code: number): boolean;
            emit(event: "rejectionHandled", promise: Promise<any>): boolean;
            emit(event: "uncaughtException", error: Error): boolean;
            emit(event: "unhandledRejection", reason: any, promise: Promise<any>): boolean;
            emit(event: "warning", warning: Error): boolean;
            emit(event: "message", message: any, sendHandle: any): this;
            emit(event: process.Signals, signal: process.Signals): boolean;
            emit(event: "newListener", eventName: string | symbol, listener: (...args: any[]) => void): this;
            emit(event: "removeListener", eventName: string, listener: (...args: any[]) => void): this;
            emit(event: "multipleResolves", listener: process.MultipleResolveListener): this;

            on(event: "beforeExit", listener: process.BeforeExitListener): this;
            on(event: "disconnect", listener: process.DisconnectListener): this;
            on(event: "exit", listener: process.ExitListener): this;
            on(event: "rejectionHandled", listener: process.RejectionHandledListener): this;
            on(event: "uncaughtException", listener: process.UncaughtExceptionListener): this;
            on(event: "unhandledRejection", listener: process.UnhandledRejectionListener): this;
            on(event: "warning", listener: process.WarningListener): this;
            on(event: "message", listener: process.MessageListener): this;
            on(event: process.Signals, listener: process.SignalsListener): this;
            on(event: "newListener", listener: process.NewListenerListener): this;
            on(event: "removeListener", listener: process.RemoveListenerListener): this;
            on(event: "multipleResolves", listener: process.MultipleResolveListener): this;

            once(event: "beforeExit", listener: process.BeforeExitListener): this;
            once(event: "disconnect", listener: process.DisconnectListener): this;
            once(event: "exit", listener: process.ExitListener): this;
            once(event: "rejectionHandled", listener: process.RejectionHandledListener): this;
            once(event: "uncaughtException", listener: process.UncaughtExceptionListener): this;
            once(event: "unhandledRejection", listener: process.UnhandledRejectionListener): this;
            once(event: "warning", listener: process.WarningListener): this;
            once(event: "message", listener: process.MessageListener): this;
            once(event: process.Signals, listener: process.SignalsListener): this;
            once(event: "newListener", listener: process.NewListenerListener): this;
            once(event: "removeListener", listener: process.RemoveListenerListener): this;
            once(event: "multipleResolves", listener: process.MultipleResolveListener): this;

            prependListener(event: "beforeExit", listener: process.BeforeExitListener): this;
            prependListener(event: "disconnect", listener: process.DisconnectListener): this;
            prependListener(event: "exit", listener: process.ExitListener): this;
            prependListener(event: "rejectionHandled", listener: process.RejectionHandledListener): this;
            prependListener(event: "uncaughtException", listener: process.UncaughtExceptionListener): this;
            prependListener(event: "unhandledRejection", listener: process.UnhandledRejectionListener): this;
            prependListener(event: "warning", listener: process.WarningListener): this;
            prependListener(event: "message", listener: process.MessageListener): this;
            prependListener(event: process.Signals, listener: process.SignalsListener): this;
            prependListener(event: "newListener", listener: process.NewListenerListener): this;
            prependListener(event: "removeListener", listener: process.RemoveListenerListener): this;
            prependListener(event: "multipleResolves", listener: process.MultipleResolveListener): this;

            prependOnceListener(event: "beforeExit", listener: process.BeforeExitListener): this;
            prependOnceListener(event: "disconnect", listener: process.DisconnectListener): this;
            prependOnceListener(event: "exit", listener: process.ExitListener): this;
            prependOnceListener(event: "rejectionHandled", listener: process.RejectionHandledListener): this;
            prependOnceListener(event: "uncaughtException", listener: process.UncaughtExceptionListener): this;
            prependOnceListener(event: "unhandledRejection", listener: process.UnhandledRejectionListener): this;
            prependOnceListener(event: "warning", listener: process.WarningListener): this;
            prependOnceListener(event: "message", listener: process.MessageListener): this;
            prependOnceListener(event: process.Signals, listener: process.SignalsListener): this;
            prependOnceListener(event: "newListener", listener: process.NewListenerListener): this;
            prependOnceListener(event: "removeListener", listener: process.RemoveListenerListener): this;
            prependOnceListener(event: "multipleResolves", listener: process.MultipleResolveListener): this;

            listeners(event: "beforeExit"): process.BeforeExitListener[];
            listeners(event: "disconnect"): process.DisconnectListener[];
            listeners(event: "exit"): process.ExitListener[];
            listeners(event: "rejectionHandled"): process.RejectionHandledListener[];
            listeners(event: "uncaughtException"): process.UncaughtExceptionListener[];
            listeners(event: "unhandledRejection"): process.UnhandledRejectionListener[];
            listeners(event: "warning"): process.WarningListener[];
            listeners(event: "message"): process.MessageListener[];
            listeners(event: process.Signals): process.SignalsListener[];
            listeners(event: "newListener"): process.NewListenerListener[];
            listeners(event: "removeListener"): process.RemoveListenerListener[];
            listeners(event: "multipleResolves"): process.MultipleResolveListener[];
        }

        class Console {
            constructor(stdout: Writable, stderr?: Writable);
            /**
             * A simple assertion test that verifies whether `value` is truthy.
             * If it is not, an `AssertionError` is thrown.
             * If provided, the error `message` is formatted using `util.format()` and used as the error message.
             */
            assert(value: any, message?: string, ...optionalParams: any[]): void;
            /**
             * When `stdout` is a TTY, calling `console.clear()` will attempt to clear the TTY.
             * When `stdout` is not a TTY, this method does nothing.
             */
            clear(): void;
            /**
             * Maintains an internal counter specific to `label` and outputs to `stdout` the number of times `console.count()` has been called with the given `label`.
             */
            count(label?: string): void;
            /**
             * Resets the internal counter specific to `label`.
             */
            countReset(label?: string): void;
            /**
             * The `console.debug()` function is an alias for {@link console.log()}.
             */
            debug(message?: any, ...optionalParams: any[]): void;
            /**
             * Uses {@link util.inspect()} on `obj` and prints the resulting string to `stdout`.
             * This function bypasses any custom `inspect()` function defined on `obj`.
             */
            dir(obj: any, options?: InspectOptions): void;
            /**
             * This method calls {@link console.log()} passing it the arguments received. Please note that this method does not produce any XML formatting
             */
            dirxml(...data: any[]): void;
            /**
             * Prints to `stderr` with newline.
             */
            error(message?: any, ...optionalParams: any[]): void;
            /**
             * Increases indentation of subsequent lines by two spaces.
             * If one or more `label`s are provided, those are printed first without the additional indentation.
             */
            group(...label: any[]): void;
            /**
             * The `console.groupCollapsed()` function is an alias for {@link console.group()}.
             */
            groupCollapsed(): void;
            /**
             * Decreases indentation of subsequent lines by two spaces.
             */
            groupEnd(): void;
            /**
             * The {@link console.info()} function is an alias for {@link console.log()}.
             */
            info(message?: any, ...optionalParams: any[]): void;
            /**
             * Prints to `stdout` with newline.
             */
            log(message?: any, ...optionalParams: any[]): void;
            /**
             * This method does not display anything unless used in the inspector.
             *  Prints to `stdout` the array `array` formatted as a table.
             */
            table(tabularData: any, properties?: string[]): void;
            /**
             * Starts a timer that can be used to compute the duration of an operation. Timers are identified by a unique `label`.
             */
            time(label?: string): void;
            /**
             * Stops a timer that was previously started by calling {@link console.time()} and prints the result to `stdout`.
             */
            timeEnd(label?: string): void;
            /**
             * For a timer that was previously started by calling {@link console.time()}, prints the elapsed time and other `data` arguments to `stdout`.
             */
            timeLog(label: string, ...data: any[]): void;
            /**
             * Prints to `stderr` the string 'Trace :', followed by the {@link util.format()} formatted message and stack trace to the current position in the code.
             */
            trace(message?: any, ...optionalParams: any[]): void;
            /**
             * The {@link console.warn()} function is an alias for {@link console.error()}.
             */
            warn(message?: any, ...optionalParams: any[]): void;

            // --- Inspector mode only ---
            /**
             * This method does not display anything unless used in the inspector.
             *  Starts a JavaScript CPU profile with an optional label.
             */
            profile(label?: string): void;
            /**
             * This method does not display anything unless used in the inspector.
             *  Stops the current JavaScript CPU profiling session if one has been started and prints the report to the Profiles panel of the inspector.
             */
            profileEnd(): void;
            /**
             * This method does not display anything unless used in the inspector.
             *  Adds an event with the label `label` to the Timeline panel of the inspector.
             */
            timeStamp(label?: string): void;
        }
    }
}
