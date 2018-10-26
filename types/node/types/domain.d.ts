declare module "domain" {
    import { EventEmitter } from "events";

    class Domain extends EventEmitter {
        run(fn: Function): void;
        add(emitter: EventEmitter): void;
        remove(emitter: EventEmitter): void;
        bind(cb: (err: Error, data: any) => any): any;
        intercept(cb: (data: any) => any): any;
        members: any[];
        enter(): void;
        exit(): void;
    }

    function create(): Domain;
}
