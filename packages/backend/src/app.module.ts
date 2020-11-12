import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "./config/config.module";
import { ReverseProxyMiddleware } from "./proxy/proxy.middleware";
import { ProxyController } from "./proxy/proxy.controller";

@Module({
    imports: [ConfigModule, AuthModule, DatabaseModule],
    controllers: [AppController, ProxyController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ReverseProxyMiddleware);
    }
}
