
const Koa = require('koa');


const app = new Koa();

app.use(async ctx => ctx.response.body = "Hello World!");

app.listen(3000);

// exports.http = (request, response) => {
//   response.status(200).send('Hello World!');
// };

// exports.event = (event, callback) => {
//   callback();
// };
