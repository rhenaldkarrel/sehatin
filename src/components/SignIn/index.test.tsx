import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SignIn from '../SignIn';
import { BrowserRouter as Router } from 'react-router-dom';

describe("Sign In Form", () => {
  const onSubmit = jest.fn();
  const onChange = jest.fn();
  const emailValue = ""
  const passwordValue = ""

  const view = () => render(
    <Router>
      <SignIn
        onSubmit={onSubmit}
        onChange={onChange}
        emailValue={emailValue}
        passwordValue={passwordValue}
      />
    </Router>
  );

  afterEach(cleanup);

  it("should render the form", () => {
    view();
    const emailInput = screen.getByPlaceholderText(/Email/i);

    expect(emailInput).toBeInTheDocument();
  })

  it("email input can be typed", () => {
    view();
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const email = "renaldkarel@gmail.com"

    userEvent.type(emailInput, email);
    waitFor(() =>
      expect(emailInput).toHaveValue(email));
  })
});