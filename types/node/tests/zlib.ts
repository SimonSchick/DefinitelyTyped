import * as zlib from 'zlib';

{
    const gzipped = zlib.gzipSync('test');
    const unzipped = zlib.gunzipSync(gzipped.toString());
}

{
    const deflate = zlib.deflateSync('test');
    const inflate = zlib.inflateSync(deflate.toString());
}
