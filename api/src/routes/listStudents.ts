import { Request, Response } from 'express';
import { prisma } from '../database';

const listStudents = async (req: Request, res: Response) => {
  const { id, firstName, lastName } = req.query;

  const students = await prisma.student.findMany({
    where: {
      id: id as string,
      firstName: firstName as string,
      lastName: lastName as string,
    },
  });
  res.send({
    students,
  });
};

export default listStudents;
