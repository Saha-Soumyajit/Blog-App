import React, {useState} from "react";
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';

function Header() {
  // Global State
  const isLogin = useSelector(state => state.isLogin);
  // console.log(isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State
  const [value, setValue] = useState();  

  // Logout handle
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successful");
      navigate("/login");
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display={'flex'} marginLeft={'auto'} marginRight={'auto'}>
              <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My-Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}

          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (<>
                <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/login">Login</Button>
                <Button sx={{ margin: 1, color: "white" }} LinkComponent={Link} to="/register">Register</Button>
            </>)}
            {isLogin && (
                <Button sx={{ margin: 1, color: "white" }} onClick={ handleLogout }>Logout</Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
