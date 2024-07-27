import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import toast from "react-hot-toast";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from 'react-hot-toast';

function BlogDetails() {

  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  // Get blog Details
  const getBlogDetails = async() => {
    try {
        const {data} = await axios.get(`/api/v1/blogs/get-blog/${id}`);
        if (data?.success) {
            setBlog(data?.blog);
            setInputs({
                title: data?.blog.title,
                description: data?.blog.description,
                image: data?.blog.image
            })
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getBlogDetails();
  }, [id]);
  console.log(blog);

  // Form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/blogs/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  // Input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box width={"50%"} border={3} borderRadius={10} padding={3} margin={"auto"} boxShadow={"10px 10px 20px #ccc"} display={"flex"} flexDirection={"column"} marginTop={"15px"} >

            <Typography variant='h2' textAlign={"center"} fontWeight={"bold"} padding={3} color={"gray"}>Update a Post</Typography>

            <InputLabel sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}>Title</InputLabel>

            <TextField margin='normal' variant='outlined' name='title' value={inputs.title} onChange={handleChange} required />

            <InputLabel sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}>Description</InputLabel>

            <TextField margin='normal' variant='outlined' name='description' value={inputs.description} onChange={handleChange} required />

            <InputLabel sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}>Image URL</InputLabel>

            <TextField margin='normal' variant='outlined' name='image' value={inputs.image} onChange={handleChange} required />

            <Button type="submit" variant="contained" color="warning" sx={{borderRadius: 2, marginTop: 3, paddingLeft:10, paddingRight: 10}}>Update</Button>
        </Box>
      </form>
    </>
  )
}

export default BlogDetails