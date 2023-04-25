import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App', async () => {
  afterEach(() => cleanup())

  it('renders correctly', async () => {
    // Arrange
    await render(<App />)
    const h1 = await screen.queryByText('Brioso')

    // Assert
    expect(h1).toBeInTheDocument()
  })

  it('shows the button count set to 0', async () => {
    // Arrange
    await render(<App />)
    const button = await screen.queryByText('count is 0')

    // Assert
    expect(button).toBeInTheDocument()
  })

  it('updates the button text after clicking it', async () => {
    // Arrange
    const user = userEvent.setup()
    await render(<App />)
    const button = await screen.queryByText('count is 0')

    // Act
    await user.click(button as HTMLElement)
    await user.click(button as HTMLElement)
    await user.click(button as HTMLElement)

    // Assert
    expect(button?.innerHTML).toStrictEqual('count is 3')
  })
})
