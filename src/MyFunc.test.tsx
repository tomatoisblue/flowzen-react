/**
 * @jest-enviromnent jsdom
 */
import MyFunc from "./MyFunc"
import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'

test('`Hello Jest` should be printed', () => {
  render(<MyFunc />)
  screen.debug()
  expect(screen.getByText('Hello Jest')).toBeInTheDocument
})
