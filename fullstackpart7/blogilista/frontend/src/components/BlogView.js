import React, { useState } from 'react';
import { useParams } from "react-router-dom"
import { likeBlog, addComment } from '../reducers/blogReducer'
import {
    Button, Avatar, Grid, Typography, List, ListItemText
    , ListItemAvatar
    , ListItem
} from '@material-ui/core'

import {
    AddCircle,
    ThumbUp,
    Face,
    OpenInBrowser
} from '@material-ui/icons'

const BlogView = ({ blogs, dispatch }) => {
    const id = useParams().id
    const blog = blogs.find(b => b.id === id)
    const [comment, setComment] = useState('')

    if (!blog) {
        return null
    }


    const clickHandler = (event) => {
        event.preventDefault()
        const changedBlog = {
            ...blog,
            user: blog.user.id,
            likes: (blog.likes + 1),
        }
        dispatch(likeBlog(changedBlog))
    }

    const addCommentClick = (e) => {
        e.preventDefault()
        dispatch(addComment(id, comment))
    }

    const headerStyle = {
        color: "inherit",
        padding: ".6rem 1rem",
        border: '3px solid #33332d',
        marginTop: 15,
        marginBottom: 15,
        boxShadow: "-3px 5px #33332d",
        backgroundColor: "#a259b1"
    }

    const commentStyle = {
        margin: "auto",
        width: "50%",
        color: "inherit",
        padding: ".6rem 1rem",
        border: '3px solid #33332d',
        marginTop: 15,
        marginBottom: 15,
        boxShadow: "-3px 5px #33332d",
        backgroundColor: "#ef4a61",
        fontSize: 20
    }


    const styyyl = {
        margin: "auto",
        width: "50%",
        color: "inherit",
        padding: ".6rem 1rem",
        border: '3px solid #33332d',
        marginTop: 15,
        marginBottom: 15,
        boxShadow: "-3px 5px #33332d",
        backgroundColor: "#59b1a6",
        fontSize: 20
    }

    const buttonStyle = {
        color: "inherit",
        padding: "5 5",
        border: '3px solid #33332d',
        margin: 10,
        boxShadow: "-3px 5px #33332d",
        backgroundColor: "#ffce6f"
    }

    const likeButtonStyle = {
        color: "#33332d",
        padding: "2 2",
        border: '2px solid #33332d',
        margin: 10,
        boxShadow: "-3px 5px #33332d",
        backgroundColor: "#4834d4",
        height: 30,
        width: 20
    }

    return (
        <div>
            <center><h2 style={headerStyle}>{blog.title}</h2></center>

            <div style={styyyl}>
                <Button href={`http://${blog.url}`} style={buttonStyle}>{blog.url} <OpenInBrowser style={{ marginLeft: "10" }} /></Button>
                <br />
                <b>{blog.likes}</b> likes <Button onClick={clickHandler} style={likeButtonStyle}><ThumbUp style={{ color: "white", height: 17, width: 17 }} /></Button>
                <br />
                added by <b>{blog.user.name}</b>
            </div>

            <div style={commentStyle}>
                <h3>comments</h3>
                <input style={{ height: 30, border: '3px solid #33332d', fontSize: 20 }} onChange={(e) => setComment(e.target.value)}></input>
                <Button onClick={addCommentClick} style={buttonStyle}>add comment <AddCircle style={{ color: "#33332d" }} /> </Button>
                <Grid container spacing={2}>
                    <Grid item xs={11} md={6}>
                        <div>
                            <List dense={true}>
                                {blog.comments.map(comment =>
                                    <ListItem key={comment.id}>
                                        <ListItemAvatar>
                                            <Avatar style={{ width: 30, height: 30, boxShadow: "-3px 5px #33332d", backgroundColor: "#ffce6f", border: '3px solid #33332d', }}>
                                                <Face style={{ color: "black" }} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            style={{ borderBottom: '2px solid #33332d'}}
                                            primary={comment.content}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )

}

export default BlogView