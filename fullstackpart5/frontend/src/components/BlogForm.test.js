import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


// eslint-disable-next-line no-unused-expressions
test('<BlogForm /> creates new blog posts', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Testaaja' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'testing.com' }
  })
  fireEvent.submit(form)

  console.log(createBlog.mock.calls[0])

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual({
    'title': 'testing of forms could be easier',
    'author': 'Testaaja',
    'url': 'testing.com'
  })
})