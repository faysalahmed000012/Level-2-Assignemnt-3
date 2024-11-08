import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  mongo_uri: process.env.MONGO_URI,
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_refresh_expires_in: process.env.JWT_REFRESHTOKEN_EXPIRESIN,
  jwt_refresh_secret: process.env.JWT_REFRESHTOKEN_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESSTOKEN_EXPIRESIN,
  jwt_access_secret: process.env.JWT_ACCESSTOKEN_SECRET,
  store_id: process.env.STORE_ID,
  secret_key: process.env.SIGNATURE_KEY,
  payment_url: process.env.PAYMENT_URL,
  client_url: process.env.CLIENT_URL,
  server_url: process.env.SERVER_URL,
};
