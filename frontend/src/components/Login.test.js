import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginCard from './loginCard.component.jsx'
import { Provider } from 'react-redux';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import configureStore from 'redux-mock-store';
import { userActions } from '../context/user';

// Mock dependencies
jest.mock('../instance/apiInstance.js', () => jest.fn(() => ({
  post: jest.fn(() =>
    Promise.resolve({
      status: 200,
      data: { sessionToken: 'mockToken' },
    })
  ),
})));

const mockNavigate = jest.fn();
jest.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(() => jest.fn()),
}));

const mockStore = configureStore([]);
const queryClient = new QueryClient();
const mockToast = jest.fn();
useToast.mockReturnValue(mockToast);

describe('LoginCard Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <LoginCard />
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  it('should render the component correctly', () => {
    renderComponent();

    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should handle username and password input', () => {
    renderComponent();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword123' } });

    expect(usernameInput.value).toBe('testUser');
    expect(passwordInput.value).toBe('testPassword123');
  });

  it('should call login API and dispatch actions on successful login', async () => {
    renderComponent();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(
        userActions.login({
          userName: 'testUser',
          password: 'testPassword123',
          sessionToken: 'mockToken',
        })
      );
    });
  });

  it('should show an error toast on failed login', async () => {
    const apiInstance = require('../instance/apiInstance.js');
    apiInstance.mockReturnValue({
      post: jest.fn(() =>
        Promise.reject({
          response: { status: 401, data: { message: 'Invalid credentials' } },
        })
      ),
    });

    renderComponent();

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'wrongUser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongPassword' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'There was an error while logging in. Please try again.',
          status: 'error',
          isClosable: true,
        })
      );
    });
  });
});