import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import { initBlogs, createBlog, removeBlogAction } from './reducers/blogReducer'
import { login, logout, initLogin } from './reducers/loginReducer'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'
import Users from './components/Users'
import userService from './services/users'
import User from './components/User'
import BlogView from './components/BlogView'
import css from './App.css'
import Container from '@material-ui/core/Container'
import { AppBar, Toolbar, Menu, Typography, Button, } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons/'

const App = () => {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.messages)
  const blogs = useSelector(state => state.blogs)
  const logins = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()
  const [users, setUsers] = useState([])

  //Set users for the user view
  const getUsers = async () => {
    const accs = await userService.getAll()
    setUsers(users.concat(accs))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initLogin(user))
    }
    getUsers()
    dispatch(initBlogs())
  }, [dispatch])

  //Error message ////////////////////////////////////////
  const errorStyle = {
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#c0392b'
  }

  const setError = (type) => {
    dispatch({ type: type })

    setTimeout(() => {
      dispatch({ type: 'CLEARMESSAGE' })
    }, 5000)
  }
  //Error message ////////////////////////////////////////

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError('WRONGLOGIN')
    }
  }

  const loginStyle = {
    textAlign: 'center',
    display: 'inline-block',
    padding: '5px'
  }


  const loginForm = () => (
    <form style={loginStyle} onSubmit={handleLogin}>
      <h3 style={errorStyle}>{messages}</h3>
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
    try {
      dispatch(removeBlogAction(id))
    } catch (error) {
      setError('REMOVEBLOG')
    }

  }

  const createBlogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleNewBlog} />
    </Togglable>
  )

  const handleNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logout())
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
    },
  }))


  const classes = useStyles()

  if (logins === null) {
    return (
      loginForm()
    )
  }

  const style = {
    padding: '5px',
    backgroundColor: '#A9DFBF'
  }


  const appBarStyle = {
    backgroundColor: "black",
    borderRadius: 5,
    padding: 5
  }

  const menuButtonStyle = {
    marginRight: 10,
    border: '3px solid white',
    padding: 8,
    boxShadow: "-2px 5px white",
    borderRadius: 5,
  }

  const linkStyle = {
    textDecoration: "none",
    color: "inherit"
  }

  return (
    <Container>
      <Router>
        <div className={classes.root}>
          <AppBar style={appBarStyle} position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                BlogApp
               </Typography>

              <AccountCircle style={{ marginRight: 5 }} />
              <Typography style={{ marginRight: 15 }} variant="subtitle1">
                <b>{logins.name}</b>
              </Typography>

              <Link style={linkStyle} to="/"><Button style={menuButtonStyle} color="inherit">BLOGS</Button></Link>
              <Link style={linkStyle} to="/users"><Button style={menuButtonStyle} color="inherit">USERS</Button></Link>
              <Button onClick={handleLogout} style={menuButtonStyle} color="inherit">LOGOUT</Button>
            </Toolbar>
          </AppBar>
        </div>

        <h3 style={errorStyle}>{messages}</h3>
        <Switch>
          <Route path='/users/:id'>
            <User users={users} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/blogs/:id">
            <BlogView blogs={blogs} dispatch={dispatch} />
          </Route>
          <Route path="/">
            <h2>blogs</h2>
            <div>

              <div style={{color: "black"}}>
                {createBlogForm()}
              </div>

              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={logins} removeBlog={() => removeBlog(blog.id)} />
              )}
            </div>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}


export default App