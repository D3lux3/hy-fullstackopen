import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorLabel, setErrorLabel] = useState('')

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorLabel('Wrong credentials')
      setTimeout(() => {
        setErrorLabel('')
      }, 5000)
    }
  }

  const errorStyle = {
    color: 'red'
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h3 style={errorStyle}>{errorLabel}</h3>
      <h1>log in to application</h1>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const removeBlog = (id) => {

    blogService
      .remove(id)
      .then(
        setBlogs(blogs.filter(blog => blog.id !== id))
      ).catch(error => {
        console.log(error)
      })
  }

  const handleLike = (blog) => {
    const changedBlog = {
      user: blog.user.id,
      likes: (blog.likes + 1),
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    blogService.
      update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
      })
      .catch(error => {
        console.error(error)
      })
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  const createBlog = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleNewBlog} />
    </Togglable>
  )

  const handleNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }


  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      {createBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} removeBlog={() => removeBlog(blog.id)} handleLike={() => handleLike(blog)} />
      )}
    </div>
  )
}


export default App