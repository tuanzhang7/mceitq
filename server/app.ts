import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as session from 'express-session';
import * as parseurl from 'parseurl';
import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   secure: false,
  //   maxAge: 600000
  // }
}))

// app.use(function (req, res, next) {
//   console.log('middleware:', req.session);
//   let views = req.session.views;
//
//   if (!views) {
//     views = req.session.views = {}
//   }
//
//   // get the url pathname
//   const pathname = parseurl(req).pathname;
//
//   // count the views
//   views[pathname] = (views[pathname] || 0) + 1;
//
//   next();
// })


app.use(morgan('dev'));
console.log('mongodb URI:' + process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  setRoutes(app);
  console.log('Serve client =====');
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  app.listen(app.get('port'), () => {
    console.log('Angular Full Stack listening on port ' + app.get('port'));
  });
});

// connection.openUri(process.env.MONGODB_URI, { /* options */ });

// const promise = mongoose.createConnection(process.env.MONGODB_URI, {
//   useMongoClient: true,
//   /* other options */
// });

// promise.then(function(db) {

// });

// // Or, if you already have a connection
// connection.openUri('mongodb://localhost/myapp', { /* options */
// });

// const db = mongoose.connection;
// (<any>mongoose).Promise = global.Promise;



export { app };
