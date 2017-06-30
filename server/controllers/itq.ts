import Itq from '../models/itq';
import BaseCtrl from './base';

export default class ItqCtrl extends BaseCtrl {
  model = Itq;

  getByName = (req, res) => {
    this.model.findOne({ name: req.params.name }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };

  getByUser = (req, res) => {
    console.log('req.session:', req.session);
    const username = req.session.user.username; // 'ITQ375_user';
    // req.user.username;

    this.model.find({roles: [username]}, (err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  };
}
