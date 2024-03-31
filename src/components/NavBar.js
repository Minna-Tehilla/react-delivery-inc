import React, { useState, useEffect, useContext } from "react";

import { BrowserRouter as Router, Switch, Route, Link, useHistory, BrowserRouter, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { appContext } from "../App";

function NavBar() {
  // const [appData, setAppData] = useState({ customers: [], packages: [] });
  const [openDrawer, setOpenDrawer] = useState(false);
//   const { appData, setAppData } = useContext(appContext)
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
    // console.log(appData)
  };


  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mail Delivery Service
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>


      
      <Drawer anchor={"left"} open={openDrawer} onClose={handleDrawerToggle}>
        <List style={{ width: "300px" }}>
          <ListItem button onClick={() => navigate('/packages')}>
            <ListItemText primary={"Packages"} />
          </ListItem>

          <ListItem button onClick={() => navigate('/customers')}>
            <ListItemText primary={"Customers"} />
          </ListItem>

          <ListItem button onClick={() => navigate('/invoices')}>
            <ListItemText primary={"Invoices"} />
          </ListItem>


        </List>
      </Drawer>

    </div>
  );
}

export default NavBar;