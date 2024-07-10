import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'
import '@testing-library/jest-dom'
import { expect, it } from '@jest/globals'

it('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
