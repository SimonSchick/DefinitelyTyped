const x: NodeModule = {} as any;
const y: NodeModule = {} as any;
x.children.push(y);
x.parent = require.main;
require.main = y;

const a: TextEncoder = new TextEncoder();
const b: TextDecoder = new TextDecoder();
