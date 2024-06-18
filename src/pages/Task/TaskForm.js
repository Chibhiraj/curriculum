import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Checkbox, FormControlLabel, Snackbar, Alert, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TaskForm = ({ addTask, students, closeForm, initialTask, isEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [status, setStatus] = useState('incomplete');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (isEdit && initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setDueDate(initialTask.dueDate || '');
      setSelectedStudents(initialTask.students || []);
      setStatus(initialTask.status || 'incomplete');
    }
  }, [isEdit, initialTask]);

  const handleStudentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStudents([...selectedStudents, value]);
    } else {
      setSelectedStudents(selectedStudents.filter(student => student !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, dueDate, students: selectedStudents, status });
    setTitle('');
    setDescription('');
    setDueDate('');
    setSelectedStudents([]);
    setStatus('incomplete');
    setOpenSnackbar(true);
    closeForm();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="complete">Complete</MenuItem>
              <MenuItem value="incomplete">Incomplete</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <label>Assign to Students: <div></div></label>
          {students.map((student, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  value={student}
                  checked={selectedStudents.includes(student)}
                  onChange={handleStudentChange}
                />
              }
              label={student}
            />
          ))}
        </div>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Update Task/Test' : 'Add Task/Test'}
          </Button>
        </Box>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Task/Test added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TaskForm;
