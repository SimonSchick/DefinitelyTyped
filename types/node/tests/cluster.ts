import cluster = require('cluster');

{
    cluster.fork();
    Object.keys(cluster.workers).forEach(key => {
        const worker = cluster.workers[key];
        if (worker.isDead()) {
            console.log('worker %d is dead', worker.process.pid);
        }
    });
}
{
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.schedulingPolicy = cluster.SCHED_RR;
}
