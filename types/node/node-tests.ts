import assert = require("assert");
import * as fs from "fs";
import * as url from "url";
import * as util from "util";
import * as http from "http";
import * as https from "https";
import * as console2 from "console";
import * as timers from "timers";
import * as dns from "dns";
import * as inspector from "inspector";
import * as trace_events from "trace_events";

////////////////////////////////////////////////////
/// Url tests : http://nodejs.org/api/url.html
////////////////////////////////////////////////////

{
    {
        url.format(url.parse('http://www.example.com/xyz'));

        url.format('http://www.example.com/xyz');

        // https://google.com/search?q=you're%20a%20lizard%2C%20gary
        url.format({
            protocol: 'https',
            host: "google.com",
            pathname: 'search',
            query: { q: "you're a lizard, gary" }
        });

        const myURL = new url.URL('https://a:b@你好你好?abc#foo');
        url.format(myURL, { fragment: false, unicode: true, auth: false });
    }

    {
        const helloUrl = url.parse('http://example.com/?hello=world', true);
        let helloQuery = helloUrl.query['hello'];
        assert.equal(helloUrl.query['hello'], 'world');

        let strUrl = url.parse('http://example.com/?hello=world');
        let queryStr: string = strUrl.query!;

        strUrl = url.parse('http://example.com/?hello=world', false);
        queryStr = strUrl.query!;

        function getBoolean(): boolean { return false; }
        const urlUrl = url.parse('http://example.com/?hello=world', getBoolean());
        if (typeof(urlUrl.query) === 'string') {
            queryStr = urlUrl.query;
        } else if (urlUrl.query) {
            helloQuery = urlUrl.query['hello'];
        }
    }

    {
        const ascii: string = url.domainToASCII('español.com');
        const unicode: string = url.domainToUnicode('xn--espaol-zwa.com');
    }

    {
        let myURL = new url.URL('https://theuser:thepwd@example.org:81/foo/path?query=string#bar');
        assert.equal(myURL.hash, '#bar');
        assert.equal(myURL.host, 'example.org:81');
        assert.equal(myURL.hostname, 'example.org');
        assert.equal(myURL.href, 'https://theuser:thepwd@example.org:81/foo/path?query=string#bar');
        assert.equal(myURL.origin, 'https://example.org:81');
        assert.equal(myURL.password, 'thepwd');
        assert.equal(myURL.username, 'theuser');
        assert.equal(myURL.pathname, '/foo/path');
        assert.equal(myURL.port, "81");
        assert.equal(myURL.protocol, "https:");
        assert.equal(myURL.search, "?query=string");
        assert.equal(myURL.toString(), 'https://theuser:thepwd@example.org:81/foo/path?query=string#bar');
        assert(myURL.searchParams instanceof url.URLSearchParams);

        myURL.host = 'example.org:82';
        myURL.hostname = 'example.com';
        myURL.href = 'http://other.com';
        myURL.hash = 'baz';
        myURL.password = "otherpwd";
        myURL.username = "otheruser";
        myURL.pathname = "/otherPath";
        myURL.port = "82";
        myURL.protocol = "http";
        myURL.search = "a=b";
        assert.equal(myURL.href, 'http://otheruser:otherpwd@other.com:82/otherPath?a=b#baz');

        myURL = new url.URL('/foo', 'https://example.org/');
        assert.equal(myURL.href, 'https://example.org/foo');
        assert.equal(myURL.toJSON(), myURL.href);
    }

    {
        const searchParams = new url.URLSearchParams('abc=123');

        assert.equal(searchParams.toString(), 'abc=123');
        searchParams.forEach((value: string, name: string, me: url.URLSearchParams): void => {
            assert.equal(name, 'abc');
            assert.equal(value, '123');
            assert.equal(me, searchParams);
        });

        assert.equal(searchParams.get('abc'), '123');

        searchParams.append('abc', 'xyz');

        assert.deepEqual(searchParams.getAll('abc'), ['123', 'xyz']);

        const entries = searchParams.entries();
        assert.deepEqual(entries.next(), { value: ["abc", "123"], done: false });
        assert.deepEqual(entries.next(), { value: ["abc", "xyz"], done: false });
        assert.deepEqual(entries.next(), { value: undefined, done: true });

        const keys = searchParams.keys();
        assert.deepEqual(keys.next(), { value: "abc", done: false });
        assert.deepEqual(keys.next(), { value: "abc", done: false });
        assert.deepEqual(keys.next(), { value: undefined, done: true });

        const values = searchParams.values();
        assert.deepEqual(values.next(), { value: "123", done: false });
        assert.deepEqual(values.next(), { value: "xyz", done: false });
        assert.deepEqual(values.next(), { value: undefined, done: true });

        searchParams.set('abc', 'b');
        assert.deepEqual(searchParams.getAll('abc'), ['b']);

        searchParams.delete('a');
        assert(!searchParams.has('a'));
        assert.equal(searchParams.get('a'), null);

        searchParams.sort();
    }

    {
        const searchParams = new url.URLSearchParams({
            user: 'abc',
            query: ['first', 'second']
        });

        assert.equal(searchParams.toString(), 'user=abc&query=first%2Csecond');
        assert.deepEqual(searchParams.getAll('query'), ['first,second']);
    }

    {
        // Using an array
        const params = new url.URLSearchParams([
            ['user', 'abc'],
            ['query', 'first'],
            ['query', 'second'],
        ] as Array<[string, string]>);
        assert.equal(params.toString(), 'user=abc&query=first&query=second');
    }

    {
        let path: string = url.fileURLToPath('file://test');
        path = url.fileURLToPath(new url.URL('file://test'));
    }

    {
        const path: url.URL = url.pathToFileURL('file://test');
    }
}

