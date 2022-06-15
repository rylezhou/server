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
const app = new Koa();
app.use(async ctx => ctx.response.body = await run());
app.listen(3000);

async function run() {
    return new Promise(resolve => {
        //define child process
        const child = child_process.fork('./child.js');
        // return resolve
        child.on('message', resolve);
        //define function
        const fn = fs.readFileSync('./func.js', 'utf8');
        //send function to child process
        child.send( {action: 'run', fn});
    });
} 




    
