import * as vm from 'vm';
import * as util from 'util';

{
    const sandbox = {
        animal: 'cat',
        count: 2
    };

    const context = vm.createContext(sandbox);
    console.log(vm.isContext(context));
    const script = new vm.Script('count += 1; name = "kitty"');

    for (let i = 0; i < 10; ++i) {
        script.runInContext(context);
    }

    console.log(util.inspect(sandbox));

    vm.runInNewContext('count += 1; name = "kitty"', sandbox);
    console.log(util.inspect(sandbox));
}

{
    const sandboxes = [{}, {}, {}];

    const script = new vm.Script('globalVar = "set"');

    sandboxes.forEach((sandbox) => {
        script.runInNewContext(sandbox);
        script.runInThisContext();
    });

    console.log(util.inspect(sandboxes));

    const localVar = 'initial value';
    vm.runInThisContext('localVar = "vm";');

    console.log(localVar);
}

{
    vm.runInThisContext('console.log("hello world"', './my-file.js');
}

{
    const fn: Function = vm.compileFunction('console.log("test")', [], {
        parsingContext: vm.createContext(),
        contextExtensions: [{
            a: 1,
        }],
        produceCachedData: false,
        cachedData: Buffer.from('nope'),
    });
}
