import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import ProgressToday from '../components/ProgressToday.component';

// Mock the router
jest.mock('@tanstack/react-router', () => ({
    useNavigate: () => jest.fn(),
}));

// Create a mock context provider wrapper
const createContextWrapper = (mockContext) => {
    return ({ children }) => (
        <UserContext.Provider value={mockContext}>
            {children}
        </UserContext.Provider>
    );
};

describe('ProgressToday Component', () => {
    // Test calculation of progress with no programs
    test('renders with 0% progress when no programs', () => {
        const mockContext = {
            joinedPrograms: []
        };

        render(<ProgressToday />, {
            wrapper: createContextWrapper(mockContext)
        });

        // Check for 0% text
        expect(screen.getByText('0.00%')).toBeInTheDocument();
    });

    // Test progress calculation with mixed completed exercises
    test('calculates correct progress percentage', () => {
        const mockPrograms = [
            {
                exercises: [
                    { completed: true },
                    { completed: false },
                    { completed: true }
                ]
            },
            {
                exercises: [
                    { completed: true },
                    { completed: true }
                ]
            }
        ];

        const mockContext = {
            joinedPrograms: mockPrograms
        };

        render(<ProgressToday />, {
            wrapper: createContextWrapper(mockContext)
        });

        // 4 completed out of 5 total exercises = 80%
        expect(screen.getByText('80.00%')).toBeInTheDocument();
    });

    // Test progress animation
    test('animates progress from 0 to calculated percentage', () => {
        jest.useFakeTimers();

        const mockPrograms = [
            {
                exercises: [
                    { completed: true },
                    { completed: true }
                ]
            }
        ];

        const mockContext = {
            joinedPrograms: mockPrograms
        };

        render(<ProgressToday />, {
            wrapper: createContextWrapper(mockContext)
        });

        // Initial render should start at 0%
        expect(screen.getByText('0.00%')).toBeInTheDocument();

        // Fast forward timers to simulate progress animation
        act(() => {
            jest.advanceTimersByTime(400); // Enough time to make progress
        });

        // Progress should have increased but not yet reached full
        expect(screen.queryByText('100.00%')).not.toBeInTheDocument();

        // Fast forward to complete animation
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Should reach 100%
        expect(screen.getByText('100.00%')).toBeInTheDocument();

        jest.useRealTimers();
    });

    // Test "Nail It!" button appears when progress is not 100%
    test('displays "Nail It!" button when progress is not complete', () => {
        const mockPrograms = [
            {
                exercises: [
                    { completed: false },
                    { completed: false }
                ]
            }
        ];

        const mockContext = {
            joinedPrograms: mockPrograms
        };

        render(<ProgressToday />, {
            wrapper: createContextWrapper(mockContext)
        });

        // Check for "Nail It!" button
        const nailItButton = screen.getByText('Nail It !');
        expect(nailItButton).toBeInTheDocument();
    });
});