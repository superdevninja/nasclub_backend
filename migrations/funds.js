const { resetCollection } = require("./lib");

const COLLECTION = "funds";

module.exports = {
  name: `fund (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    return {
      summary: `Created ${COLLECTION} collection (empty)`,
    };
  },
};
