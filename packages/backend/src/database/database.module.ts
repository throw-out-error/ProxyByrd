import { Module } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { ConfigService } from "../config/config.service";
// import { KnexModule } from "@nestjsplus/knex";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useExisting: ConfigService,
			inject: [ConfigService],
		}),
		TypeOrmModule.forFeature([User]),
	],
	providers: [UsersService],
	exports: [UsersService],
})
export class DatabaseModule {}
