exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION "uuid-ossp"')
    .createTable("webmentions", (table) => {
      table
        .uuid("id")
        .primary()
        .notNullable()
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table.text("target").notNullable();

      table.text("source").notNullable();

      table.string("type").notNullable();

      table.unique(["target", "source", "type"]);

      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("webmentions").raw('DROP EXTENSION "uuid-ossp"');
};
