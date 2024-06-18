import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert } from '@mui/material';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const students = [
    'Kumar',
    'Raj',
    'Rahul',
    'Rohan',
    'Lemma',
    

  ];

  const addTask = (task) => {
    if (editingTask !== null) {
      const updatedTasks = tasks.map((t, index) => 
        index === editingTask.index ? task : t
      );
      setTasks(updatedTasks);
      setSnackbarMessage('Task/Test updated successfully!');
    } else {
      setTasks([...tasks, task]);
      setSnackbarMessage('Task/Test added successfully!');
    }
    setOpenSnackbar(true);
    handleClose();
  };

  const editTask = (index) => {
    const taskToEdit = tasks[index];
    setEditingTask({ ...taskToEdit, index });
    setOpen(true);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    setSnackbarMessage('Task/Test deleted successfully!');
    setOpenSnackbar(true);
  };

  const handleClickOpen = () => {
    setEditingTask(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
