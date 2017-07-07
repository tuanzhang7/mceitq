import * as mongoose from 'mongoose';
import { Iitq } from '../../interfaces/Iitq';

const itqSchema = new mongoose.Schema({
  name: String,
  description: String,
  roles: [String],
  resources: [
    {
      subject: String,
      folder: String,
      deny: [String],
      topics: [
        {
          SNo: String,
          topic: String,
          itqsynopsis: String,
          mcesynopsis: String,
          addinfo: String,
          resID: String,
          duration: String,
          startfile: String
        }
      ]
    }
  ]
});

const Itq = mongoose.model<Iitq>('Itq', itqSchema);

export default Itq;
