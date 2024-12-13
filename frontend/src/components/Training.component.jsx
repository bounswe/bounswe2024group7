import React from 'react';
import TrainingCard from './TrainingCard.component';
import WeekCard from './WeekCard.component';
import WorkoutCard from './WorkoutCard.component';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from '@tanstack/react-router';

// TrainingCard Component
const TrainingCardPage = () => {
    const navigate = useNavigate();

    return (
        <class className="w-full max-w-md mx-auto mt-10">
            <TrainingCard />
            <button
                onClick={() => navigate('/weeks')}
                className="w-full"
            >
                Start Training
            </button>
        </class>
    );
};

// WeekCard Component
const WeekCardPage = () => {
    const navigate = useNavigate();

    return (
        <class className="w-full max-w-md mx-auto mt-10">
            <WeekCard />
            <button
                onClick={() => navigate('/workout')}
                className="w-full"
            >
                Start Workout
            </button>
            <button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
            >
                Back to Training
            </button>
        </class>
    );
};

// WorkoutCard Component
const WorkoutCardPage = () => {
    const navigate = useNavigate();

    return (
        <class className="w-full max-w-md mx-auto mt-10">

            <WorkoutCard />
            <button
                onClick={() => navigate('/weeks')}
                variant="outline"
                className="w-full"
            >
                Back to Weeks
            </button>
        </class>
    );
};

// App Component with Router
const Training = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TrainingCardPage />} />
                <Route path="/weeks" element={<WeekCardPage />} />
                <Route path="/workout" element={<WorkoutCardPage />} />
            </Routes>
        </Router>
    );
};

export default Training;