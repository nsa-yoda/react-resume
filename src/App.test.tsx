import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'
import { afterEach, expect, it, vi } from 'vitest'

vi.mock('normalize-url', () => ({
  default: (url: string) => url,
}))

afterEach(() => {
  window.history.pushState({}, '', '/')
})

it('renders the default classic theme', () => {
  const { container } = render(<App />)

  expect(container.querySelector('.resume-theme-classic')).not.toBeNull()
  expect(screen.getByText('Skills')).not.toBeNull()
  expect(screen.getByText('Experience')).not.toBeNull()
})

it('supports theme and section overrides through query params', () => {
  window.history.pushState({}, '', '/?theme=stacked&sections=summary,skills')

  const { container } = render(<App />)

  expect(container.querySelector('.resume-theme-stacked')).not.toBeNull()
  expect(
    screen.getByText(
      /I am a seasoned software engineer with 15 years of experience/i
    )
  ).not.toBeNull()
  expect(screen.getByText('Skills')).not.toBeNull()
  expect(screen.queryByText('Experience')).toBeNull()
})

it('supports theme routes and audience-based contact hiding', () => {
  window.history.pushState({}, '', '/theme/stacked?audience=public')

  const { container } = render(<App />)

  expect(container.querySelector('.resume-theme-stacked')).not.toBeNull()
  expect(screen.queryByText('+1 123-456-7890')).toBeNull()
})

it('renders the in-app editor route', () => {
  window.history.pushState({}, '', '/editor')

  render(<App />)

  expect(screen.getByText('Resume Editor')).not.toBeNull()
  expect(screen.getByText('No validation errors.')).not.toBeNull()
})
