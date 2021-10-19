import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Task Mask')
    .setDescription('The task API description')
    .setVersion('1.0')
    .build();
    const options: SwaggerDocumentOptions =  {
      operationIdFactory: (
        controllerKey: string,
        methodKey: string
      ) => methodKey
    };
    console.log(options)
  const document = SwaggerModule.createDocument(app, config, options);
  
  
  
  SwaggerModule.setup('apii', app, document);


  await app.listen(3000);
}
bootstrap();
