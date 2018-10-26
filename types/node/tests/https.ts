import * as https from 'https';
import * as http from 'http';
import * as url from 'url';

let agent: https.Agent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 10000,
    maxSockets: Infinity,
    maxFreeSockets: 256,
    maxCachedSessions: 100,
    timeout: 15000
});

agent = https.globalAgent;

https.request({
    agent: false
});
https.request({
    agent
});
https.request({
    agent: undefined
});

https.get('http://www.example.com/xyz');
https.request('http://www.example.com/xyz');

https.get('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});
https.request('http://www.example.com/xyz', (res: http.IncomingMessage): void => {});

https.get(new url.URL('http://www.example.com/xyz'));
https.request(new url.URL('http://www.example.com/xyz'));

https.get(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});
https.request(new url.URL('http://www.example.com/xyz'), (res: http.IncomingMessage): void => {});

const opts: https.RequestOptions = {
    path: '/some/path'
};
https.get(new url.URL('http://www.example.com'), opts);
https.request(new url.URL('http://www.example.com'), opts);
https.get(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});
https.request(new url.URL('http://www.example.com/xyz'), opts, (res: http.IncomingMessage): void => {});

https.globalAgent.options.ca = [];

{
    const server = new https.Server();

    const timeout: number = server.timeout;
    const listening: boolean = server.listening;
    const keepAliveTimeout: number = server.keepAliveTimeout;
    server.setTimeout().setTimeout(1000).setTimeout(() => {}).setTimeout(100, () => {});
}
