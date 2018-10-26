declare module "console" {
    import { Writable } from "stream";
    import { InspectOptions } from "util";

    namespace console {
        type Console = NodeJS.Console;
    }
    const console: NodeJS.Console & {
        Console: typeof NodeJS.Console;
    };
    export = console;
}
