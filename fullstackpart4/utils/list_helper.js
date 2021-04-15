const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs
        .map(blog => blog.likes)
        .reduce((a, b) => a + b, 0);
}

const favoriteBlog = (blogs) => {
    return blogs
        .reduce((max, blog) => max.likes > blog.likes ? max : blog);
}

const mostBlogs = (blogs) => {
    return _.fromPairs(_.zip(['author', 'blogs',], (_(blogs).countBy('author'))
        .entries()
        .max()))
}

const mostLikes = (blogs) => {

}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}