const child_process = require('child_process');
const fs = require('fs');

const Koa = require('koa');

//before------
// const child = child_process.fork('./child.js');
// child.on('message', function (data) {
//     // console.log('master got message:', message);
//     console.log('Function result: ', data.result);
// });

// const fn = fs.readFileSync('./func.js', 'utf8');
// child.send( {action: 'run', fn});




//----after-----
//koa replace express, no middleware
const app = new Koa();
//
app.use(async ctx => ctx.response.body = await run());
app.listen(3000);

async function run(path) {
    return new Promise((resolve, reject) => {
        const child = child_process.fork('./child.js');
        child.on('message', resolve); 
        //
        try {
            const fn = fs.readFileSync(`./${path}.js`, 'utf8');
            child.send( {action: 'running fn', fn});
        }
        //
        catch (err) {
            if (err.code === 'ENOENT') {
                return resolve({message: 'function is not found', status: 'error'});
            }
            return reject(err.toString());
        }
    });
}



//----add cluster wont' need child.js--> move to cluster.js-----

// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// // console.log(`Total workers: ${numCPUs}`);

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);

//     // Fork workers
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });
// }  else {
//     //create http server
//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('hello world\n');
//     }).listen(3000);

//     console.log(`Worker ${process.pid} started`);
    
    
// }
    
