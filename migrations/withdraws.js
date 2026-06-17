const { resetCollection } = require("./lib");

const COLLECTION = "withdraws";

module.exports = {
  name: `withdraw (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    return {
      summary: `Created ${COLLECTION} collection (empty)`,
    };
  },
};
