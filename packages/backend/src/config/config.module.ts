import { Module, Global } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigService } from "./config.service";
import { join } from "path";
import { readFileSync } from "fs";
import yaml from "yam";

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            load: [
                () =>
                    yaml.parse(
                        readFileSync(`${__dirname}/../../../config.yml`, {
                            encoding: "utf-8",
                        })
                    ),
            ],
        }),
    ],
    providers: [],
    exports: [NestConfigModule],
})
export class ConfigModule {}
