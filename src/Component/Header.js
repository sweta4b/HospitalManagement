import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const getStyles = {
    textDecoration: "none",
    color: "white"
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Matrix Hospital
      </Typography>
      <Divider />
      <List>
        <NavLink
          to="/patient"
          style={{ textDecoration: "none", color: "black" }}
        >
          Patients
        </NavLink>
      </List>
      <List>
        <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
          Hospital
        </NavLink>
      </List>
      <List>
        <NavLink to="/ward" style={{ textDecoration: "none", color: "black" }}>
          Wards
        </NavLink>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Matrix Hospital
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "10px" }}>
            <NavLink to="/patient" style={getStyles}>
              Patients
            </NavLink>
            <NavLink to="/ward" style={getStyles}>
              Wards
            </NavLink>
            <NavLink to="/" style={getStyles}>
              Hospital
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
}
