import * as tty from 'tty';

const rs: tty.ReadStream = new tty.ReadStream();
const ws: tty.WriteStream = new tty.WriteStream();

const rsIsRaw: boolean = rs.isRaw;
rs.setRawMode(true);

const wsColumns: number = ws.columns;
const wsRows: number = ws.rows;

const isTTY: boolean = tty.isatty(1);
