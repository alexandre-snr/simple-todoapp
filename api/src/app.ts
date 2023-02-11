import express from 'express';
import cors from 'cors';
import { prisma } from './database';
import routes from './routes';

const main = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.static('public'));
  app.get('/students', routes.listStudents);
  app.post('/student', routes.createStudent);

  app.listen(80, () => {
    console.log('listening on port 80');
  });

  await prisma.$disconnect();
};

main().then(() => {});
