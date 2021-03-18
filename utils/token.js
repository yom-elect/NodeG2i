import SHA256 from "crypto-js/sha256";

const cryptoToken = () => {
  return SHA256().toString();
};

export default cryptoToken;
