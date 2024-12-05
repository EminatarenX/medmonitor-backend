import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { parentPort, workerData } from 'worker_threads';

export async function bootstrap() {
  try {
    console.log(`Worker starting on port ${workerData.port}...`); // Log de inicio del worker
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('MedMonitor API')
      .setDescription('Helpful right?')
      .setVersion('1.0')
      .addTag('medmonitor')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.setGlobalPrefix('api/v1');

    app.enableCors({
      origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.listen(workerData.port); 

    console.log(`Worker running on port ${workerData.port}`); 
    if (parentPort) {
      parentPort.postMessage('Worker started successfully');
    }

    // Mantén el proceso activo
    setInterval(() => {}, 1000); 
  } catch (error) {
    console.error(`Error in worker on port ${workerData.port}: ${error.message}`);
    if (parentPort) {
      parentPort.postMessage(`Worker failed to start: ${error.message}`);
    }
  }
}

bootstrap();
