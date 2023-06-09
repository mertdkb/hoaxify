import React from 'react';
import { render, cleanup, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';

beforeEach(cleanup);

describe('UserSignupPage', () => {
    describe('Layout', () => {
        it('has header of signup', () => {
            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign up');
        });
        it('has input for display name', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        })
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        })
        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        })
        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const repeatPasswordInput = queryByPlaceholderText('Repeat your password');
            expect(repeatPasswordInput.type).toBe('password');
        })
        it('has submit button', () => {
            const { container } = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        })
    });
    describe('Interactions', () => {
        const changeEvent = (content) => {
            return {
                target: {
                    value: content
                }
            }
        }

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({})
                    }, 300)
                })
            })
        }

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeatInput;

        const setupForSubmit = (props) => {
            const rendered = render(<UserSignupPage {...props} />)

            const { container, queryByPlaceholderText } = rendered;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeatInput = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-username'));
            fireEvent.change(passwordInput, changeEvent('my-password'));
            fireEvent.change(passwordRepeatInput, changeEvent('my-password'));

            button = container.querySelector('button');

            return rendered;
        }

        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });
        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            fireEvent.change(usernameInput, changeEvent('my-username'));
            expect(usernameInput).toHaveValue('my-username');
        })
        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('password'));
            expect(passwordInput).toHaveValue('password');
        })
        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeatInput = queryByPlaceholderText('Repeat your password');
            fireEvent.change(passwordRepeatInput, changeEvent('password'));
            expect(passwordRepeatInput).toHaveValue('password');
        })
        it('calls postSignup when the fields are valid and the actions are provided in props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('does not throw exception when clicking the button when actions not provided in props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });
        it('calls postSignup with user body when the fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            }
            setupForSubmit({ actions });
            fireEvent.click(button);

            const expectedUserObject = {
                username: 'my-username',
                displayName: 'my-display-name',
                password: 'my-password',
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });
        it('does not allow user to click the Sign Up page when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            setupForSubmit({ actions });
            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('displays spinner when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...');
            expect(spinner).toBeInTheDocument();
        });
        it('hides spinner after api call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...');
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });
        it('hides spinner after api call finishes with', async () => {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            reject({
                                response: {data: {}}
                            })
                        }, 300)
                    });
                })
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...');
            await waitForElementToBeRemoved(spinner);

            expect(spinner).not.toBeInTheDocument();
        });
    });
});