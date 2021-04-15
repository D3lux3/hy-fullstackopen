import React, { useState } from 'react'
import { Typography, Button, } from '@material-ui/core/'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const buttonStyle = {
    color: "inherit",
    padding: ".6rem 1rem",
    border: '3px solid #33332d',
    marginTop: 15,
    marginBottom: 15,
    boxShadow: "-3px 5px #33332d",
  }

  return (
    <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
        title:
        <input
          id='title'
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({ target }) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id='author'
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({ target }) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id='url'
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({ target }) => setBlogUrl(target.value)}
        />
      </div>
      <Button id="createBlogButton" style={buttonStyle} type="submit">create</Button>
    </form>
  )
}

export default BlogForm