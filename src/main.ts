import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
  const fs = require('fs');
  const key = fs.readFileSync("src/cert/key.pem", 'utf8');
  const cert = fs.readFileSync("src/cert/cert.pem", 'utf8');

  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule,
    {
      httpsOptions: {
        key: key,
        cert: cert,
      }});
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });


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