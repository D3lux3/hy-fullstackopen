const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper');
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await api
        .post('/api/login')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZyb250ZW5kIiwiaWQiOiI1ZTRjNDg1ZjhjYmVjNzEzNGNkYzA5YmEiLCJpYXQiOjE1ODIwNTc1OTN9.7Ww2MryJODq273Nh-GkxxmL-vSacH1IOVNu-2EnIvQA')
})

test('right amount of blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog uses id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined();
})

test('Adding blogs actually works', async () => {
    const newBlog = {
        title: "Added",
        author: "New",
        url: "www.test.fi",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Added');
})

test('If undefined blog likes are zero', async () => {
    const newBlog = {
        title: "Should",
        author: "Be",
        url: "www.zero.fi",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const zeroLikes = blogsAtEnd.map(b => b.likes)

    expect(zeroLikes).toContain(0)
})

test('Adding blogs without titles or url', async () => {
    const newBlog = {
        author: "New"
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

})

describe('Trying to log in with incorrect details', () => {

    test('trying to create account with too short password', async () => {
        const newAccount = {
            "username": "testtest",
            "name": "Hello world",
            "password": "he"
        }
        await api
            .post('/api/users')
            .send(newAccount)
            .expect(400)

        expect(helper.accountsInDb).not.toContain(newAccount)
    })

    test('trying to create account with duplicate username', async () => {
        const newAccount = {
            "username": "frontend",
            "name": "Hello world",
            "password": "he"
        }
        await api
            .post('/api/users')
            .send(newAccount)
            .expect(400)

        expect(helper.accountsInDb).not.toContain(newAccount)
    })

    test('trying to create account with illegal username', async () => {
        const newAccount = {
            "username": "as",
            "name": "Hello world",
            "password": "he"
        }
        await api
            .post('/api/users')
            .send(newAccount)
            .expect(400)

        expect(helper.accountsInDb).not.toContain(newAccount)
    })


})

afterAll(() => {
    mongoose.connection.close();
})