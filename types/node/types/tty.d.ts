declare module "tty" {
    import { Socket } from "net";
    function isatty(fd: number): boolean;
    class ReadStream extends Socket {
        isRaw: boolean;
        setRawMode(mode: boolean): void;
        isTTY: boolean;
    }
    class WriteStream extends Socket {
        columns: number;
        rows: number;
        isTTY: boolean;
    }
}
