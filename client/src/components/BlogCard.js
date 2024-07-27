import React from "react";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import SingleUserBlog from "../pages/SingleUserBlog.js"
import toast from 'react-hot-toast';

function BlogCard({ title, description, image, username, time, id, isUser }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  }

const handleDelete = async() => {
  try {
    const {data} = await axios.delete(`/api/v1/blogs/delete-blog/${id}`);
    // console.log("DATA",data);
      if (data?.success) {
        console.log("Bireswar");
        toast.success("Blog Deleted");
        navigate("/blogs");
      }
    } catch (error) {
        console.log("ERROR",error);
  }
}

  return (
    <Card sx={{width: "40%", margin: "auto", marginTop: "20px", padding: "2", boxShadow: "5px 5px 10px #ccc", ":hover": {boxShadow: "10px 10px 20px #ccc",},}}>
      {isUser && (
        <Box display={"flex"}>
          <IconButton sx={{marginLeft: "auto"}} onClick={handleEdit}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={title}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color={"text.secondary"}>
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
