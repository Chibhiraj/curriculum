import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import Main1 from './pages/Performance/Main1';
import Main2 from './pages/roadmap/Main2';
import Main3 from './pages/Task/Main3';
import { Tab, Tabs, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  const [value, setValue] = useState(0); // State for active tab index

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div>
        {/* AppBar (Header) */}
        <AppBar position="static" color=''>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 3 }}>
              Teachers Panel
            </Typography>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Performance" component={Link} to="/" />
              <Tab label="Roadmap" component={Link} to="/roadmap" />
              <Tab label="Task" component={Link} to="/task" />
            </Tabs>
          </Toolbar>
        </AppBar>

        {/* Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Main1 />} />
            <Route path="/roadmap" element={<Main2 />} />
            <Route path="/task" element={<Main3 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
