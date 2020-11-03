import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle("ProxyByrd API")
        .setDescription("The ProxyByrd API description")
        .setVersion("1.0.0")
        .addTag("API")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api", app, document);
    app.enableCors();

    await app.listen(process.env.PORT ?? 3000);
    console.log(`Nest app listening`);
}
bootstrap();
