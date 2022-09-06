import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";
import { HttpService } from "@nestjs/axios";
import axios from "axios"
import * as https from "https";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized:false,
})

  const config = new DocumentBuilder()
    .setTitle("Emergo API")
    .setDescription(" REST API Documentation ")
    .setVersion("1.0.0")
    .addTag("Nest JS ")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);



  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
