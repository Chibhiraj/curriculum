// src/App.js

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import { Delete, ExpandMore, ExpandLess, Edit, Save } from '@mui/icons-material';

const CurriculumDesigner = () => {
  const [chapters, setChapters] = useState([]);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  const addChapter = () => {
    if (newChapterTitle.trim() !== '') {
      setChapters([...chapters, { title: newChapterTitle, sections: [], expanded: false, isEditing: false }]);
      setNewChapterTitle('');
    }
  };

  const deleteChapter = (index) => {
    const newChapters = [...chapters];
    newChapters.splice(index, 1);
    setChapters(newChapters);
  };

  const updateChapterTitle = (index, title) => {
    const newChapters = [...chapters];
    newChapters[index].title = title;
    setChapters(newChapters);
  };

  const toggleEditChapterTitle = (index) => {
    const newChapters = [...chapters];
    newChapters[index].isEditing = !newChapters[index].isEditing;
    setChapters(newChapters);
  };

  const addSection = (chapterIndex, sectionTitle) => {
    if (sectionTitle.trim() !== '') {
      const newChapters = [...chapters];
      newChapters[chapterIndex].sections.push({ title: sectionTitle, isEditing: false });
      setChapters(newChapters);
    }
  };

  const deleteSection = (chapterIndex, sectionIndex) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].sections.splice(sectionIndex, 1);
    setChapters(newChapters);
  };

  const updateSectionTitle = (chapterIndex, sectionIndex, title) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].sections[sectionIndex].title = title;
    setChapters(newChapters);
  };

  const toggleEditSectionTitle = (chapterIndex, sectionIndex) => {
    const newChapters = [...chapters];
    newChapters[chapterIndex].sections[sectionIndex].isEditing = !newChapters[chapterIndex].sections[sectionIndex].isEditing;
    setChapters(newChapters);
  };

  const toggleExpandChapter = (index) => {
    const newChapters = [...chapters];
    newChapters[index].expanded = !newChapters[index].expanded;
    setChapters(newChapters);
  };

  return (
    <div style={{ padding: '16px' }}>
      <TextField
        label="New Chapter Title"
        value={newChapterTitle}
        onChange={(e) => setNewChapterTitle(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button onClick={addChapter} variant="contained" color="primary" style={{ marginBottom: '16px' }}>
        Add Chapter
      </Button>
      <div style={{ marginTop: '16px' }}>
        {chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} style={{ marginBottom: '24px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                padding: '8px 16px',
                borderRadius: '4px',
              }}
            >
              {chapter.isEditing ? (
                <TextField
                  value={chapter.title}
                  onChange={(e) => updateChapterTitle(chapterIndex, e.target.value)}
                  variant="outlined"
                  fullWidth
                  margin="none"
                  style={{ marginRight: '8px' }}
                />
              ) : (
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  {chapterIndex + 1}. {chapter.title}
                </Typography>
              )}
              <IconButton onClick={() => toggleExpandChapter(chapterIndex)} size="small" color="primary">
                {chapter.expanded ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <IconButton onClick={() => toggleEditChapterTitle(chapterIndex)} size="small" color="primary">
                {chapter.isEditing ? <Save /> : <Edit />}
              </IconButton>
              <IconButton onClick={() => deleteChapter(chapterIndex)} size="small" color="error">
                <Delete />
              </IconButton>
            </Box>
            <Collapse in={chapter.expanded}>
              <SectionManager
                chapterIndex={chapterIndex}
                sections={chapter.sections}
                addSection={addSection}
                deleteSection={deleteSection}
                updateSectionTitle={updateSectionTitle}
                toggleEditSectionTitle={toggleEditSectionTitle}
              />
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionManager = ({ chapterIndex, sections, addSection, deleteSection, updateSectionTitle, toggleEditSectionTitle }) => {
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddSection = () => {
    addSection(chapterIndex, newSectionTitle);
    setNewSectionTitle('');
  };

  const isLastStep = activeStep === sections.length;

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <TextField
          label="New Section Title"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button onClick={handleAddSection} variant="contained" color="primary" style={{ marginTop: '8px' }}>
          Add Section
        </Button>
      </div>
      {sections.length > 0 && (
        <Stepper activeStep={activeStep} orientation="vertical">
          {sections.map((section, sectionIndex) => (
            <Step key={sectionIndex}>
              <StepLabel>
                {section.isEditing ? (
                  <TextField
                    value={section.title}
                    onChange={(e) => updateSectionTitle(chapterIndex, sectionIndex, e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="none"
                    style={{ marginRight: '8px' }}
                  />
                ) : (
                  section.title
                )}
                <IconButton
                  onClick={() => toggleEditSectionTitle(chapterIndex, sectionIndex)}
                  size="small"
                  color="primary"
                  style={{ marginLeft: '8px' }}
                >
                  {section.isEditing ? <Save /> : <Edit />}
                </IconButton>
                <IconButton
                  onClick={() => deleteSection(chapterIndex, sectionIndex)}
                  size="small"
                  color="error"
                  style={{ marginLeft: '8px' }}
                >
                  <Delete />
                </IconButton>
              </StepLabel>
              <StepContent>
                <Typography>{section.title}</Typography>
                <div style={{ marginTop: '8px' }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    variant="outlined"
                    style={{ marginRight: '8px' }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {isLastStep ? 'Finish' : 'Continue'}
                  </Button>
                </div>
              </StepContent>
            </Step>
          ))}
          {isLastStep && (
            <Step key="last">
              <StepLabel>Summary</StepLabel>
              <StepContent>
                <Typography>You've completed all sections.</Typography>
                <Button onClick={() => setActiveStep(0)} variant="contained" style={{ marginTop: '8px' }}>
                  Reset
                </Button>
              </StepContent>
            </Step>
          )}
        </Stepper>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Typography variant="h4" align="center" style={{ margin: '16px 0' }}>
        Curriculum Designer
      </Typography>
      <CurriculumDesigner />
    </div>
  );
};

export default App;
