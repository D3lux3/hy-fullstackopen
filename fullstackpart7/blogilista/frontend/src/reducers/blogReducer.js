import blogService from '../services/blogs.js'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return state.concat(action.data)
        case 'LIKE_BLOG':
            const blog = action.data
            return state.map(b => b.id !== blog.id ? b : blog).sort((a, b) => b.likes - a.likes)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        case 'COMMENT_BLOG':
            const commentedBlog = action.data
            return state.map(b => b.id !== commentedBlog.id ? b : commentedBlog)
        default:
            return state
    }
}

export const likeBlog = blog => {
    return async dispatch => {
        const returnedBlog = await blogService.update(blog.id, blog)
        dispatch({
            type: 'LIKE_BLOG',
            data: returnedBlog
        })
    }
}

export const removeBlogAction = id => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const createBlog = blogObject => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'CREATE_BLOG',
            data: newBlog,
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        const commentedBlog = await blogService.addComment(id, comment)
        console.log(commentedBlog)
        dispatch({
            type: 'COMMENT_BLOG',
            data: commentedBlog,
        })
    }
}

export default blogReducer