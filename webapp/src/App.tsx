import React, {useEffect, useState} from 'react'

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mailingAddress: string;
  GPA: number;
}

interface StudentCardProps {
  student: Student
}

const StudentCard: React.FC<StudentCardProps> = ({ student }: StudentCardProps) => {
  return (<div style={{
    backgroundColor: 'black',
    color: 'white',
    margin: 10
  }}>
    <span>{student.id} - {student.firstName} {student.lastName}</span>
    <span>{student.email}</span>
    <span>{student.mailingAddress}</span>
    <span>{student.GPA}</span>
  </div>)
}

const CreateStudentForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [id, setId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mailingAddress, setMailingAddress] = useState<string>('');
  const [GPA, setGPA] = useState<string>('');

  const createStudent = async () => {
    setIsLoading(true);
    const result = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        firstName,
        lastName,
        email,
        mailingAddress,
        GPA: parseFloat(GPA),
      })
    });
    const body = await result.json();

    if (body.errors) {
      setErrors(body.errors);
    } else {
      setErrors([]);
    }
    setIsLoading(false);
  }

  return <div>
    <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder={"ID"} />
    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={"First name"} />
    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={"Last name"} />
    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={"Email"} />
    <input type="text" value={mailingAddress} onChange={(e) => setMailingAddress(e.target.value)} placeholder={"Mailing address"} />
    <input type="number" value={GPA} onChange={(e) => setGPA(e.target.value)} placeholder={"GPA"} />
    {errors.map((error) => (<span key={error}>{error}</span>))}
    <button type={"button"} onClick={createStudent} disabled={isLoading}>Create</button>
  </div>
}

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const getStudents = async () => {
    setIsLoading(true);

    const query: Record<string, string> = {};
    if (id.length > 0) {
      query.id = id;
    }
    if (firstName.length > 0) {
      query.firstName = firstName;
    }
    if (lastName.length > 0) {
      query.lastName = lastName;
    }

    const queryString = Object.keys(query).map((key) => {
      return `${key}=${query[key]}`
    }).join('&');

    const result = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/students?${queryString}`);
    const body = await result.json();

    setStudents(body.students);
    setIsLoading(false);
  }

  useEffect(() => {
    getStudents();
  }, [])

  return (
    <div className="App">
      <h1>Students database</h1>
      <CreateStudentForm />
      <div>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder={"ID"} />
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={"First name"} />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={"Last name"} />
        <button type={"button"} onClick={getStudents} disabled={isLoading}>Search</button>
      </div>
      <div>
        {isLoading && (<p>Loading ...</p>)}
        {!isLoading && students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  )
}

export default App
