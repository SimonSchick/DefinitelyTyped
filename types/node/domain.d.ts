declare module "domain" {
    import { Timer } from 'timers';
    import { EventEmitter } from "events";

    /**
     * @deprecated
     */
    class Domain extends EventEmitter {
        run<T>(fn: (...args: any[]) => T, ...args: any[]): T;
        add(emitter: EventEmitter | Timer): void;
        remove(emitter: EventEmitter | Timer): void;
        bind<T extends Function>(cb: T): T;
        intercept<T extends Function>(cb: T): T;
        members: Array<EventEmitter | Timer>;
        enter(): void;
        exit(): void;
    }

    /**
     * @deprecated
     */
    function create(): Domain;
}
