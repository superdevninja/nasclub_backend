const path = require("path");
const dotenv = require("dotenv");

const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

// Optional local overrides, then environment-specific file.
dotenv.config({ path: path.join(__dirname, "..", ".env") });
if (isProduction) {
  dotenv.config({
    path: path.join(__dirname, "..", ".env.production"),
    override: true,
  });
} else {
  dotenv.config({ path: path.join(__dirname, "..", `.env.${NODE_ENV}`) });
}

const config = {
  nodeEnv: NODE_ENV,
  isProduction,
  port: parseInt(process.env.PORT || "5000", 10),
  mongoUri:
    process.env.MONGODB_URI ||
    (isProduction ? "" : "mongodb://localhost:27017/aaa"),
  jwtSecret:
    process.env.JWT_SECRET ||
    (isProduction ? "" : "dev-jwt-secret-change-me"),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
};

if (isProduction) {
  if (!config.mongoUri) {
    console.error("MONGODB_URI is required in production");
    process.exit(1);
  }
  if (!config.jwtSecret) {
    console.error("JWT_SECRET is required in production");
    process.exit(1);
  }
}

module.exports = config;