//////////////////////////////////////////////////////
/// Https tests : http://nodejs.org/api/https.html ///
//////////////////////////////////////////////////////

{
    let agent: https.Agent = new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 10000,
        maxSockets: Infinity,
        maxFreeSockets: 256,
        maxCachedSessions: 100,
        timeout: 15000
    });

    agent = https.globalAgent;

    https.request({
        agent: false
    });
    https.request({
        agent
    });
    https.request({
        agent: undefined
    });

    https.get('http://www.example.com/xyz');
    https.request('http://www.example.com/xyz');

    https.get('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});
    https.request('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});

    https.get(new url.URL('http://www.example.com/xyz'));
    https.request(new url.URL('http://www.example.com/xyz'));

    https.get(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});
    https.request(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});

    const opts: https.RequestOptions = {
        path: '/some/path'
    };
    https.get(new url.URL('http://www.example.com'), opts);
    https.request(new url.URL('http://www.example.com'), opts);
    https.get(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});
    https.request(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});

    https.globalAgent.options.ca = [];

    {
        function reqListener(req: http.IncomingMessage, res: http.ServerResponse): void {}

        class MyIncomingMessage extends http.IncomingMessage {
            foo: number;
        }

        class MyServerResponse extends http.ServerResponse {
            foo: string;
        }

        let server: https.Server;

        server = new https.Server();
        server = new https.Server(reqListener);
        server = new https.Server({ IncomingMessage: MyIncomingMessage});

        server = new https.Server({
            IncomingMessage: MyIncomingMessage,
            ServerResponse: MyServerResponse
        }, reqListener);

        server = https.createServer();
        server = https.createServer(reqListener);
        server = https.createServer({ IncomingMessage: MyIncomingMessage });
        server = https.createServer({ ServerResponse: MyServerResponse }, reqListener);

        const timeout: number = server.timeout;
        const listening: boolean = server.listening;
        const keepAliveTimeout: number = server.keepAliveTimeout;
        const maxHeadersCount: number | null = server.maxHeadersCount;
        const headersTimeout: number = server.headersTimeout;
        server.setTimeout().setTimeout(1000).setTimeout(() => {}).setTimeout(100, () => {});
    }
}

/////////////////////////////////////////////////////
/// Timers tests : https://nodejs.org/api/timers.html
/////////////////////////////////////////////////////

{
    {
        const immediate = timers
            .setImmediate(() => {
                console.log('immediate');
            })
            .unref()
            .ref();
        const b: boolean = immediate.hasRef();
        timers.clearImmediate(immediate);
    }
    {
        const timeout = timers
            .setInterval(() => {
                console.log('interval');
            }, 20)
            .unref()
            .ref()
            .refresh();
        const b: boolean = timeout.hasRef();
        timers.clearInterval(timeout);
    }
    {
        const timeout = timers
            .setTimeout(() => {
                console.log('timeout');
            }, 20)
            .unref()
            .ref()
            .refresh();
        const b: boolean = timeout.hasRef();
        timers.clearTimeout(timeout);
    }
    async function testPromisify() {
        const setTimeout = util.promisify(timers.setTimeout);
        let v: void = await setTimeout(100); // tslint:disable-line no-void-expression void-return
        let s: string = await setTimeout(100, "");

        const setImmediate = util.promisify(timers.setImmediate);
        v = await setImmediate(); // tslint:disable-line no-void-expression
        s = await setImmediate("");
    }
}

/////////////////////////////////////////////////////////
/// Errors Tests : https://nodejs.org/api/errors.html ///
/////////////////////////////////////////////////////////

