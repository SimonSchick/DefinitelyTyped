import * as crypto from 'crypto';
import * as assert from 'assert';

{
    // crypto_hash_string_test
    const hashResult: string = crypto.createHash('md5').update('world').digest('hex');
}

{
    // crypto_hash_buffer_test
    const hashResult: string = crypto.createHash('md5')
        .update(new Buffer('world')).digest('hex');
}

{
    // crypto_hash_dataview_test
    const hashResult: string = crypto.createHash('md5')
        .update(new DataView(new Buffer('world').buffer)).digest('hex');
}

{
    // crypto_hash_int8array_test
    const hashResult: string = crypto.createHash('md5')
        .update(new Int8Array(new Buffer('world').buffer)).digest('hex');
}

{
    // crypto_hmac_string_test
    const hmacResult: string = crypto.createHmac('md5', 'hello').update('world').digest('hex');
}

{
    // crypto_hmac_buffer_test
    const hmacResult: string = crypto.createHmac('md5', 'hello')
        .update(new Buffer('world')).digest('hex');
}

{
    // crypto_hmac_dataview_test
    const hmacResult: string = crypto.createHmac('md5', 'hello')
        .update(new DataView(new Buffer('world').buffer)).digest('hex');
}

{
    // crypto_hmac_int8array_test
    const hmacResult: string = crypto.createHmac('md5', 'hello')
        .update(new Int8Array(new Buffer('world').buffer)).digest('hex');
}

{
    let hmac: crypto.Hmac;
    (hmac = crypto.createHmac('md5', 'hello')).end('world', 'utf8', () => {
        const hash: Buffer | string = hmac.read();
    });
}

{
    // crypto_cipher_decipher_string_test
    const key: Buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]);
    const clearText = "This is the clear text.";
    const cipher: crypto.Cipher = crypto.createCipher("aes-128-ecb", key);
    let cipherText: string = cipher.update(clearText, "utf8", "hex");
    cipherText += cipher.final("hex");

    const decipher: crypto.Decipher = crypto.createDecipher("aes-128-ecb", key);
    let clearText2: string = decipher.update(cipherText, "hex", "utf8");
    clearText2 += decipher.final("utf8");

    assert.equal(clearText2, clearText);
}

{
    // crypto_cipher_decipher_buffer_test
    const key: Buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]);
    const clearText: Buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4]);
    const cipher: crypto.Cipher = crypto.createCipher("aes-128-ecb", key);
    const cipherBuffers: Buffer[] = [];
    cipherBuffers.push(cipher.update(clearText));
    cipherBuffers.push(cipher.final());

    const cipherText: Buffer = Buffer.concat(cipherBuffers);

    const decipher: crypto.Decipher = crypto.createDecipher("aes-128-ecb", key);
    const decipherBuffers: Buffer[] = [];
    decipherBuffers.push(decipher.update(cipherText));
    decipherBuffers.push(decipher.final());

    const clearText2: Buffer = Buffer.concat(decipherBuffers);

    assert.deepEqual(clearText2, clearText);
}

{
    // crypto_cipher_decipher_dataview_test
    const key: Buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]);
    const clearText: DataView = new DataView(new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4]).buffer);
    const cipher: crypto.Cipher = crypto.createCipher("aes-128-ecb", key);
    const cipherBuffers: Buffer[] = [];
    cipherBuffers.push(cipher.update(clearText));
    cipherBuffers.push(cipher.final());

    const cipherText: DataView = new DataView(Buffer.concat(cipherBuffers).buffer);

    const decipher: crypto.Decipher = crypto.createDecipher("aes-128-ecb", key);
    const decipherBuffers: Buffer[] = [];
    decipherBuffers.push(decipher.update(cipherText));
    decipherBuffers.push(decipher.final());

    const clearText2: Buffer = Buffer.concat(decipherBuffers);

    assert.deepEqual(clearText2, clearText);
}

{
    const key = 'keykeykeykeykeykeykeykey';
    const nonce = crypto.randomBytes(12);
    const aad = Buffer.from('0123456789', 'hex');

    const cipher = crypto.createCipheriv('aes-192-ccm', key, nonce, {
        authTagLength: 16
    });
    const plaintext = 'Hello world';
    cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(plaintext)
    });
    const ciphertext = cipher.update(plaintext, 'utf8');
    cipher.final();
    const tag = cipher.getAuthTag();

    const decipher = crypto.createDecipheriv('aes-192-ccm', key, nonce, {
        authTagLength: 16
    });
    decipher.setAuthTag(tag);
    decipher.setAAD(aad, {
        plaintextLength: ciphertext.length
    });
    const receivedPlaintext: string = decipher.update(ciphertext, null, 'utf8');
    decipher.final();
}

