import React from 'react';
import { Container, Typography } from '@mui/material';
import CurriculumForm from './CurriculumForm';

function App() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Curriculum Editor
      </Typography>
      <CurriculumForm />
    </Container>
  );
}

export default App;
