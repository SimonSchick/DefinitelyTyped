import * as fs from 'fs';
import * as console2 from 'console';

{
    let _c: console2.Console = console;
    _c = console2;
}
{
    const writeStream = fs.createWriteStream('./index.d.ts');
    const consoleInstance = new console.Console(writeStream);
}
