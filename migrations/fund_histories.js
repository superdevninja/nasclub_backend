const { resetCollection } = require("./lib");

const COLLECTION = "fund_histories";

module.exports = {
  name: `fund_history (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    return {
      summary: `Created ${COLLECTION} collection (empty)`,
    };
  },
};
