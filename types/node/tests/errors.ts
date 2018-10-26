{
    Error.stackTraceLimit = Infinity;
}
{
    const myObject = {};
    Error.captureStackTrace(myObject);
}
{
    const frames: NodeJS.CallSite[] = [];
    Error.prepareStackTrace(new Error(), frames);
}
{
    const frame: NodeJS.CallSite = null;
    const frameThis: any = frame.getThis();
    const typeName: string = frame.getTypeName();
    const func: Function = frame.getFunction();
    const funcName: string = frame.getFunctionName();
    const meth: string = frame.getMethodName();
    const fname: string = frame.getFileName();
    const lineno: number = frame.getLineNumber();
    const colno: number = frame.getColumnNumber();
    const evalOrigin: string = frame.getEvalOrigin();
    const isTop: boolean = frame.isToplevel();
    const isEval: boolean = frame.isEval();
    const isNative: boolean = frame.isNative();
    const isConstr: boolean = frame.isConstructor();
}
