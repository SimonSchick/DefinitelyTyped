import 'assert';

declare module "assert" {
    /** @deprecated since v10.0.0 - use fail([message]) or other assert functions instead. */
    function ok(value: any, message?: string | Error): asserts value;
    function strictEqual<T>(actual: any, expected: T, message?: string | Error): asserts actual is T;
    function deepStrictEqual<T>(actual: any, expected: T, message?: string | Error): asserts actual is T;

    function ifError(value: any): asserts value is null | undefined;
}
