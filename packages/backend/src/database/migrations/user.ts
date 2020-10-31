import knex from "knex";

export const up = async () => {
    return await knex(require("../../../config/database")).transaction(
        async trx => {
            const exists = await trx.schema.hasTable("user");
            if (!exists) {
                await trx.schema.createTable("user", table => {
                    table.uuid("id").primary();
                    table
                        .timestamp("createdAt")
                        .defaultTo(new Date().toISOString());
                    table.timestamp("updatedAt").nullable();
                    table.string("email").defaultTo("admin@example.com");
                    table.string("password");
                    table.string("username").unique();
                });
                await trx.commit();
                return console.log("created user table");
            }
        }
    );
};

export const down = async knex => {
    await knex(require("../../../config/database")).transaction(async trx => {
        const exists = await trx.schema.hasTable("user");
        if (exists) {
            await trx.schema.dropTable("user");
            await trx.commit();
            return console.log("deleted user table");
        }
    });
};
