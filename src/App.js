import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Main1 from './pages/Performance/Main1';
import Main2 from './pages/roadmap/Main2';
import Main3 from './pages/Task/Main3';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
// import { Home as HomeIcon, Timeline as TimelineIcon, Assignment as AssignmentIcon } from '@mui/icons-material';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Drawer */}
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
          open={drawerOpen}
        >
          <Toolbar />
          <List>
            <ListItem  >
            <h1>Teacher Panel</h1>
            </ListItem>
            <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
              <ListItemIcon>
                {/* <HomeIcon /> */}
              </ListItemIcon>
              <ListItemText primary="Home" sx={{color:'teal'}} />
            </ListItem>
            <ListItem button component={Link} to="/performance" onClick={handleDrawerClose}>
              <ListItemIcon>
                {/* <HomeIcon /> */}
              </ListItemIcon>
              <ListItemText primary="Performance" sx={{color:'teal'}} />
            </ListItem>
            <ListItem button component={Link} to="/roadmap" onClick={handleDrawerClose}>
              <ListItemIcon>
                {/* <TimelineIcon /> */}
              </ListItemIcon>
              <ListItemText primary="Roadmap" sx={{color:'teal'}} />
            </ListItem>
            <ListItem button component={Link} to="/task" onClick={handleDrawerClose}>
              <ListItemIcon>
                {/* <AssignmentIcon /> */}
              </ListItemIcon>
              <ListItemText primary="Task" sx={{color:'teal'}} />
            </ListItem>
          </List>
        </Drawer>

        {/* Main content */}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          {/* AppBar (Header) */}
          {/* <AppBar position="static" color=''>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Teachers Panel
              </Typography>
              {/* Menu button to toggle drawer */}
              {/* <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}> */}
                {/* You can add a menu button/icon here to toggle the drawer */}
              {/* </Typography> */}
            {/* </Toolbar> */}
          {/* </AppBar> */} 

          {/* Content */}
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/performance" element={<Main1 />} />
              <Route path="/roadmap" element={<Main2 />} />
              <Route path="/task" element={<Main3 />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
