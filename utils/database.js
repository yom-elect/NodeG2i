import { set, Promise, connect } from "mongoose";
import { Acronym } from '../models/acronym';
import { seed } from '../mongo-seed/init';
set("useUnifiedTopology", true);
set("useCreateIndex", true);

Promise = global.Promise;

const mongooseConnect = () => {
  connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(async (_) => {
      for (data of seed){
        const mapData = Object.entries(data);
        const acry = new Acronym({
          acronym: mapData[0],
          definition: mapData[1]
        });
        await acry.save();
      }
    })
    .catch((err) => console.log(err));
};

const _mongooseConnect = mongooseConnect;
export { _mongooseConnect as mongooseConnect };
