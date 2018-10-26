declare module "process" {
    import { EventEmitter } from "events";
    import { ReadStream, WriteStream } from "tty";
    import { Writable, Readable, ReadableStream, WritableStream } from "stream";
    import { Domain } from "domain";
    namespace internal {
        interface MemoryUsage {
            rss: number;
            heapTotal: number;
            heapUsed: number;
            external: number;
        }

        interface CpuUsage {
            user: number;
            system: number;
        }

        interface ProcessRelease {
            name: string;
            sourceUrl?: string;
            headersUrl?: string;
            libUrl?: string;
            lts?: string;
        }

        interface ProcessVersions {
            http_parser: string;
            node: string;
            v8: string;
            ares: string;
            uv: string;
            zlib: string;
            modules: string;
            openssl: string;
        }

        interface Config {
            target_defaults: {
                cflags: any[];
                default_configuration: string;
                defines: string[];
                include_dirs: string[];
                libraries: string[];
            };
            variables: {
                clang: number;
                host_arch: string;
                node_install_npm: boolean;
                node_install_waf: boolean;
                node_prefix: string;
                node_shared_openssl: boolean;
                node_shared_v8: boolean;
                node_shared_zlib: boolean;
                node_use_dtrace: boolean;
                node_use_etw: boolean;
                node_use_openssl: boolean;
                target_arch: string;
                v8_no_strict_aliasing: number;
                v8_use_snapshot: boolean;
                visibility: string;
            };
        }

        type Platform = 'aix'
            | 'android'
            | 'darwin'
            | 'freebsd'
            | 'linux'
            | 'openbsd'
            | 'sunos'
            | 'win32'
            | 'cygwin';

        type Signals =
            "SIGABRT" | "SIGALRM" | "SIGBUS" | "SIGCHLD" | "SIGCONT" | "SIGFPE" | "SIGHUP" | "SIGILL" | "SIGINT" | "SIGIO" |
            "SIGIOT" | "SIGKILL" | "SIGPIPE" | "SIGPOLL" | "SIGPROF" | "SIGPWR" | "SIGQUIT" | "SIGSEGV" | "SIGSTKFLT" |
            "SIGSTOP" | "SIGSYS" | "SIGTERM" | "SIGTRAP" | "SIGTSTP" | "SIGTTIN" | "SIGTTOU" | "SIGUNUSED" | "SIGURG" |
            "SIGUSR1" | "SIGUSR2" | "SIGVTALRM" | "SIGWINCH" | "SIGXCPU" | "SIGXFSZ" | "SIGBREAK" | "SIGLOST" | "SIGINFO";

        type MultipleResolveType = 'resolve' | 'reject';

        type BeforeExitListener = (code: number) => void;
        type DisconnectListener = () => void;
        type ExitListener = (code: number) => void;
        type RejectionHandledListener = (promise: Promise<any>) => void;
        type UncaughtExceptionListener = (error: Error) => void;
        type UnhandledRejectionListener = (reason: any, promise: Promise<any>) => void;
        type WarningListener = (warning: Error) => void;
        type MessageListener = (message: any, sendHandle: any) => void;
        type SignalsListener = (signal: Signals) => void;
        type NewListenerListener = (type: string | symbol, listener: (...args: any[]) => void) => void;
        type RemoveListenerListener = (type: string | symbol, listener: (...args: any[]) => void) => void;
        type MultipleResolveListener = (type: MultipleResolveType, promise: Promise<any>, value: any) => void;

        interface ReadWriteStream extends ReadableStream, WritableStream { }

        interface Socket extends ReadWriteStream {
            isTTY?: true;
        }

        interface ProcessEnv {
            [key: string]: string | undefined;
        }

        type Process = NodeJS.Process;
    }

    const internal: NodeJS.Process;

    export = internal;
}