{
    const key = 'keykeykeykeykeykeykeykey';
    const nonce = crypto.randomBytes(12);
    const aad = Buffer.from('0123456789', 'hex');

    const cipher = crypto.createCipheriv('aes-192-gcm', key, nonce);
    const plaintext = 'Hello world';
    cipher.setAAD(aad, {
        plaintextLength: Buffer.byteLength(plaintext)
    });
    const ciphertext = cipher.update(plaintext, 'utf8');
    cipher.final();
    const tag = cipher.getAuthTag();

    const decipher = crypto.createDecipheriv('aes-192-gcm', key, nonce);
    decipher.setAuthTag(tag);
    decipher.setAAD(aad, {
        plaintextLength: ciphertext.length
    });
    const receivedPlaintext: string = decipher.update(ciphertext, null, 'utf8');
    decipher.final();
}

{
    // crypto_timingsafeequal_buffer_test
    const buffer1: Buffer = new Buffer([1, 2, 3, 4, 5]);
    const buffer2: Buffer = new Buffer([1, 2, 3, 4, 5]);
    const buffer3: Buffer = new Buffer([5, 4, 3, 2, 1]);

    assert(crypto.timingSafeEqual(buffer1, buffer2));
    assert(!crypto.timingSafeEqual(buffer1, buffer3));
}

{
    // crypto_timingsafeequal_uint32array_test
    const arr1: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const arr2: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const arr3: Uint32Array = Uint32Array.of(5, 4, 3, 2, 1);

    assert(crypto.timingSafeEqual(arr1, arr2));
    assert(!crypto.timingSafeEqual(arr1, arr3));
}

{
    // crypto_timingsafeequal_safe_typedarray_variant_test
    const arr1: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const arr2: Int32Array = Int32Array.of(1, 2, 3, 4, 5);
    const arr3: Uint32Array = Uint32Array.of(5, 4, 3, 2, 1);

    assert(crypto.timingSafeEqual(arr1, arr2));
    assert(!crypto.timingSafeEqual(arr1, arr3));
}

{
    // crypto_timingsafeequal_safe_int8array_variant_test
    const arr1: Int8Array = Int8Array.of(1, 2, 3, 4, 5, ~0, ~1, ~2, ~3, ~4);
    const arr2: Uint8Array = Uint8Array.of(1, 2, 3, 4, 5, ~0, ~1, ~2, ~3, ~4);
    const arr3: Uint8ClampedArray = Uint8ClampedArray.of(1, 2, 3, 4, 5, ~0, ~1, ~2, ~3, ~4);

    assert(crypto.timingSafeEqual(arr1, arr2)); // binary same
    assert(!crypto.timingSafeEqual(arr1, arr3)); // binary differ
}

{
    // crypto_timingsafeequal_safe_arraybufferiew_variant_test
    /* throws as of v10.4.1 */
    // let arr1: Uint8Array = Uint8Array.of(1, 0, 2, 0, 3, 0, 4, 0);
    // let arr2: Uint16Array = Uint16Array.of(1, 2, 3, 4);
    // let arr3: Uint32Array = Uint8ClampedArray.of(131073, 262147);

    // assert(crypto.timingSafeEqual(arr1, arr2)); // binary same
    // assert(crypto.timingSafeEqual(arr1, arr3)); // binary same
}

{
    // crypto_timingsafeequal_unsafe_arraybufferiew_variant_test
    /* dumps core as of v10.4.1 */
    // let arr1: Uint8Array = Uint8Array.of(1, 2, 3, 4);
    // let arr2: Uint16Array = Uint16Array.of(1, 2, 3, 4);
    // let arr3: Uint32Array = Uint8ClampedArray.of(1, 2, 3, 4);

    // assert(!crypto.timingSafeEqual(arr1, arr2)); // dumps core
    // assert(!crypto.timingSafeEqual(arr1, arr3)); // dumps core
}

{
    // crypto_timingsafeequal_dataview_test
    const dv1B: Uint8Array = Uint8Array.of(1, 2, 3, 4, 5);
    const dv2B: Int8Array = Int8Array.of(1, 2, 3, 4, 5);
    const dv3B: Buffer = Buffer.of(5, 4, 3, 2, 1);
    const dv4B: Uint8ClampedArray = Uint8ClampedArray.of(5, 4, 3, 2, 1);
    const dv1: DataView = new DataView(dv1B.buffer, dv1B.byteOffset, dv1B.byteLength);
    const dv2: DataView = new DataView(dv2B.buffer, dv2B.byteOffset, dv2B.byteLength);
    const dv3: DataView = new DataView(dv3B.buffer, dv3B.byteOffset, dv3B.byteLength);
    const dv4: DataView = new DataView(dv4B.buffer, dv4B.byteOffset, dv4B.byteLength);

    assert(crypto.timingSafeEqual(dv1, dv2));
    assert(crypto.timingSafeEqual(dv1, dv1B));
    assert(crypto.timingSafeEqual(dv2, dv1B));
    assert(crypto.timingSafeEqual(dv3, dv4));

    assert(!crypto.timingSafeEqual(dv1, dv3));
    assert(!crypto.timingSafeEqual(dv2, dv3));
    assert(!crypto.timingSafeEqual(dv1, dv4));
    // ... I'm not going to write all those tests.
}

