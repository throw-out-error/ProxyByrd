import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";

@Module({
    imports: [ConfigModule, AuthModule, DatabaseModule],
    controllers: [AppController],
    providers: []
})
export class AppModule {}
