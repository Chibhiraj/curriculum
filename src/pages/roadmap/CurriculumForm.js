import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import ChapterSection from './ChapterSection';

const CurriculumForm = () => {
  const [curriculum, setCurriculum] = useState([]);
  const [newChapterTitle, setNewChapterTitle] = useState('');

  // Load curriculum from localStorage on component mount
  useEffect(() => {
    const savedCurriculum = JSON.parse(localStorage.getItem('curriculum')) || [];
    setCurriculum(savedCurriculum);
  }, []);

  // Save curriculum to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('curriculum', JSON.stringify(curriculum));
  }, [curriculum]);

  const handleAddChapter = () => {
    if (newChapterTitle.trim() !== '') {
      setCurriculum([...curriculum, { title: newChapterTitle, sections: [] }]);
      setNewChapterTitle('');
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Curriculum Roadmap
      </Typography>
      <Box mb={2}>
        <TextField
          label="New Chapter Title"
          value={newChapterTitle}
          onChange={(e) => setNewChapterTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleAddChapter} style={{ marginTop: '10px' }}>
          Add Chapter
        </Button>
      </Box>
      {curriculum.map((chapter, index) => (
        <ChapterSection key={index} chapter={chapter} />
      ))}
    </Box>
  );
};

export default CurriculumForm;
