import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    Box,
    VStack,
    HStack,
    Text,
    Divider,
    UnorderedList,
    ListItem,
    Tag,
    TagLabel,
    TagLeftIcon, Input
} from '@chakra-ui/react';
import { InfoIcon, StarIcon, RepeatIcon, ArrowRightIcon, SettingsIcon } from '@chakra-ui/icons';
import data from "./mock_Data.json";
const DetailedExModal = ({ isOpen, onClose, programID, excersizeID }) => {
    const [setInputs, setSetInputs] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [exerciseData, setExerciseData] = useState(null);

    function getExerciseInfo(excersizeID) {
        console.log("Searching for exerciseID:", excersizeID); // Debug log

        for (const week of data.weeks) {
            for (const workout of week.workouts) {
                for (const workoutExercise of workout.workoutExercises) {
                    if (workoutExercise.id === excersizeID) {
                        return {
                            current_ex: workoutExercise,
                            weekNumber: week.weekNumber,
                            workoutNumber: workout.workoutNumber
                        };
                    }
                }
            }
        }
        return null;
    }

    // Fetch exercise information when modal opens
    useEffect(() => {
        if (isOpen && excersizeID) {
            const result = getExerciseInfo(excersizeID);

            if (result) {
                setExerciseData(result);
                // Initialize set inputs when modal opens
                setSetInputs(new Array(result.current_ex.sets).fill(''));
                setIsSubmitted(false);
                setIsAlertOpen(false);
            } else {
                console.error(`Exercise with ID ${excersizeID} not found`);
                onClose(); // Close the modal if exercise not found
            }
        }
    }, [isOpen, excersizeID, onClose]);

    // Handle input change for set inputs
    const handleSetInputChange = (index, value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        const newInputs = [...setInputs];
        newInputs[index] = numericValue;
        setSetInputs(newInputs);
    };

    // Check if all inputs are filled
    const areAllInputsFilled = () => {
        return setInputs.every(input => input.trim() !== '');
    };

    // Handle modal close
    const handleModalClose = () => {
        if (!isSubmitted && setInputs.some(input => input.trim() !== '')) {
            setIsAlertOpen(true);
        } else {
            onClose();
        }
    };

    // Handle progress submission
    const handleSubmitProgress = () => {
        if (areAllInputsFilled()) {
            console.log('Progress saved:', setInputs);
            setIsSubmitted(true);
            onClose();
        } else {
            console.warn('Please fill all set inputs');
        }
    };

    // Render nothing if modal is not open or exercise data not found
    if (!isOpen || !exerciseData) return null;

    const { current_ex, weekNumber, workoutNumber } = exerciseData;
    const exercise = current_ex.exercise;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
            <div className="relative w-full max-w-5xl max-h-full">
                {/* Modal Content */}
                <div className="relative bg-white rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b rounded-t">
                        <h3 className="text-2xl font-bold text-gray-900">Session{current_ex.exerciseNumber}: {exercise.name}</h3>
                        <div className="flex space-x-2">
                            <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                                <StarIcon className="w-4 h-4 mr-1" />
                                Week {weekNumber}
                            </span>
                            <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded">
                                <StarIcon className="w-4 h-4 mr-1" />
                                Workout {workoutNumber}
                            </span>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-6">
                        {/* Exercise Details Container */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Exercise Image */}
                            <div className="flex justify-center items-center border-2 border-gray-100 rounded-lg p-4">
                                <img
                                    src={exercise.gifUrl}
                                    alt={exercise.name}
                                    className="rounded-md h-64 w-64 object-cover"
                                />
                            </div>

                            {/* Instructions Section */}
                            <div className="space-y-4">
                                {/* Body Part and Target Muscle */}
                                <div className="flex space-x-4">
                                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-purple-800 bg-purple-100 rounded">
                                        <InfoIcon className="w-4 h-4 mr-1" />
                                        Body Part: {exercise.bodyPart}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-red-800 bg-red-100 rounded">
                                        <ArrowRightIcon className="w-4 h-4 mr-1" />
                                        Target Muscle: {exercise.targetMuscle}
                                    </span>
                                </div>

                                {/* Workout Details */}
                                <div className="flex space-x-4">
                                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-cyan-800 bg-cyan-100 rounded">
                                        <RepeatIcon className="w-4 h-4 mr-1" />
                                        Sets: {current_ex.sets}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-teal-800 bg-teal-100 rounded">
                                        <RepeatIcon className="w-4 h-4 mr-1" />
                                        Reps: {current_ex.repetitions}
                                    </span>
                                    <span className="inline-flex items-center px-2 py-1 text-sm font-medium text-pink-800 bg-pink-100 rounded">
                                        <SettingsIcon className="w-4 h-4 mr-1" />
                                        Equipment: {exercise.equipment}
                                    </span>
                                </div>

                                {/* Divider */}
                                <hr className="my-4 border-gray-200" />

                                {/* Instructions */}
                                <div>
                                    <h4 className="font-bold mb-2">Instructions:</h4>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        {exercise.instructions.map((instruction, index) => (
                                            <li key={index}>{instruction}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Secondary Muscles */}
                                {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                                    <div>
                                        <h4 className="font-bold mb-2">Secondary Muscles:</h4>
                                        <div className="flex space-x-2">
                                            {exercise.secondaryMuscles.map((muscle, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 text-sm font-medium text-orange-800 bg-orange-100 rounded"
                                                >
                                                    {muscle}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 space-y-4 border-t">
                        {/* Set Inputs */}
                        <div className="flex justify-between space-x-2 mb-4">
                            {setInputs.map((input, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder={`Set ${index + 1}`}
                                    value={input}
                                    onChange={(e) => handleSetInputChange(index, e.target.value)}
                                    className="w-16 px-2 py-1 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleModalClose}
                                className="w-1/2 py-2 text-blue-700 bg-blue-100 rounded hover:bg-blue-200"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmitProgress}
                                disabled={!areAllInputsFilled()}
                                className={`w-1/2 py-2 rounded ${areAllInputsFilled()
                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Submit Progress
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Dialog */}
            {isAlertOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="p-6 text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-500">
                                    Unsaved Progress
                                </h3>
                                <p className="mb-5 text-sm text-gray-500">
                                    You have unsaved set inputs. Are you sure you want to close the session? Your progress will be lost.
                                </p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => setIsAlertOpen(false)}
                                        className="px-4 py-2 text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                                    >
                                        Close Anyway
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailedExModal;