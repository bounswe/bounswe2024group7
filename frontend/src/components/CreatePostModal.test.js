import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import configureStore from 'redux-mock-store';
import CreatePostModal from './CreatePostModal.component.jsx';
import { PhaseContextProvider } from '../context/PostContext';
import { UserContextProvider } from '../context/UserContext';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: jest.fn(),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => 'mockSessionToken'),
}));

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(() => jest.fn()),
}));

const mockStore = configureStore([]);
const queryClient = new QueryClient();
const mockToast = jest.fn();
useToast.mockReturnValue(mockToast);

describe('CreatePostModal Component', () => {
  const mockPrograms = [
    { id: '1', title: 'Program 1' },
    { id: '2', title: 'Program 2' },
  ];

  const mockTags = ['Tag1', 'Tag2', 'Tag3'];

  const mockPostContext = {
    programs: mockPrograms,
    isLoadingPrograms: false,
    tags: mockTags,
    isLoadingTags: false,
  };

  const mockUserContext = {
    user: { id: 'user1', name: 'Test User' },
  };

  let store;

  beforeEach(() => {
    store = mockStore({});
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider>
            <UserContextProvider value={mockUserContext}>
              <PhaseContextProvider value={mockPostContext}>
                <CreatePostModal isOpen={true} onClose={jest.fn()} {...props} />
              </PhaseContextProvider>
            </UserContextProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    );
  };

  it('renders the modal with all fields', () => {
    renderComponent();

    expect(screen.getByText('Create a new post')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();
    expect(screen.getByLabelText('Image URL')).toBeInTheDocument();
    expect(screen.getByText('Attach a training program')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();
  });

  it('allows users to fill out the form fields', () => {
    renderComponent();

    const contentInput = screen.getByLabelText('Content');
    const imageInput = screen.getByLabelText('Image URL');

    fireEvent.change(contentInput, { target: { value: 'Test content' } });
    fireEvent.change(imageInput, { target: { value: 'http://example.com/image.jpg' } });

    expect(contentInput.value).toBe('Test content');
    expect(imageInput.value).toBe('http://example.com/image.jpg');
  });

  it('displays the training programs in the dropdown', () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByText('Attach a training program'));
    expect(screen.getByText('Program 1')).toBeInTheDocument();
    expect(screen.getByText('Program 2')).toBeInTheDocument();
  });

  it('displays the tags in the dropdown', () => {
    renderComponent();

    fireEvent.mouseDown(screen.getByText('Tags'));
    expect(screen.getByText('Tag1')).toBeInTheDocument();
    expect(screen.getByText('Tag2')).toBeInTheDocument();
    expect(screen.getByText('Tag3')).toBeInTheDocument();
  });

  it('shows an error toast if no tags are selected', async () => {
    const mockMutate = jest.fn((options) => options.mutationFn());
    const { useMutation } = require('@tanstack/react-query');
    useMutation.mockReturnValue({ mutate: mockMutate });

    renderComponent();

    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test content' } });
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'http://example.com/image.jpg' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'No tags selected.',
          description: 'Please select at least one tag.',
          status: 'error',
        })
      );
    });
  });

  it('shows a success toast on successful post creation', async () => {
    const mockMutate = jest.fn((options) => options.onSuccess());
    const { useMutation } = require('@tanstack/react-query');
    useMutation.mockReturnValue({ mutate: mockMutate });

    renderComponent();

    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test content' } });
    fireEvent.change(screen.getByLabelText('Image URL'), { target: { value: 'http://example.com/image.jpg' } });
    fireEvent.mouseDown(screen.getByText('Tags'));
    fireEvent.click(screen.getByText('Tag1'));

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Post created.',
          description: 'Your post has been created successfully.',
          status: 'success',
        })
      );
    });
  });

  it('resets fields and closes the modal when cancel is clicked', () => {
    const mockOnClose = jest.fn();
    renderComponent({ onClose: mockOnClose });

    fireEvent.change(screen.getByLabelText('Content'), { target: { value: 'Test content' } });
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(screen.queryByDisplayValue('Test content')).not.toBeInTheDocument();
    expect(mockOnClose).toHaveBeenCalled();
  });
});