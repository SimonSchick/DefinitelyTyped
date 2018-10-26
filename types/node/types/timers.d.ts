declare module "timers" {
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

    interface TimerBase {
        ref(): void;
        unref(): void;
    }

    interface Timer extends TimerBase {
        refresh(): void;
    }

    interface Immediate extends TimerBase {
        _onImmediate: Function; // to distinguish it from the Timeout class
    }

    // Alias of Timer for compability
    interface Timeout extends Timer {
    }
}
