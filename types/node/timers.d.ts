declare module "timers" {
   interface RefCounted {
        hasRef(): boolean;
        ref(): this;
        unref(): this;
    }

    // compatibility with older typings
    interface Timer extends RefCounted {
        refresh(): this;
    }

    interface Immediate extends RefCounted {
        _onImmediate: Function; // to distinguish it from the Timeout class
    }

    interface Timeout extends Timer {
    }

    function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Timeout;
    namespace setTimeout {
        function __promisify__(ms: number): Promise<void>;
        function __promisify__<T>(ms: number, value: T): Promise<T>;
    }
    function clearTimeout(timeoutId: Timeout): void;
    function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Timeout;
    function clearInterval(intervalId: Timeout): void;
    function setImmediate(callback: (...args: any[]) => void, ...args: any[]): Immediate;
    namespace setImmediate {
        function __promisify__(): Promise<void>;
        function __promisify__<T>(value: T): Promise<T>;
    }
    function clearImmediate(immediateId: Immediate): void;

    global {
        function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Timeout;
        namespace setTimeout {
            function __promisify__(ms: number): Promise<void>;
            function __promisify__<T>(ms: number, value: T): Promise<T>;
        }
        function clearTimeout(timeoutId: Timeout): void;
        function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Timeout;
        function clearInterval(intervalId: Timeout): void;
        function setImmediate(callback: (...args: any[]) => void, ...args: any[]): Immediate;
        namespace setImmediate {
            function __promisify__(): Promise<void>;
            function __promisify__<T>(value: T): Promise<T>;
        }
        function clearImmediate(immediateId: Immediate): void;
    }
}
