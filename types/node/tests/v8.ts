import * as v8 from 'v8';

const heapStats = v8.getHeapStatistics();
const heapSpaceStats = v8.getHeapSpaceStatistics();

const zapsGarbage: number = heapStats.does_zap_garbage;

v8.setFlagsFromString('--collect_maps');
