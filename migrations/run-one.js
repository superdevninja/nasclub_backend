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

  console.log(`Connecting (${config.nodeEnv})...`);
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
