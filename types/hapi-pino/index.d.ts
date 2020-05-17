// Type definitions for hapi-pino 8.0
// Project: https://github.com/pinojs/hapi-pino#readme
// Definitions by: Rodrigo Saboya <https://github.com/saboya>
//                 Todd Bealmear <https://github.com/todd>
//                 Matt Jeanes <https://github.com/BlooJeans>
//                 Kyle Gray <https://github.com/GoPro16>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

/// <reference types='node' />

import { WriteStream } from 'tty';

import * as pino from 'pino';

import { Plugin, Request } from '@hapi/hapi';

declare module '@hapi/hapi' {
    interface Server {
        logger: pino.Logger;
    }

    interface Request {
        logger: pino.Logger;
    }
}

declare namespace HapiPino {
    interface Serializers {
        [key: string]: pino.SerializerFn;
    }

    interface Options {
        logPayload?: boolean;
        logRouteTags?: boolean;
        logRequestStart?: boolean | ((req: Request) => boolean);
        logRequestComplete?: boolean | ((req: Request) => boolean);
        stream?: WriteStream;
        prettyPrint?: boolean | pino.PrettyOptions;
        tags?: { [key in pino.Level]?: string };
        allTags?: pino.Level;
        serializers?: Serializers;
        getChildBindings?: (
            req: Request,
        ) => {
            level?: pino.Level | string;
            serializers?: Serializers;
            [key: string]: any;
        };
        instance?: pino.Logger;
        logEvents?: string[] | false | null;
        mergeHapiLogData?: boolean;
        ignorePaths?: string[];
        level?: pino.Level;
        redact?: string[] | pino.redactOptions;
    }
}

declare var HapiPino: Plugin<HapiPino.Options>;

export = HapiPino;
