import * as fs from 'fs';
import * as zlib from 'zlib';
import * as stream from 'stream';
import * as assert from 'assert';
import * as util from 'util';

function stream_readable_pipe_test() {
    const rs = fs.createReadStream(Buffer.from('file.txt'));
    const r = fs.createReadStream('file.txt');
    const z = zlib.createGzip({ finishFlush: zlib.constants.Z_FINISH });
    const w = fs.createWriteStream('file.txt.gz');

    assert(typeof z.bytesRead === 'number');
    assert(typeof r.bytesRead === 'number');
    assert(typeof r.path === 'string');
    assert(rs.path instanceof Buffer);

    r.pipe(z).pipe(w);

    z.flush();
    r.close();
    z.close();
    rs.close();
}

// helpers
const compressMe = new Buffer("some data");
const compressMeString = "compress me!";

zlib.deflate(compressMe, (err: Error, result: Buffer) => zlib.inflate(result, (err: Error, result: Buffer) => result));
zlib.deflate(compressMe, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => zlib.inflate(result, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => result));
zlib.deflate(compressMeString, (err: Error, result: Buffer) => zlib.inflate(result, (err: Error, result: Buffer) => result));
zlib.deflate(compressMeString, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => zlib.inflate(result, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => result));
const inflated = zlib.inflateSync(zlib.deflateSync(compressMe));
const inflatedString = zlib.inflateSync(zlib.deflateSync(compressMeString));

zlib.deflateRaw(compressMe, (err: Error, result: Buffer) => zlib.inflateRaw(result, (err: Error, result: Buffer) => result));
zlib.deflateRaw(compressMe, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => zlib.inflateRaw(result, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => result));
zlib.deflateRaw(compressMeString, (err: Error, result: Buffer) => zlib.inflateRaw(result, (err: Error, result: Buffer) => result));
zlib.deflateRaw(
    compressMeString,
    { finishFlush: zlib.Z_SYNC_FLUSH },
    (err: Error, result: Buffer) => zlib.inflateRaw(result, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => result),
);
const inflatedRaw: Buffer = zlib.inflateRawSync(zlib.deflateRawSync(compressMe));
const inflatedRawString: Buffer = zlib.inflateRawSync(zlib.deflateRawSync(compressMeString));

zlib.gzip(compressMe, (err: Error, result: Buffer) => zlib.gunzip(result, (err: Error, result: Buffer) => result));
zlib.gzip(compressMe, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => zlib.gunzip(result, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => result));
const gunzipped: Buffer = zlib.gunzipSync(zlib.gzipSync(compressMe));

zlib.unzip(compressMe, (err: Error, result: Buffer) => result);
zlib.unzip(compressMe, { finishFlush: zlib.Z_SYNC_FLUSH }, (err: Error, result: Buffer) => result);
const unzipped: Buffer = zlib.unzipSync(compressMe);

// Simplified constructors
function simplified_stream_ctor_test() {
    new stream.Readable({
        read(size) {
            // $ExpectType Readable
            this;
            // $ExpectType number
            size;
        },
        destroy(error, cb) {
            // $ExpectType Error
            error;
            // $ExpectType (error: Error) => void
            cb;
        }
    });

    new stream.Writable({
        write(chunk, enc, cb) {
            // $ExpectType Writable
            this;
            // $ExpectType any
            chunk;
            // $ExpectType string
            enc;
            // $ExpectType (error?: Error) => void
            cb;
        },
        writev(chunks, cb) {
            // $ExpectType Writable
            this;
            // $ExpectType { chunk: any; encoding: string; }[]
            chunks;
            // $ExpectType (error?: Error) => void
            cb;
        },
        destroy(error, cb) {
            // $ExpectType Writable
            this;
            // $ExpectType Error
            error;
            // $ExpectType (error: Error) => void
            cb;
        },
        final(cb) {
            // $ExpectType Writable
            this;
            // $ExpectType (error?: Error) => void
            cb;
        }
    });

    new stream.Duplex({
        read(size) {
            // $ExpectType Duplex
            this;
            // $ExpectType number
            size;
        },
        write(chunk, enc, cb) {
            // $ExpectType Duplex
            this;
            // $ExpectType any
            chunk;
            // $ExpectType string
            enc;
            // $ExpectType (error?: Error) => void
            cb;
        },
        writev(chunks, cb) {
            // $ExpectType Duplex
            this;
            // $ExpectType { chunk: any; encoding: string; }[]
            chunks;
            // $ExpectType (error?: Error) => void
            cb;
        },
        destroy(error, cb) {
            // $ExpectType Duplex
            this;
            // $ExpectType Error
            error;
            // $ExpectType (error: Error) => void
            cb;
        },
        final(cb) {
            // $ExpectType Duplex
            this;
            // $ExpectType (error?: Error) => void
            cb;
        },
        readableObjectMode: true,
        writableObjectMode: true
    });

    new stream.Transform({
        read(size) {
            // $ExpectType Transform
            this;
            // $ExpectType number
            size;
        },
        write(chunk, enc, cb) {
            // $ExpectType Transform
            this;
            // $ExpectType any
            chunk;
            // $ExpectType string
            enc;
            // $ExpectType (error?: Error) => void
            cb;
        },
        writev(chunks, cb) {
            // $ExpectType Transform
            this;
            // $ExpectType { chunk: any; encoding: string; }[]
            chunks;
            // $ExpectType (error?: Error) => void
            cb;
        },
        destroy(error, cb) {
            // $ExpectType Transform
            this;
            // $ExpectType Error
            error;
            // $ExpectType (error: Error) => void
            cb;
        },
        final(cb) {
            // $ExpectType Transform
            this;
            // $ExpectType (error?: Error) => void
            cb;
        },
        transform(chunk, enc, cb) {
            // $ExpectType Transform
            this;
            // $ExpectType any
            chunk;
            // $ExpectType string
            enc;
            // $ExpectType TransformCallback
            cb;
        },
        flush(cb) {
            // $ExpectType TransformCallback
            cb;
        },
        allowHalfOpen: true,
        readableObjectMode: true,
        writableObjectMode: true
    });
}

function streamPipelineFinished() {
    const cancel = stream.finished(process.stdin, (err?: Error) => {});
    cancel();

    stream.pipeline(process.stdin, process.stdout, (err?: Error) => {});
}

async function asyncStreamPipelineFinished() {
    const finished = util.promisify(stream.finished);
    await finished(process.stdin);

    const pipeline = util.promisify(stream.pipeline);
    await pipeline(process.stdin, process.stdout);
}
