import Itq from '../models/itq';
import BaseCtrl from './base';

export default class ItqCtrl extends BaseCtrl {
  model = Itq;

  getByName = (req, res) => {
    console.log('+++++++++++++ getByName:' + req.params.name);
    this.model.findOne({ name: req.params.name }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };
}
