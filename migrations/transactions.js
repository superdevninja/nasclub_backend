const { resetCollection } = require("./lib");

const COLLECTION = "transactions";

module.exports = {
  name: `transaction (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    return {
      summary: `Created ${COLLECTION} collection (empty)`,
    };
  },
};
