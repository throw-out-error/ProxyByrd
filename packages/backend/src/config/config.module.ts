import { Module, Global } from "@nestjs/common";
import {} from "@flowtr/nest-config";
import { ConfigService } from "./config.service";
import { join } from "path";
import { readFileSync } from "fs";
import yaml from "yaml";

@Global()
@Module({
	imports: [],
	providers: [ConfigService],
	exports: [ConfigService],
})
export class ConfigModule {}
