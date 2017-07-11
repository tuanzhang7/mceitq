import * as express from 'express';

// import CatCtrl from './controllers/cat';
import ItqCtrl from './controllers/itq';
import UserCtrl from './controllers/user';
// import Cat from './models/cat';
import User from './models/user';
import * as auth from './auth/auth.service';

export default function setRoutes(app) {

  const router = express.Router();

  // const catCtrl = new CatCtrl();
  const itqCtrl = new ItqCtrl();
  const userCtrl = new UserCtrl();

  // Cats
  // router.route('/cats').get(catCtrl.getAll);
  // router.route('/cats/count').get(catCtrl.count);
  // router.route('/cat').post(catCtrl.insert);
  // router.route('/cat/:id').get(catCtrl.get);
  // router.route('/cat/:id').put(catCtrl.update);
  // router.route('/cat/:id').delete(catCtrl.delete);
  // Cats
  router.route('/itqs').get(itqCtrl.getByUser);
  router.route('/itqs/count').get(itqCtrl.count);
  router.route('/itq').post(itqCtrl.insert);
  router.route('/itq/:name').get(auth.isAuthenticated, itqCtrl.getByName);
  // router.route('/itq/:id').put(itqCtrl.update);
  // router.route('/itq/:id').delete(itqCtrl.delete);
  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(auth.isAuthenticated, userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);

  router.route('/user/:id')
  .get(userCtrl.get)
  .put(userCtrl.update)
  .delete(userCtrl.delete);


  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
