import moduleModule = require('module');

require.extensions[".ts"] = () => "";

moduleModule.runMain();
const s: string = moduleModule.wrap("some code");

const m1: moduleModule = new moduleModule("moduleId");
const m2: moduleModule = new moduleModule.Module("moduleId");
const b: string[] = moduleModule.builtinModules;
let paths: string[] = module.paths;
paths = m1.paths;

moduleModule.createRequireFromPath('./test')('test');

// tslint:disable-next-line:no-var-requires
require('mymodule');
