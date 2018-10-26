import * as repl from 'repl';

{
    let _server: repl.REPLServer;
    let _boolean: boolean;
    const _ctx: any = 1;

    _server = _server.addListener("exit", () => { });
    _server = _server.addListener("reset", () => { });

    _boolean = _server.emit("exit", () => { });
    _boolean = _server.emit("reset", _ctx);

    _server = _server.on("exit", () => { });
    _server = _server.on("reset", () => { });

    _server = _server.once("exit", () => { });
    _server = _server.once("reset", () => { });

    _server = _server.prependListener("exit", () => { });
    _server = _server.prependListener("reset", () => { });

    _server = _server.prependOnceListener("exit", () => { });
    _server = _server.prependOnceListener("reset", () => { });

    _server.outputStream.write("test");
    const line = _server.inputStream.read();

    function test() {
        throw new repl.Recoverable(new Error("test"));
    }
}
