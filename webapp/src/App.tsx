import React, {useEffect, useState} from 'react'
import {Student, StudentSearch} from "./types/Student";
import CreateStudentForm from "./components/CreateStudentForm";
import {Accordion, AccordionDetails, AccordionSummary, AppBar, Toolbar, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import StudentsTable from "./components/StudentsTable";
import StudentsSearchForm from "./components/StudentsSearchForm";

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStudents = async (search?: StudentSearch) => {
    setIsLoading(true);

    const query: Record<string, string> = {};
    if (search) {
      if (search.id.length > 0) {
        query.id = search.id;
      }
      if (search.firstName.length > 0) {
        query.firstName = search.firstName;
      }
      if (search.lastName.length > 0) {
        query.lastName = search.lastName;
      }
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
  }, []);

  return (
    <div>
      <AppBar sx={{marginBottom: 1}} position="static">
        <Toolbar>
          <PeopleIcon sx={{marginRight: 2}} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Students database
          </Typography>
        </Toolbar>
      </AppBar>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <PersonAddIcon sx={{marginRight: 2}} />
          <Typography>Create a student</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CreateStudentForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <PersonSearchIcon sx={{marginRight: 2}} />
          <Typography>Search for students</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StudentsSearchForm updateSearch={getStudents} />
          <StudentsTable students={students} />
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default App
