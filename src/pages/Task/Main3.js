import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Track currently editing task

  // List of students
  const students = [
    'Ram',
    'Raj',
    'Kumar',
    'Sam',
    'Adams'
  ];

  // Function to add a new task or update an existing task
  const addTask = (task) => {
    if (editingTask !== null) {
      // If editingTask is not null, update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editingTask.index] = task;
      setTasks(updatedTasks);
    } else {
      // Otherwise, add new task to tasks array
      setTasks([...tasks, task]);
    }
    setOpenSnackbar(true); // Show success message
    handleClose(); // Close the dialog
  };

  // Function to edit a task
  const editTask = (index) => {
    setEditingTask({ ...tasks[index], index }); // Set the task to edit and its index
    setOpen(true); // Open the dialog
  };


  // Function to handle opening the dialog for adding or editing a task
  const handleClickOpen = () => {
    setEditingTask(null); // Reset editing task
    setOpen(true); // Open the dialog
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the snackbar
  };

  return (
    <div>
      <h1>Task Assignment</h1>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          + Add Task/Test
        </Button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingTask ? 'Edit Task/Test' : 'Add Task/Test'}</DialogTitle>
        <DialogContent>
          <TaskForm
            addTask={addTask}
            students={students}
            closeForm={handleClose}
            initialTask={editingTask}
            isEdit={!!editingTask}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <TaskList tasks={tasks} editTask={editTask} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {editingTask ? 'Task/Test updated successfully!' : 'Task/Test added successfully!'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
