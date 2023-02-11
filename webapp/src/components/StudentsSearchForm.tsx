import {Box, Button, Paper, TextField} from "@mui/material";
import React, {useState} from "react";
import {StudentSearch} from "../types/Student";

interface StudentsSearchFormProps {
  updateSearch: (search: StudentSearch) => void;
}

const StudentsSearchForm: React.FC<StudentsSearchFormProps> = ({ updateSearch }: StudentsSearchFormProps) => {
  const [id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSearch = () => {
    updateSearch({
      id,
      firstName,
      lastName,
    })
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }

  return <Box sx={{
    display: 'flex',
    gap: 1,
    marginBottom: 2,
  }}>
    <TextField size={'small'} variant="filled" type="text" value={id} onChange={(e) => setId(e.target.value)} onKeyDown={onKeyDown} label={"ID"}/>
    <TextField size={'small'} variant="filled" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} onKeyDown={onKeyDown} label={"First Name"}/>
    <TextField size={'small'} variant="filled" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} onKeyDown={onKeyDown} label={"Last Name"}/>
    <Button onClick={onSearch}>Search</Button>
  </Box>
};

export default StudentsSearchForm;
