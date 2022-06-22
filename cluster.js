const cluster = require('cluster');
const fs = require('fs');
const numCPUs = require('os').cpus().length;
const Koa = require('koa');
const process = require('process');

//sandbox context
const { VM } = require('vm2');


if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

 } else {
    const app = new Koa();
    app.use(async ctx => ctx.response.body = await run(ctx.request.path));
    app.listen(3000);
    }


async function run(path) {
    try {
        const fn = fs.readFileSync(`./${path}.js`, 'utf8');
        const fnIIFE = `({${fn}})()`;
        return new VM().run(fnIIFE);

    } catch (e) {
        if (e.code === 'ENOENT') {
            return {message: 'function is not found', status: 'error'};
        }
        return {message: e.toString(), status: 'error'};
    }
}
    