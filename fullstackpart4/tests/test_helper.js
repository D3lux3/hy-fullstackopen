const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Hello world",
        author: "Dani Haapaniemi",
        url: "www.google.fi",
        likes: "5"
    },
    {
        title: "Fullstack",
        author: "Pekka",
        url: "www.pekka.fi",
        likes: "7"
    }
]

const initialAccounts = [
    {
        username: "frontend",
        name: "Hello world",
        password: "123456"
    },
    {
        username: "backend",
        name: "FullStack",
        password: "salaisuus"
    }
]

const accountsInDb = async () => {
    const accounts = await User.find({})
    return accounts.map(user => user.toJSON())
}

const nonExistingid = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingid, blogsInDb, initialAccounts,
    accountsInDb
}