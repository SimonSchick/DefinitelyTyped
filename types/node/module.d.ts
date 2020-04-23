declare module "module" {
    import { URL } from "url";
    namespace Module {
        /**
         * Updates all the live bindings for builtin ES Modules to match the properties of the CommonJS exports.
         * It does not add or remove exported names from the ES Modules.
         */
        function syncBuiltinESMExports(): void;

        function findSourceMap(path: string, error?: Error): SourceMap;
        interface SourceMapPayload {
            file: string;
            version: number;
            sources: string[];
            sourcesContent: string[];
            names: string[];
            mappings: string;
            sourceRoot: string;
        }

        interface SourceMapping {
            generatedLine: number;
            generatedColumn: number;
            originalSource: string;
            originalLine: number;
            originalColumn: number;
        }

        interface Require {
            /* tslint:disable-next-line:callable-types */
            (id: string): any;
            resolve: RequireResolve;
            cache: NodeJS.Dict<Module>;
            /**
             * @deprecated
             */
            extensions: RequireExtensions;
            main: Module | undefined;
        }

        interface RequireResolve {
            (id: string, options?: { paths?: string[]; }): string;
            paths(request: string): string[] | null;
        }

        interface RequireExtensions extends NodeJS.Dict<(m: Module, filename: string) => any> {
            '.js': (m: Module, filename: string) => any;
            '.json': (m: Module, filename: string) => any;
            '.node': (m: Module, filename: string) => any;
        }

        interface Module {
            exports: any;
            require: Require;
            id: string;
            filename: string;
            loaded: boolean;
            parent: Module | null;
            children: Module[];
            paths: string[];
        }

        class SourceMap {
            readonly payload: SourceMapPayload;
            constructor(payload: SourceMapPayload);
            findEntry(line: number, column: number): SourceMapping;
        }
    }
    interface Module extends Module.Module {}
    class Module {
        static runMain(): void;
        static wrap(code: string): string;

        /**
         * @deprecated Deprecated since: v12.2.0. Please use createRequire() instead.
         */
        static createRequireFromPath(path: string): Module.Require;
        static createRequire(path: string | URL): Module.Require;
        static builtinModules: string[];

        static Module: typeof Module;

        constructor(id: string, parent?: Module);
    }

    global {
        namespace NodeJS {
            interface NodeRequire extends Module.Require {}
            interface RequireResolve extends Module.RequireResolve {}
            interface NodeModule extends Module.Module {}
        }
        var require: Module.Require;
        var module: Module.Module;

        // Same as module.exports
        var exports: any;

        var __filename: string;
        var __dirname: string;
    }

    export = Module;
}
