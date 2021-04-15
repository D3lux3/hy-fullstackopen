
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



test('renders title and author', () => {
  const user = {
    username: 'Pekka',
    name: 'Jaakko'
  }

  const blog = {
    title: 'This is a blog title',
    author: 'Dani Haapaniemi',
    url: 'www.google.fi',
    user: user
  }



  const component = render(<Blog blog={blog} user={user} />)
  expect(component.container).not.toHaveTextContent(
    'www.google.fi'
  )
  expect(component.container).toHaveTextContent(
    'This is a blog title Dani Haapaniemi'
  )
})

test('after clicking the button, children are displayed', () => {
  const user = {
    username: 'Pekka',
    name: 'Jaakko'
  }

  const blog = {
    title: 'This is a blog title',
    author: 'Dani Haapaniemi',
    url: 'www.google.fi',
    likes: 15,
    user: user,
  }


  const component = render(<Blog blog={blog} user={user} />)


  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.google.fi')
  expect(component.container).toHaveTextContent('15')
})

test('clicking the button twice calls event handler twice', async () => {
  const user = {
    username: 'Pekka',
    name: 'Jaakko'
  }

  const blog = {
    title: 'This is a blog title',
    author: 'Dani Haapaniemi',
    url: 'www.google.fi',
    likes: 15,
    user: user,
  }


  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} user={user} handleLike={mockHandler} />)
  const button2 = component.getByText('view')
  fireEvent.click(button2)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})