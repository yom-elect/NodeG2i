import { sign, verify } from "jsonwebtoken";
import SHA256 from "crypto-js/sha256";

require("dotenv").config();

const jwtToken = (id) => {
  return sign(id, process.env.SECRET);
};

const jwtVerify = (token) => {
  return verify(token, process.env.SECRET);
};

const cryptoToken = () => {
  return SHA256().toString();
};

export default { jwtToken, jwtVerify, cryptoToken };
