import { NestFactory } from '@nestjs/core';
import { ProdutosModule } from './produtos.module';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

async function bootstrap() {
  dotenv.config();
  mongoose.connect(
    process.env.DB_CONNECTIONSTRING as string
  ).then(() => {
    console.log('Connected to database!');
  }).catch((err) => {
    console.log('Connection failed!');
    console.log(err)
    app.close();
  });
  const app = await NestFactory.create(ProdutosModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
