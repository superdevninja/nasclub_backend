const { resetCollection } = require("./lib");

const COLLECTION = "add_withdrawls";

module.exports = {
  name: `add_withdrawl (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    return {
      summary: `Created ${COLLECTION} collection (empty)`,
    };
  },
};
