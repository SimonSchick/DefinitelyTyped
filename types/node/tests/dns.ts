import * as dns from 'dns';

dns.lookup("nodejs.org", (err, address, family) => {
    const _err: NodeJS.ErrnoException = err;
    const _address: string = address;
    const _family: number = family;
});
dns.lookup("nodejs.org", 4, (err, address, family) => {
    const _err: NodeJS.ErrnoException = err;
    const _address: string = address;
    const _family: number = family;
});
dns.lookup("nodejs.org", 6, (err, address, family) => {
    const _err: NodeJS.ErrnoException = err;
    const _address: string = address;
    const _family: number = family;
});
dns.lookup("nodejs.org", {}, (err, address, family) => {
    const _err: NodeJS.ErrnoException = err;
    const _address: string = address;
    const _family: number = family;
});
dns.lookup(
    "nodejs.org",
    {
        family: 4,
        hints: dns.ADDRCONFIG | dns.V4MAPPED,
        all: false
    },
    (err, address, family) => {
        const _err: NodeJS.ErrnoException = err;
        const _address: string = address;
        const _family: number = family;
    }
);
dns.lookup("nodejs.org", { all: true }, (err, addresses) => {
    const _err: NodeJS.ErrnoException = err;
    const _address: dns.LookupAddress[] = addresses;
});
dns.lookup("nodejs.org", { all: true, verbatim: true }, (err, addresses) => {
    const _err: NodeJS.ErrnoException = err;
    const _address: dns.LookupAddress[] = addresses;
});

function trueOrFalse(): boolean {
    return Math.random() > 0.5 ? true : false;
}
dns.lookup("nodejs.org", { all: trueOrFalse() }, (err, addresses, family) => {
    const _err: NodeJS.ErrnoException = err;
    const _addresses: string | dns.LookupAddress[] = addresses;
    const _family: number | undefined = family;
});

dns.lookupService("127.0.0.1", 0, (err, hostname, service) => {
    const _err: NodeJS.ErrnoException = err;
    const _hostname: string = hostname;
    const _service: string = service;
});

dns.resolve("nodejs.org", (err, addresses) => {
    const _addresses: string[] = addresses;
});
dns.resolve("nodejs.org", "A", (err, addresses) => {
    const _addresses: string[] = addresses;
});
dns.resolve("nodejs.org", "AAAA", (err, addresses) => {
    const _addresses: string[] = addresses;
});
dns.resolve("nodejs.org", "ANY", (err, addresses) => {
    const _addresses: dns.AnyRecord[] = addresses;
});
dns.resolve("nodejs.org", "MX", (err, addresses) => {
    const _addresses: dns.MxRecord[] = addresses;
});

dns.resolve4("nodejs.org", (err, addresses) => {
    const _addresses: string[] = addresses;
});
dns.resolve4("nodejs.org", { ttl: true }, (err, addresses) => {
    const _addresses: dns.RecordWithTtl[] = addresses;
});
{
    const ttl = false;
    dns.resolve4("nodejs.org", { ttl }, (err, addresses) => {
        const _addresses: string[] | dns.RecordWithTtl[] = addresses;
    });
}

dns.resolve6("nodejs.org", (err, addresses) => {
    const _addresses: string[] = addresses;
});
dns.resolve6("nodejs.org", { ttl: true }, (err, addresses) => {
    const _addresses: dns.RecordWithTtl[] = addresses;
});
{
    const ttl = false;
    dns.resolve6("nodejs.org", { ttl }, (err, addresses) => {
        const _addresses: string[] | dns.RecordWithTtl[] = addresses;
    });
}
{
    const resolver = new dns.Resolver();
    resolver.setServers(["4.4.4.4"]);
    resolver.resolve("nodejs.org", (err, addresses) => {
        const _addresses: string[] = addresses;
    });
    resolver.cancel();
}
