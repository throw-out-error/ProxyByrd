import { Module } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { ConfigService } from "../config/config.service";
// import { KnexModule } from "@nestjsplus/knex";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route, User, Site } from "./entities";
import { ConfigModule } from "../config/config.module";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: ConfigService,
            imports: [ConfigModule],
        }),
    ],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule.forFeature([User, Site, Route])],
})
export class DatabaseModule {}
