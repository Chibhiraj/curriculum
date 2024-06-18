import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TaskList = ({ tasks, editTask, deleteTask }) => {
  return (
    <div style={{ padding: 10 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.students.join(', ')}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => editTask(index)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => deleteTask(index)} style={{ marginLeft: 8 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
