const db = require("../server/db");

const main = async () => {
  await db.migrate.latest();
};

main();
