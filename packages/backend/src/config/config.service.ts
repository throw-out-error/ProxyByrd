import { Inject, Injectable, Optional } from "@nestjs/common";
import Joi from "joi";
import {
    BaseConfigService,
    Constants,
} from "@flowtr/nest-config";
import { KnexOptions, KnexOptionsFactory } from "@nestjsplus/knex";
import { join } from "path";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User, Site, Route } from "../database/entities";
import { ProxyByrdConfig } from "../util";
import { proxy, ProxyStoreJSON } from "@sebastianspeitel/proxystore";

@Injectable()
export class ConfigService
    extends BaseConfigService<ProxyByrdConfig>
    implements KnexOptionsFactory, TypeOrmOptionsFactory {
    constructor(
        @Optional()
        @Inject(Constants.CONFIGURATION_TOKEN)
        config: ProxyByrdConfig
    ) {
        super(true, proxy(ProxyStoreJSON, {path: `${__dirname}/../../../config.json`}));
    }

    // Our custom "schema"
    // We supply it to the ConfigManager by extending the
    // ConfigManager class and implementing the
    // provideConfigSpec() method, which simply returns
    // our custom schema
    getValidationSchema() {
        return Joi.object({
            DB_HOST: {
                validate: Joi.string(),
                required: false,
                default: "localhost",
            },
            DB_PORT: {
                validate: Joi.number().min(1).max(65535),
                required: false,
                default: 27017,
            },
            DB_USER: {
                validate: Joi.string(),
                required: false,
                default: "",
            },
            DB_PASS: {
                validate: Joi.string(),
                required: false,
                default: "",
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
        });
    }

    /**
     * Creates the knex database configuration
     */
    createKnexOptions(): KnexOptions | Promise<KnexOptions> {
        return {
            client: "mongodb",
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
