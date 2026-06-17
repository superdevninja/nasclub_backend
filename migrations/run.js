const config = require("../config/env");
const mongoose = require("mongoose");
const registry = require("./registry");

const migrations = Object.values(registry);

async function run() {
  console.log(`Connecting (${config.nodeEnv})...`);
  await mongoose.connect(config.mongoUri);
  const db = mongoose.connection.db;

  console.log(`Database: ${db.databaseName}`);
  console.log(`Running ${migrations.length} migration(s)...\n`);

  for (const migration of migrations) {
    console.log(`→ ${migration.name}`);
    const result = await migration.up(db);
    console.log(`  ${result.summary}\n`);
  }

  console.log("All migrations completed.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
