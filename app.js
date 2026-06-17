const config = require("./config/env");
require("express-async-errors");

const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const app = express();
const mainRouter = require("./routes/user");

const corsOrigins = [config.frontendUrl];
if (!config.isProduction) {
  corsOrigins.push("http://localhost:3000");
}

app.use(express.json());

app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, env: config.nodeEnv });
});

app.use("/api/v1", mainRouter);

const start = async () => {
  try {
    await connectDB(config.mongoUri);
    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
