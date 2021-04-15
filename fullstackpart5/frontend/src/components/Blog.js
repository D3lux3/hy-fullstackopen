import React, { useState } from 'react'

const Blog = ({ blog, handleLike, user, removeBlog }) => {

  const [show, setShow] = useState(false)

  let showRemove = false


  if (blog.user.username === user.username) {
    showRemove = true
  }


  const showWhenVisible = { display: showRemove ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibilityHandler = () => {
    setShow(!show)
  }
  const clickHandler = (event) => {
    event.preventDefault()
    handleLike()
  }

  if (show) {
    return (
      <div style={blogStyle} className="visibleBlogContents">
        <div className="blog">
          {blog.title} {blog.author} <button onClick={visibilityHandler}>hide</button>
          <br />
          {blog.url} <br />
          likes {blog.likes} <button id="likeButton" onClick={clickHandler}>like</button><br />
          {blog.user.name} <br />
          <button id="removeBlogButton" style={showWhenVisible} onClick={removeBlog}>remove</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="hiddenBlogContents">
      <div>
        {blog.title} {blog.author} <button id="viewBlogButton" onClick={visibilityHandler}>view</button>
      </div>
    </div>
  )

}




export default Blog