{
    {
        Error.stackTraceLimit = Infinity;
    }
    {
        const myObject = {};
        Error.captureStackTrace(myObject);
    }
    {
        const frames: NodeJS.CallSite[] = [];
        Error.prepareStackTrace!(new Error(), frames);
    }
    {
        const frame: NodeJS.CallSite = null!;
        const frameThis: any = frame.getThis();
        const typeName: string | null  = frame.getTypeName();
        const func: Function | undefined  = frame.getFunction();
        const funcName: string | null = frame.getFunctionName();
        const meth: string | null  = frame.getMethodName();
        const fname: string | null  = frame.getFileName();
        const lineno: number | null  = frame.getLineNumber();
        const colno: number | null  = frame.getColumnNumber();
        const evalOrigin: string | undefined  = frame.getEvalOrigin();
        const isTop: boolean = frame.isToplevel();
        const isEval: boolean = frame.isEval();
        const isNative: boolean = frame.isNative();
        const isConstr: boolean = frame.isConstructor();
    }
}

///////////////////////////////////////////////////////////
/// Console Tests : https://nodejs.org/api/console.html ///
///////////////////////////////////////////////////////////

{
    {
        let _c: Console = console;
        _c = console2;
    }
    {
        const writeStream = fs.createWriteStream('./index.d.ts');
        let consoleInstance: Console = new console.Console(writeStream);

        consoleInstance = new console.Console(writeStream, writeStream);
        consoleInstance = new console.Console(writeStream, writeStream, true);
        consoleInstance = new console.Console({
            stdout: writeStream,
            stderr: writeStream,
            colorMode: 'auto',
            ignoreErrors: true
        });
        consoleInstance = new console.Console({
            stdout: writeStream,
            colorMode: false
        });
        consoleInstance = new console.Console({
            stdout: writeStream
        });
    }
    {
        console.assert('value');
        console.assert('value', 'message');
        console.assert('value', 'message', 'foo', 'bar');
        console.clear();
        console.count();
        console.count('label');
        console.countReset();
        console.countReset('label');
        console.debug();
        console.debug('message');
        console.debug('message', 'foo', 'bar');
        console.dir('obj');
        console.dir('obj', { depth: 1 });
        console.error();
        console.error('message');
        console.error('message', 'foo', 'bar');
        console.group();
        console.group('label');
        console.group('label1', 'label2');
        console.groupCollapsed();
        console.groupEnd();
        console.info();
        console.info('message');
        console.info('message', 'foo', 'bar');
        console.log();
        console.log('message');
        console.log('message', 'foo', 'bar');
        console.table({ foo: 'bar' });
        console.table([{ foo: 'bar' }]);
        console.table([{ foo: 'bar' }], ['foo']);
        console.time();
        console.time('label');
        console.timeEnd();
        console.timeEnd('label');
        console.timeLog();
        console.timeLog('label');
        console.timeLog('label', 'foo', 'bar');
        console.trace();
        console.trace('message');
        console.trace('message', 'foo', 'bar');
        console.warn();
        console.warn('message');
        console.warn('message', 'foo', 'bar');

        // --- Inspector mode only ---
        console.markTimeline();
        console.markTimeline('label');
        console.profile();
        console.profile('label');
        console.profileEnd();
        console.profileEnd('label');
        console.timeStamp();
        console.timeStamp('label');
        console.timeline();
        console.timeline('label');
        console.timelineEnd();
        console.timelineEnd('label');
    }
}

///////////////////////////////////////////////////
/// DNS Tests : https://nodejs.org/api/dns.html ///
///////////////////////////////////////////////////

{
    dns.lookup("nodejs.org", (err, address, family) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup("nodejs.org", 4, (err, address, family) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup("nodejs.org", 6, (err, address, family) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup("nodejs.org", {}, (err, address, family) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _address: string = address;
        const _family: number = family;
    });
    dns.lookup(
        "nodejs.org",
        {
            family: 4,
            hints: dns.ADDRCONFIG | dns.V4MAPPED,
            all: false
        },
        (err, address, family) => {
            const _err: NodeJS.ErrnoException | null = err;
            const _address: string = address;
            const _family: number = family;
        }
    );
    dns.lookup("nodejs.org", { all: true }, (err, addresses) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _address: dns.LookupAddress[] = addresses;
    });
    dns.lookup("nodejs.org", { all: true, verbatim: true }, (err, addresses) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _address: dns.LookupAddress[] = addresses;
    });

    function trueOrFalse(): boolean {
        return Math.random() > 0.5 ? true : false;
    }
    dns.lookup("nodejs.org", { all: trueOrFalse() }, (err, addresses, family) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _addresses: string | dns.LookupAddress[] = addresses;
        const _family: number | undefined = family;
    });

    dns.lookupService("127.0.0.1", 0, (err, hostname, service) => {
        const _err: NodeJS.ErrnoException | null = err;
        const _hostname: string = hostname;
        const _service: string = service;
    });

    dns.resolve("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve("nodejs.org", "A", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve("nodejs.org", "AAAA", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve("nodejs.org", "ANY", (err, addresses) => {
        const _addresses: dns.AnyRecord[] = addresses;
    });
    dns.resolve("nodejs.org", "MX", (err, addresses) => {
        const _addresses: dns.MxRecord[] = addresses;
    });

    dns.resolve4("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve4("nodejs.org", { ttl: true }, (err, addresses) => {
        const _addresses: dns.RecordWithTtl[] = addresses;
    });
    {
        const ttl = false;
        dns.resolve4("nodejs.org", { ttl }, (err, addresses) => {
            const _addresses: string[] | dns.RecordWithTtl[] = addresses;
        });
    }

    dns.resolve6("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    dns.resolve6("nodejs.org", { ttl: true }, (err, addresses) => {
        const _addresses: dns.RecordWithTtl[] = addresses;
    });
    {
        const ttl = false;
        dns.resolve6("nodejs.org", { ttl }, (err, addresses) => {
            const _addresses: string[] | dns.RecordWithTtl[] = addresses;
        });
    }
    {
        const resolver = new dns.Resolver();
        resolver.setServers(["4.4.4.4"]);
        resolver.resolve("nodejs.org", (err, addresses) => {
            const _addresses: string[] = addresses;
        });
        resolver.cancel();
    }
}

