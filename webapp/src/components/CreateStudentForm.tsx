import React, {useState} from "react";
import {Alert, Box, Button, TextField} from "@mui/material";

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
      setId('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setMailingAddress('');
      setGPA('');
    }
    setIsLoading(false);
  }

  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
    <TextField variant="filled" type="text" value={id} onChange={(e) => setId(e.target.value)} label={"ID"} />
    <TextField variant="filled" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} label={"First name"} />
    <TextField variant="filled" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} label={"Last name"} />
    <TextField variant="filled" type="text" value={email} onChange={(e) => setEmail(e.target.value)} label={"Email"} />
    <TextField variant="filled" type="text" value={mailingAddress} onChange={(e) => setMailingAddress(e.target.value)} label={"Mailing address"} />
    <TextField variant="filled" type="number" value={GPA} onChange={(e) => setGPA(e.target.value)} label={"GPA"} />
    {errors.map((error) => (<Alert severity={"error"} key={error}>{error}</Alert>))}
    <Button variant="contained" type={"button"} onClick={createStudent} disabled={isLoading}>Create</Button>
  </Box>
}

export default CreateStudentForm;
