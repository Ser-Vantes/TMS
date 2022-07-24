import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan-body';
import bodyParser from 'body-parser';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";


async function start(){
  const PORT = process.env.PORT || 5000
  const app = await  NestFactory.create(AppModule)
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Emergo API')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addTag('NestJS Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  // app.useGlobalGuards(JwtAuthGuard)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, ()=>{
    console.log(`Server working on port http://localhost:${PORT}/`)
  })
}

start()
