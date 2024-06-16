import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Collapse,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const ChapterSection = ({ chapter, index: chapterIndex }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [chapterStartDate, setChapterStartDate] = useState(null); // State for chapter start date
  const [sectionStartDate, setSectionStartDate] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleAddSection = () => {
    if (sectionTitle.trim() !== '') {
      const newSections = [...chapter.sections, { title: sectionTitle, startDate: sectionStartDate }];
      chapter.sections = newSections; // Update chapter sections
      setSectionTitle('');
      setSectionStartDate(null); // Reset sectionStartDate after adding section
      setActiveStep(0); // Reset to the first step
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 0) {
      setExpanded(true); // Expand section after clicking Continue on first step
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box mt={2} border={1} p={2} borderColor="grey.300">
      <Box display="flex" alignItems="center" onClick={toggleExpand} style={{ cursor: 'pointer' }}>
        <IconButton size="small">

        </IconButton>
        <Typography variant="h6" gutterBottom>
          {chapter.title}
        </Typography>
      </Box>
      <Collapse in={expanded}>
        <Box mb={2} display="flex" flexDirection="column">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Chapter Start Date"
              value={chapterStartDate}
              onChange={(date) => setChapterStartDate(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
              style={{ marginBottom: '10px' }}
              inputFormat="dd/MM/yyyy"
            />
          </LocalizationProvider>
          <TextField
            label="New Section Title"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
            variant="outlined"
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Section Start Date"
              value={sectionStartDate}
              onChange={(date) => setSectionStartDate(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
              style={{ marginBottom: '10px' }}
              inputFormat="dd/MM/yyyy"
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSection}
            style={{ marginTop: '10px', alignSelf: 'flex-end' }}
          >
            Add Section
          </Button>
        </Box>
        <Stepper activeStep={activeStep} orientation="vertical" style={{ marginTop: '20px' }}>
          {chapter.sections.map((section, index) => (
            <Step key={index}>
              <StepLabel>{section.title}</StepLabel>
              <Box mt={2}>
                {index === activeStep && (
                  <Box>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} style={{ marginRight: '10px' }}>
                        Back
                      </Button>
                    )}
                    <Button onClick={handleNext} variant="contained" color="primary">
                      {activeStep === chapter.sections.length ? 'Finish' : 'Continue'}
                    </Button>
                  </Box>
                )}
              </Box>
            </Step>
          ))}
        </Stepper>
      </Collapse>
    </Box>
  );
};

export default ChapterSection;
