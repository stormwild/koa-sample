const Koa = require('koa'); 
const app = new Koa(); 

const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
 ctx.body = 'Hello World!';
});


const logger = require('koa-logger');
app.use(logger());


app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

app.on('error', (err, ctx) => {
  /* centralized error handling:
   *   console.log error
   *   write error to log file
   *   save error and request information to database if ctx.request match condition
   *   ...
  */
});

const server = app.listen(3000);
module.exports = server;