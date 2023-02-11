import { Request, Response } from 'express';
import { prisma } from '../database';

const inputToFilter = (input: undefined | string | string[]): any => {
  if (!input) {
    return undefined;
  }
  if (Array.isArray(input)) {
    return {
      contains: input[0],
      mode: 'insensitive',
    };
  }
  return {
    contains: input,
    mode: 'insensitive',
  };
};

const listStudents = async (req: Request, res: Response) => {
  const { id, firstName, lastName } = req.query;

  const students = await prisma.student.findMany({
    where: {
      id: inputToFilter(id as undefined | string | string[]),
      firstName: inputToFilter(firstName as undefined | string | string[]),
      lastName: inputToFilter(lastName as undefined | string | string[]),
    },
  });
  res.send({
    students,
  });
};

export default listStudents;
