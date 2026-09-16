import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.WEB_ORIGIN ?? "http://localhost:3000" }
  });
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }));
  await app.listen(Number(process.env.API_PORT ?? 4000));
}

void bootstrap();
