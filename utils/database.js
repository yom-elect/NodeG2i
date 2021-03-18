import { set, connect } from "mongoose";
import { Acronym } from '../models/acronym';
import { seed } from '../mongo-seed/init';
set("useUnifiedTopology", true);
set("useCreateIndex", true);

const mongooseConnect = () => {
  connect(process.env.DATABASE, { useNewUrlParser: true })
    .then(async (_) => {
      for (let data of seed){
        const mapData = Object.entries(data)[0];
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