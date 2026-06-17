const { resetCollection } = require("./lib");

const COLLECTION = "orders";

module.exports = {
  name: `order (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    return {
      summary: `Created ${COLLECTION} collection (empty)`,
    };
  },
};