{
    // crypto_timingsafeequal_uint32array_test
    const ui32_1: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const ui32_2: Uint32Array = Uint32Array.of(1, 2, 3, 4, 5);
    const ui32_3: Uint32Array = Uint32Array.of(5, 4, 3, 2, 1);

    assert(crypto.timingSafeEqual(ui32_1, ui32_2));
    assert(!crypto.timingSafeEqual(ui32_1, ui32_3));
}

{
    // crypto_randomfill_buffer_test
    const buffer: Buffer = new Buffer(10);
    crypto.randomFillSync(buffer);
    crypto.randomFillSync(buffer, 2);
    crypto.randomFillSync(buffer, 2, 3);

    crypto.randomFill(buffer, (err: Error, buf: Buffer) => void {});
    crypto.randomFill(buffer, 2, (err: Error, buf: Buffer) => void {});
    crypto.randomFill(buffer, 2, 3, (err: Error, buf: Buffer) => void {});

    // crypto_randomfill_uint8array_test
    const ui8arr: Uint8Array = new Uint8Array(10);
    crypto.randomFillSync(ui8arr);
    crypto.randomFillSync(ui8arr, 2);
    crypto.randomFillSync(ui8arr, 2, 3);

    crypto.randomFill(ui8arr, (err: Error, buf: Uint8Array) => void {});
    crypto.randomFill(ui8arr, 2, (err: Error, buf: Uint8Array) => void {});
    crypto.randomFill(ui8arr, 2, 3, (err: Error, buf: Uint8Array) => void {});

    // crypto_randomfill_int32array_test
    const i32arr: Int32Array = new Int32Array(10);
    crypto.randomFillSync(i32arr);
    crypto.randomFillSync(i32arr, 2);
    crypto.randomFillSync(i32arr, 2, 3);

    crypto.randomFill(i32arr, (err: Error, buf: Int32Array) => void {});
    crypto.randomFill(i32arr, 2, (err: Error, buf: Int32Array) => void {});
    crypto.randomFill(i32arr, 2, 3, (err: Error, buf: Int32Array) => void {});
}

{
    // scrypt
    const pwd: string | Buffer | Int32Array | DataView = Buffer.alloc(16);
    const salt: string | Buffer | Int32Array | DataView = Buffer.alloc(16);
    crypto.scrypt(pwd, salt, 64, (err: Error | null, derivedKey: Buffer): void => {});
    const opts: crypto.ScryptOptions = {
        N: 16384,
        r: 8,
        p: 1,
        maxmem: 32 * 1024 * 1024
    };
    crypto.scrypt(pwd, salt, 64, opts, (err: Error | null, derivedKey: Buffer): void => {});
    crypto.scrypt(pwd, salt, 64, { maxmem: 16 * 1024 * 1024 }, (err: Error | null, derivedKey: Buffer): void => {});
    let buf: Buffer = crypto.scryptSync(pwd, salt, 64);
    buf = crypto.scryptSync(pwd, salt, 64, opts);
    buf = crypto.scryptSync(pwd, salt, 64, { N: 1024 });
}

{
    let key: string | Buffer = Buffer.from("buf");
    const curve = "secp256k1";
    let ret: string | Buffer = crypto.ECDH.convertKey(key, curve);
    key = "0xfff";
    ret = crypto.ECDH.convertKey(key, curve);
    ret = crypto.ECDH.convertKey(key, curve, "hex");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex", "uncompressed");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex", "compressed");
    ret = crypto.ECDH.convertKey(key, curve, "hex", "hex", "hybrid");
}

{
    const rsaRes: {
        publicKey: Buffer;
        privateKey: string;
    } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 123,
        publicKeyEncoding: {
            format: 'der',
            type: 'pkcs1',
        },
        privateKeyEncoding: {
            ciper: 'some-cipher',
            format: 'pem',
            passphrase: 'secret',
            type: 'pkcs8',
        },
    });

    const dsaRes: {
        publicKey: string;
        privateKey: Buffer;
    } = crypto.generateKeyPairSync('dsa', {
        modulusLength: 123,
        divisorLength: 123,
        publicKeyEncoding: {
            format: 'pem',
            type: 'spki',
        },
        privateKeyEncoding: {
            ciper: 'some-cipher',
            format: 'der',
            passphrase: 'secret',
            type: 'pkcs8',
        },
    });

    const ecRes: {
        publicKey: string;
        privateKey: string;
    } = crypto.generateKeyPairSync('ec', {
        namedCurve: 'curve',
        publicKeyEncoding: {
            format: 'pem',
            type: 'pkcs1',
        },
        privateKeyEncoding: {
            ciper: 'some-cipher',
            format: 'pem',
            passphrase: 'secret',
            type: 'pkcs8',
        },
    });
}
