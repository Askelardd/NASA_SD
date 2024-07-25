/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * npm knex migrate:make nome_da_migracao
 * npm run migrate
 */
exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
      table.increments("id");
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("salt").notNullable();
      table.string("permission").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};