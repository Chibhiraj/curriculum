// src/Dashboard.js
import Chart from "chart.js/auto";
import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import "./Dashboard.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

// import NotificationsIcon from '@mui/icons-material/Notifications';
// import DeleteIcon from '@mui/icons-material/Delete';

import data from "./data.json"; // Import the data from the JSON file

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("class-performance");
  const [notifications, setNotifications] = useState([
    "Student A missed Assignment 3",
    "New assignment graded for Student B",
  ]);

  const { classPerformanceData, studentPerformanceData } = data;

  const handleNavbarClick = (section) => {
    setActiveSection(section);
  };

  const handleDeleteNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard">
      <AppBar position="static" color="">
        <Toolbar>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                color="inherit"
                onClick={() => handleNavbarClick("class-performance")}
              >
               Overall Class Performance
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                onClick={() => handleNavbarClick("student-analytics")}
              >
                Individual Student Analytics
              </Button>
            </Grid>
            <Grid item>
              <Badge badgeContent={notifications.length} color="secondary">
                <Button
                  color="inherit"
                  onClick={() => handleNavbarClick("notifications")}
                >
                  Notifications
                </Button>
              </Badge>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center" style={{ padding: 16 }}>
        <Grid item xs={12}>
          {activeSection === "class-performance" && (
            <Box mt={3} s>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h4" gutterBottom>
                    Class Performance
                  </Typography>
                  {/* <Line data={classPerformanceData} />
                   */}
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    // margin={{ top: 30, bottom: 90, left: 40,  }}
                    height={450}
                    width={1000}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    // height={300}
                  />
                </Box>
              </Paper>
            </Box>
          )}

          {activeSection === "student-analytics" && (
            <Box mt={3}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h4" gutterBottom>
                    Individual Student Analytics
                  </Typography>
                  {/* <Bar data={studentPerformanceData} /> */}
                  <BarChart
                    series={[
                      { data: [35, 44, 24, 34] },
                      { data: [51, 6, 49, 30] },
                      { data: [15, 25, 30, 50] },
                      { data: [60, 50, 15, 25] },
                    ]}
                    height={450}
                    xAxis={[
                      {
                        data: ["Test 1", "Test 2", "Test 3", "Test 4"],
                        scaleType: "band",
                      },
                    ]}
                    margin={{ top: 30, bottom: 90, left: 40, right: 10 }}
                  />
                </Box>
              </Paper>
            </Box>
          )}

          {activeSection === "notifications" && (
            <Box mt={3}>
              <Paper elevation={3}>
                <Box p={2}>
                  <Typography variant="h4" gutterBottom>
                    Notifications
                  </Typography>
                  <List>
                    {notifications.map((notification, index) => (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          {/* <NotificationsIcon /> */}
                        </ListItemIcon>
                        <ListItemText primary={notification} />
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteNotification(index)}
                        >
                          {/* <DeleteIcon /> */}
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Paper>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
