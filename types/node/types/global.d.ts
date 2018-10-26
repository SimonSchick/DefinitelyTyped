import { EventEmitter } from "events";
import * as timers from 'timers';
import * as stream from 'stream';
import * as buffer from 'buffer';
import * as process from 'process';
import { WriteStream, ReadStream } from "fs";
import { Domain } from "domain";
import * as ConsoleI from 'console';

declare global {
    // Declare "static" methods in Error
    interface ErrorConstructor {
        /** Create .stack property on a target object */
        captureStackTrace(targetObject: Object, constructorOpt?: Function): void;

        /**
         * Optional override for formatting stack traces
         *
         * @see https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces
         */
        prepareStackTrace?: (err: Error, stackTraces: NodeJS.CallSite[]) => any;

        stackTraceLimit: number;
    }

    interface AsyncIterableIterator<T> {}
    interface SymbolConstructor {
        readonly observable: symbol;
        readonly asyncIterator: symbol;
    }

    // Node.js ESNEXT support
    interface String {
        /** Removes whitespace from the left end of a string. */
        trimLeft(): string;
        /** Removes whitespace from the right end of a string. */
        trimRight(): string;
    }

    /*-----------------------------------------------*
    *                                               *
    *                   GLOBAL                      *
    *                                               *
    ------------------------------------------------*/
    var process: process.Process;
    var global: NodeJS.Global;
    // This needs to be global to avoid TS2403 in case lib.dom.d.ts is present in the same build
    var console: typeof ConsoleI;
    var __filename: string;
    var __dirname: string;

    const setTimeout: typeof timers.setTimeout;
    const clearTimeout: typeof timers.clearTimeout;
    const setInterval: typeof timers.setInterval;
    const clearInterval: typeof timers.clearInterval;
    const setImmediate: typeof timers.setImmediate;
    const clearImmediate: typeof timers.clearImmediate;

    /**
     * Experimental
     */
    function queueMicrotask(callback: () => void): void;

    type NodeRequireFunction = (id: string) => any;

    interface NodeRequire extends NodeRequireFunction {
        resolve: RequireResolve;
        cache: any;
        extensions: NodeExtensions;
        main: NodeModule | undefined;
    }

    interface RequireResolve {
        (id: string, options?: { paths?: string[]; }): string;
        paths(request: string): string[] | null;
    }

    interface NodeExtensions {
        '.js': (m: NodeModule, filename: string) => any;
        '.json': (m: NodeModule, filename: string) => any;
        '.node': (m: NodeModule, filename: string) => any;
        [ext: string]: (m: NodeModule, filename: string) => any;
    }

    var require: NodeRequire;

    interface NodeModule {
        exports: any;
        require: NodeRequireFunction;
        id: string;
        filename: string;
        loaded: boolean;
        parent: NodeModule | null;
        children: NodeModule[];
        paths: string[];
    }

    var module: NodeModule;

    const Buffer: typeof buffer.Buffer;
    type Buffer = buffer.Buffer;

    class TextDecoder {
        readonly encoding: string;
        readonly fatal: boolean;
        readonly ignoreBOM: boolean;
        constructor(
            encoding?: string,
            options?: { fatal?: boolean; ignoreBOM?: boolean }
        );
        decode(
            input?: NodeJS.TypedArray | DataView | ArrayBuffer | null,
            options?: { stream?: boolean }
        ): string;
    }

    class TextEncoder {
        readonly encoding: string;
        constructor();
        encode(input?: string): Uint8Array;
    }

    /*----------------------------------------------*
    *                                               *
    *               GLOBAL INTERFACES               *
    *                                               *
    *-----------------------------------------------*/
    namespace NodeJS {
        type ReadableStream = stream.ReadableStream;
        type WritableStream = stream.WritableStream;
        type ReadWriteStream = stream.ReadWriteStream;
        type BufferEncoding = buffer.BufferEncoding;
        type Platform = process.Platform;
        type ProcessEnv = process.ProcessEnv;

        interface CallSite {
            /**
             * Value of "this"
             */
            getThis(): any;

            /**
             * Type of "this" as a string.
             * This is the name of the function stored in the constructor field of
             * "this", if available.  Otherwise the object's [[Class]] internal
             * property.
             */
            getTypeName(): string | null;

            /**
             * Current function
             */
            getFunction(): Function | undefined;

            /**
             * Name of the current function, typically its name property.
             * If a name property is not available an attempt will be made to try
             * to infer a name from the function's context.
             */
            getFunctionName(): string | null;

            /**
             * Name of the property [of "this" or one of its prototypes] that holds
             * the current function
             */
            getMethodName(): string | null;

            /**
             * Name of the script [if this function was defined in a script]
             */
            getFileName(): string | null;

            /**
             * Current line number [if this function was defined in a script]
             */
            getLineNumber(): number | null;

            /**
             * Current column number [if this function was defined in a script]
             */
            getColumnNumber(): number | null;

            /**
             * A call site object representing the location where eval was called
             * [if this function was created using a call to eval]
             */
            getEvalOrigin(): string | undefined;

            /**
             * Is this a toplevel invocation, that is, is "this" the global object?
             */
            isToplevel(): boolean;

            /**
             * Does this call take place in code defined by a call to eval?
             */
            isEval(): boolean;

            /**
             * Is this call in native V8 code?
             */
            isNative(): boolean;

            /**
             * Is this a constructor call?
             */
            isConstructor(): boolean;
        }

        interface ErrnoException extends Error {
            errno?: number;
            code?: string;
            path?: string;
            syscall?: string;
            stack?: string;
        }

        interface Global {
            Array: typeof Array;
            ArrayBuffer: typeof ArrayBuffer;
            Boolean: typeof Boolean;
            Buffer: typeof Buffer;
            DataView: typeof DataView;
            Date: typeof Date;
            Error: typeof Error;
            EvalError: typeof EvalError;
            Float32Array: typeof Float32Array;
            Float64Array: typeof Float64Array;
            Function: typeof Function;
            GLOBAL: Global;
            Infinity: typeof Infinity;
            Int16Array: typeof Int16Array;
            Int32Array: typeof Int32Array;
            Int8Array: typeof Int8Array;
            Intl: typeof Intl;
            JSON: typeof JSON;
            Map: MapConstructor;
            Math: typeof Math;
            NaN: typeof NaN;
            Number: typeof Number;
            Object: typeof Object;
            Promise: Function;
            RangeError: typeof RangeError;
            ReferenceError: typeof ReferenceError;
            RegExp: typeof RegExp;
            Set: SetConstructor;
            String: typeof String;
            Symbol: Function;
            SyntaxError: typeof SyntaxError;
            TypeError: typeof TypeError;
            URIError: typeof URIError;
            Uint16Array: typeof Uint16Array;
            Uint32Array: typeof Uint32Array;
            Uint8Array: typeof Uint8Array;
            Uint8ClampedArray: Function;
            WeakMap: WeakMapConstructor;
            WeakSet: WeakSetConstructor;
            clearImmediate: typeof clearImmediate;
            clearInterval: typeof clearInterval;
            clearTimeout: typeof clearTimeout;
            queueMicrotask: typeof queueMicrotask;
            console: typeof console;
            decodeURI: typeof decodeURI;
            decodeURIComponent: typeof decodeURIComponent;
            encodeURI: typeof encodeURI;
            encodeURIComponent: typeof encodeURIComponent;
            escape: (str: string) => string;
            eval: typeof eval;
            global: Global;
            isFinite: typeof isFinite;
            isNaN: typeof isNaN;
            parseFloat: typeof parseFloat;
            parseInt: typeof parseInt;
            process: Process;
            root: Global;
            setImmediate: (callback: (...args: any[]) => void, ...args: any[]) => timers.Immediate;
            setInterval: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => timers.Timeout;
            setTimeout: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => timers.Timeout;
            undefined: typeof undefined;
            unescape: (str: string) => string;
            gc: () => void;
            v8debug?: any;
            TextEncoder: typeof TextEncoder;
            TextDecoder: typeof TextDecoder;
        }

        type Timer = timers.Timer;
        type Timeout = timers.Timeout;

        type TypedArray = Uint8Array | Uint8ClampedArray | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Float32Array | Float64Array;

        interface TTYReadStream extends stream.ReadableStream {
            isTTY?: boolean;
        }

        interface TTYWriteStream extends stream.WritableStream {
            isTTY?: boolean;
        }
    }
}
