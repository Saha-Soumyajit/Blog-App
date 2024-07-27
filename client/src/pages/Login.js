import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';

function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch()

  // Form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);

    try {
      const {data} = await axios.post("/api/v1/users/login", {email:inputs.email, password: inputs.password});
      if (data.success) {
        // At login time store the user ID in Local Storage
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successful");
        navigate("/");
      }
    } catch (error) {
        alert("You are not Registered!! Please Register  ");
        navigate("/register");
        console.log(error);
    }
  }

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
        ...prevState, [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450} display={"flex"} flexDirection={"column"} alignItems={"center"} margin={"auto"} marginTop={5} boxShadow={"10px 10px 20px #ccc"} padding={3} borderRadius={5}>

            <Typography variant="h4" padding={3} textAlign={"center"} sx={{textTransform: "uppercase"}}>Login</Typography>

            <TextField type="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Email" margin="normal" required />

            <TextField type="password" name="password" value={inputs.password} onChange={handleChange} placeholder="Password" margin="normal" required />

            <Button type="submit" variant="contained" color="primary" sx={{borderRadius: 2, marginTop: 3, paddingLeft:10, paddingRight: 10}}>Submit</Button>

            <Button type="submit" color="primary" sx={{borderRadius: 2, marginTop: 3}} onClick={() => navigate("/register")}>Not a user? Please Register</Button>

        </Box>
      </form>
    </>
  );
}

export default Login;
