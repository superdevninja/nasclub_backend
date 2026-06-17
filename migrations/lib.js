/**
 * Drop and recreate a collection so it appears in Compass even when empty.
 */
async function resetCollection(db, collectionName) {
  const existing = await db.listCollections({ name: collectionName }).toArray();
  if (existing.length > 0) {
    await db.collection(collectionName).drop();
  }
  await db.createCollection(collectionName);
}

module.exports = {
  resetCollection,
};
