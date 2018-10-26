// Usage: node generate-inspector [tag]
// [tag] corresponds to a tag name in the node-core repository.

import { readFileSync, writeFileSync } from "fs";
import { get } from "https";
import { Schema } from "./devtools-protocol-schema";
import { generateSubstituteArgs } from "./generate-substitute-args";
import { substitute, trimRight } from "./utils";

// Input arguments
const tag = process.argv[2] || process.version;

const PROTOCOL_URL = `https://raw.githubusercontent.com/nodejs/node/${tag}/deps/v8/src/inspector/js_protocol.json`;

function writeProtocolToFile(json: string) {
    const protocol: Schema = JSON.parse(json);

    const template = readFileSync(`${__dirname}/inspector.d.ts.template`, "utf8");

    const substituteArgs = generateSubstituteArgs(protocol);
    const inspectorDts = substitute(template, substituteArgs).split("\n")
        .map(line => trimRight(line))
        .join("\n");

    writeFileSync("./types/inspector.d.ts", inspectorDts, "utf8");
}

get(PROTOCOL_URL, res => {
    const frames: Buffer[] = [];
    res.on("data", (data: Buffer) => {
        frames.push(data);
    });
    res.on("end", () => {
        writeProtocolToFile(Buffer.concat(frames).toString("utf8"));
    });
});
