import { NestFactory } from '@nestjs/core';
import { ProdutosModule } from './produtos.module';
import * as express from 'express';
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
  app.use((req:any,res:any,next:any) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  })
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  })
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
