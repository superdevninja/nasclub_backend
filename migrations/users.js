const bcrypt = require("bcryptjs");
const { resetCollection } = require("./lib");

const COLLECTION = "users";

module.exports = {
  name: `users (${COLLECTION})`,
  async up(db) {
    await resetCollection(db, COLLECTION);

    const passwordHash = await bcrypt.hash("admin@gmail.com", 10);

    await db.collection(COLLECTION).insertOne({
      name: "Admin",
      email: "admin@gmail.com",
      password: passwordHash,
      phoneNumber: "0000000000",
      country: "Israel",
      majority: "Software developer",
      bank: "0d0a180bE7474b8c8e",
      IFSC_Code: "IFCD00642",
      branch: "Tel aviv",
      role: "admin",
      avatar: "defaultAvatar.png",
      logstatus: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      summary:
        "Created users collection and seeded admin (admin@gmail.com / admin@gmail.com)",
    };
  },
};