/*****************************************************************************
 *                                                                           *
 * The following tests are the modules not mentioned in document but existed *
 *                                                                           *
 *****************************************************************************/

///////////////////////////////////////////////////////////
/// Inspector Tests                                     ///
///////////////////////////////////////////////////////////

{
    {
        const b: inspector.Console.ConsoleMessage = {source: 'test', text: 'test', level: 'error' };
        inspector.open();
        inspector.open(0);
        inspector.open(0, 'localhost');
        inspector.open(0, 'localhost', true);
        inspector.close();
        const inspectorUrl: string | undefined = inspector.url();

        const session = new inspector.Session();
        session.connect();
        session.disconnect();

        // Unknown post method
        session.post('A.b', { key: 'value' }, (err, params) => {});
        // TODO: parameters are implicitly 'any' and need type annotation
        session.post('A.b', (err: Error | null, params?: {}) => {});
        session.post('A.b');
        // Known post method
        const parameter: inspector.Runtime.EvaluateParameterType = { expression: '2 + 2' };
        session.post('Runtime.evaluate', parameter,
            (err: Error | null, params: inspector.Runtime.EvaluateReturnType) => {});
        session.post('Runtime.evaluate', (err: Error, params: inspector.Runtime.EvaluateReturnType) => {
            const exceptionDetails: inspector.Runtime.ExceptionDetails = params.exceptionDetails!;
            const resultClassName: string = params.result.className!;
        });
        session.post('Runtime.evaluate');

        // General event
        session.on('inspectorNotification', message => {
            message; // $ExpectType InspectorNotification<{}>
        });
        // Known events
        session.on('Debugger.paused', (message: inspector.InspectorNotification<inspector.Debugger.PausedEventDataType>) => {
            const method: string = message.method;
            const pauseReason: string = message.params.reason;
        });
        session.on('Debugger.resumed', () => {});
        // Node Inspector events
        session.on('NodeTracing.dataCollected', (message: inspector.InspectorNotification<inspector.NodeTracing.DataCollectedEventDataType>) => {
          const value: Array<{}> = message.params.value;
        });
    }
}

///////////////////////////////////////////////////////////
/// Trace Events Tests                                  ///
///////////////////////////////////////////////////////////

{
    const enabledCategories: string | undefined = trace_events.getEnabledCategories();
    const tracing: trace_events.Tracing = trace_events.createTracing({ categories: ['node', 'v8'] });
    const categories: string = tracing.categories;
    const enabled: boolean = tracing.enabled;
    tracing.enable();
    tracing.disable();
}

/////////////////////////////////////////////////////////
/// stream tests : https://nodejs.org/api/stream.html ///
/////////////////////////////////////////////////////////
import stream = require('stream');
import tty = require('tty');

{
    const writeStream = fs.createWriteStream('./index.d.ts');
    const _wom = writeStream.writableObjectMode; // $ExpectType boolean

    const readStream = fs.createReadStream('./index.d.ts');
    const _rom = readStream.readableObjectMode; // $ExpectType boolean

    const x: stream.Readable = process.stdin;
    const stdin: tty.ReadStream = process.stdin;
    const stdout: tty.WriteStream = process.stdout;
    const stderr: tty.WriteStream = process.stderr;
}

////////////////////////////////////////////////////
/// Node.js ESNEXT Support
////////////////////////////////////////////////////

{
    const s = 'foo';
    const s1: string = s.trimLeft();
    const s2: string = s.trimRight();
}
