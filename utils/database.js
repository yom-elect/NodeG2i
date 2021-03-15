import { set, Promise, connect } from "mongoose";
set("useUnifiedTopology", true);
set("useCreateIndex", true);

Promise = global.Promise;

const mongooseConnect = () => {
  connect(process.env.DATABASE, { useNewUrlParser: true })
    .then((result) => {
      //console.log("connected")
    })
    .catch((err) => console.log(err));
};

const _mongooseConnect = mongooseConnect;
export { _mongooseConnect as mongooseConnect };
