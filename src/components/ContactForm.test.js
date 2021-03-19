import React from 'react';
import {
    fireEvent,
    getByText,
    render,
    screen,
    waitFor
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
    render( < ContactForm / > );
});

test('renders the contact form header', () => {
    render( < ContactForm / > )
    const header = screen.getByText(/contact form/i)
    expect(header).toBeTruthy();
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i)

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //First render the form. Then get the element. Then do the thing to the element then check the result! so grab the firstname field, simulate putting text in it and see what happens
    render( < ContactForm / > )
    const firstNameInput = screen.getByLabelText("First Name*");

    userEvent.type(firstNameInput, "Tony");
    const error = screen.getByTestId("error")
    expect(error).toBeInTheDocument();

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)
    const submit = screen.getByTestId("submit")
    userEvent.click(submit)
    const error = screen.getAllByTestId("error")
    expect(error).toHaveLength(3); // turns out that error is an array, using getAllBy returns an arrau when there is one or more matches. test this by changing 3 to 2 or any other number and it breaks.
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)
    const submit = screen.getByTestId("submit")
    const firstNameInput = screen.getByLabelText("First Name*");
    const lastNameInput = screen.getByLabelText("Last Name*");

    userEvent.type(firstNameInput, "George");
    userEvent.type(lastNameInput, "Jetson");

    userEvent.click(submit)

    const error = screen.getAllByTestId("error")
    expect(error).toHaveLength(1);//Test passes with length 1. Length 2 causes fail.

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});