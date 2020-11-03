import { Injectable } from "@nestjs/common";
import { ConfigManager } from "@nestjsplus/config";
import Joi from "joi";
import { KnexOptions, KnexOptionsFactory } from "@nestjsplus/knex";
import { join } from "path";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User, Site, Route } from "../database/entities";

@Injectable()
export class ConfigService
    extends ConfigManager
    implements KnexOptionsFactory, TypeOrmOptionsFactory {
    // Our custom "schema"
    // We supply it to the ConfigManager by extending the
    // ConfigManager class and implementing the
    // provideConfigSpec() method, which simply returns
    // our custom schema
    provideConfigSpec() {
        return {
            DB_HOST: {
                validate: Joi.string(),
                required: false,
                default: "localhost",
            },
            DB_PORT: {
                validate: Joi.number().min(1).max(65535),
                required: false,
                default: 5432,
            },
            DB_USER: {
                validate: Joi.string(),
                required: true,
            },
            DB_PASS: {
                validate: Joi.string(),
                required: true,
            },
            DB_NAME: {
                validate: Joi.string(),
                required: false,
                default: "proxybyrd",
            },
            DB_DEBUG: {
                validate: Joi.bool(),
                required: false,
                default: "false",
            },
            JWT_SECRET: {
                validate: Joi.string(),
                required: false,
                default: "secret 1234",
            },
        };
    }

    /**
     * Creates the knex database configuration
     */
    createKnexOptions(): KnexOptions | Promise<KnexOptions> {
        return {
            client: "pg",
            debug: this.get<boolean>("DB_DEBUG"),
            connection: {
                host: this.get<string>("DB_HOST"),
                user: this.get<string>("DB_USER"),
                password: this.get<string>("DB_PASS"),
                database: this.get<string>("DB_NAME"),
                port: this.get<number>("DB_PORT"),
                debug: this.get<boolean>("DB_DEBUG"),
            },
            pool: {
                min: 0,
                max: 5,
            },
            migrations: {
                directory: join(__dirname, "..", "database", "migrations"),
                loadExtensions: [".js", ".ts"],
            },
        };
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: this.get<string>("DB_HOST"),
            username: this.get<string>("DB_USER"),
            password: this.get<string>("DB_PASS"),
            database: this.get<string>("DB_NAME"),
            port: this.get<number>("DB_PORT"),
            logging: this.get<boolean>("DB_DEBUG") ? ["error"] : false,
            autoLoadEntities: true,
            synchronize: true,
        };
    }
}
