const dotenv = require("dotenv");

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || "8000";
export default {
  project_name: process.env.PROJECT_NAME || "Name not provied",
  host: process.env.HOST || "127.0.0.1",
  rpID: process.env.HOST || "localhost",
  frontend: process.env.FRONTEND_URL || "",
  port: parseInt(process.env.PORT) || 8000,
  keys: {
    public: process.env.PUBLIC_KEY || "",
    private: process.env.PRIVATE_KEY || "",
  },
  seed: parseInt(process.env.SEED) || 12,
};
