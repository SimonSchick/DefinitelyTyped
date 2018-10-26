import * as string_decoder from 'string_decoder';

const StringDecoder = string_decoder.StringDecoder;
const buffer = new Buffer('test');
const decoder1 = new StringDecoder();
const decoder2 = new StringDecoder('utf8');
const part1: string = decoder1.write(new Buffer('test'));
const end1: string = decoder1.end();
const part2: string = decoder2.write(new Buffer('test'));
const end2: string = decoder1.end(new Buffer('test'));
