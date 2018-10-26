declare module "module" {
    namespace Module {}
    class Module {
        static runMain(): void;
        static wrap(code: string): string;
        static createRequireFromPath(path: string): (path: string) => any;
        static builtinModules: string[];

        static Module: typeof Module;

        exports: any;
        require: NodeRequireFunction;
        id: string;
        filename: string;
        loaded: boolean;
        parent: Module | null;
        children: Module[];
        paths: string[];

        constructor(id: string, parent?: Module);
    }
    export = Module;
}
