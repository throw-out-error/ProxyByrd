import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "../config/config.service";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "../config/config.module";

@Module({
    providers: [AuthService, LocalStrategy],
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "7d" }
            }),
            inject: [ConfigService]
        }),
        DatabaseModule
    ],
    exports: [AuthService],
    controllers: []
})
export class AuthModule {}
