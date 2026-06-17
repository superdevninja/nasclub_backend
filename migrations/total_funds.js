const { resetCollection } = require("./lib");

const COLLECTION = "total_funds";

module.exports = {
  name: `total_fund (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);
    await db.collection(COLLECTION).insertOne({
      name: "Nasclub Community Fund",
      value: "0",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      summary: `Created ${COLLECTION} and seeded initial document`,
    };
  },
};
