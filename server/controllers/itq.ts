import Itq from '../models/itq';
import BaseCtrl from './base';
import * as _ from 'lodash';
export default class ItqCtrl extends BaseCtrl {
  model = Itq;

  getByName = (req, res) => {
    const username = req.session.user.username; // 'ITQ375_user';
    if (!username) {
      return res.json({});
    }

    this.model.findOne({ name: req.params.name }, (err, doc) => {
      if (err) { return console.error(err); }

      _.remove(doc.resources, function (currentObject: any) {
        return _.includes(currentObject.deny, username);
      });

      res.json(doc);
    });
  };

  getByUser = (req, res) => {
    // console.log('req.session:', req.session);
    const username = req.session.user.username; // 'ITQ375_user';
    if (!username) {
      return res.json({});
    }
    // req.user.username;
    let query = {};
    if (req.session.user.role !== 'admin') {
      query = { roles: username };
    }
    this.model.find(query, (err, docs) => {
      if (err) { return console.error(err); }
      docs.forEach(doc => {
        _.remove(doc.resources, function (currentObject: any) {
          return _.includes(currentObject.deny, username);
        });
      });

      console.log('return:', docs);
      res.json(docs);
    });
  };
}
