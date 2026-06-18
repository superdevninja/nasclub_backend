const config = require("../config/env");
const mongoose = require("mongoose");
const registry = require("./registry");

async function run() {
  const name = process.argv[2];

  if (!name) {
    console.error("Usage: node migrations/run-one.js <migration-name>");
    console.error(`Available: ${Object.keys(registry).join(", ")}`);
    process.exit(1);
  }

  const migration = registry[name];
  if (!migration) {
    console.error(`Unknown migration: ${name}`);
    console.error(`Available: ${Object.keys(registry).join(", ")}`);
    process.exit(1);
  }

  const hostHint = (config.mongoUri.match(/@([^/?]+)/) || [])[1] || "unknown";
  const isLocal =
    config.mongoUri.includes("localhost") ||
    config.mongoUri.includes("127.0.0.1");

  console.log(`Connecting (${config.nodeEnv})...`);
  console.log(`Mongo host: ${hostHint}`);
  if (config.isProduction && isLocal) {
    console.error(
      "Refusing to run production migrations against localhost. Set MONGODB_URI in .env.production to your Atlas URI (with /aaa)."
    );
    process.exit(1);
  }

  await mongoose.connect(config.mongoUri);
  const db = mongoose.connection.db;

  console.log(`Database: ${db.databaseName}`);
  console.log(`Running migration: ${name}\n`);

  const result = await migration.up(db);
  console.log(result.summary);

  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
