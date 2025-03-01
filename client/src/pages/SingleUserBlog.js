import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

function SingleUserBlog() {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blogs/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log("blogs", blogs);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard id= {blog._id} isUser= {true} title= {blog.title} description= {blog.description} image= {blog.image} username= {blog.user.username} time= {blog.createdAt} />
        ))
      ) : (
        <h1>You haven't created a blog.</h1>
      )}
    </div>
  );
};

// export { getUserBlogs };
export default SingleUserBlog;
