import React from 'react'
import {
  Link
} from 'react-router-dom'


const Blog = ({ blog, user }) => {
  const blogStyle = {
    padding: ".6rem 1rem",
    border: '3px solid #33332d',
    marginTop: 15,
    marginBottom: 15,
    boxShadow: "0px 5px #33332d",
    borderRadius: 6,
  }

  return (
    <div style={blogStyle} className="hiddenBlogContents">
      <div>
        <Link style={{ textDecoration: "none", color: "inherit"}} to={`/blogs/${blog.id}`}> <b>{blog.title} | {blog.author} </b></Link>
      </div>
    </div>
  )

}


export default Blog