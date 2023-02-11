import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { prisma } from './database';
import routes from './routes';

const main = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.get('/students', routes.listStudents);
  app.post('/student', routes.createStudent);

  app.listen(80, () => {
    console.log('listening on port 80');
  });

  await prisma.$disconnect();
};

main().then(() => {});
