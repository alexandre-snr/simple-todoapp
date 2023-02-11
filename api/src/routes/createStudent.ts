import { Request, Response } from 'express';
import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { prisma } from '../database';

interface CreateStudentInput {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mailingAddress: string;
  GPA: number;
}

const schema: JSONSchemaType<CreateStudentInput> = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
    firstName: {
      type: 'string',
      minLength: 1,
    },
    lastName: {
      type: 'string',
      minLength: 1,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    mailingAddress: {
      type: 'string',
      minLength: 1,
    },
    GPA: {
      type: 'number',
      minimum: 0,
      maximum: 4,
    },
  },
  required: ['id', 'firstName', 'lastName', 'email', 'mailingAddress', 'GPA'],
};

const createStudent = async (req: Request, res: Response) => {
  const ajv = new Ajv({
    allErrors: true,
  });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const { body } = req;
  const valid = validate(req.body);
  if (!valid) {
    res.status(400).send({
      errors: validate.errors?.map((err) => `${err.instancePath.slice(1)} ${err.message}`),
    });
    return;
  }

  try {
    if (await prisma.student.findUnique({
      where: {
        id: body.id,
      },
    })) {
      res.status(400).send({
        errors: [
          'id already used',
        ],
      });
      return;
    }

    if (await prisma.student.findUnique({
      where: {
        email: body.email,
      },
    })) {
      res.status(400).send({
        errors: [
          'email already used',
        ],
      });
      return;
    }

    const student = await prisma.student.create({
      data: body,
    });
    res.send({
      student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      errors: [
        'internal server error',
      ],
    });
  }
};

export default createStudent;
