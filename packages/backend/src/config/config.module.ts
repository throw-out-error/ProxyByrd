import { Module, Global } from "@nestjs/common";
import { ConfigManagerModule } from "@nestjsplus/config";
import { ConfigService } from "./config.service";
import { join } from "path";
@Global()
@Module({
    imports: [
        ConfigManagerModule.register({
            useEnv: {
                folder: join(__dirname, "..", "..", "..", "..", "config")
            }
        })
    ],
    providers: [ConfigService],
    exports: [ConfigService]
})
export class ConfigModule {}
