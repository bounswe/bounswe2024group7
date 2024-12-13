import React from 'react';
import { StarIcon, AtSignIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import Detailed_Ex_Modal from './Detailed_Ex_Modal.components.jsx';
import { useDisclosure } from '@chakra-ui/react';
import data from "./mock_Data.json";


const WorkoutCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getWorkoutByNumber = (weekNumber, workoutNumber) => {
        return (data.weeks.find(week => week.weekNumber === weekNumber)).workouts.find(workout => workout.workoutNumber === workoutNumber);
    };
    // assumed week number 1 workout1
    const weekNumber = 1;
    const workoutNumber = 1;
    const current_workout = getWorkoutByNumber(weekNumber, workoutNumber);
    return (
        <div className="w-full max-w-[40%] mx-auto p-4 bg-white shadow-lg rounded-lg text-sm">
            {/* Title */}
            <h1 className="
                text-2xl 
                font-extrabold 
                text-center 
                mb-6 
                text-gray-800 
                tracking-tight
                text-[#805AD5]
            ">
                {data.title} | Week{weekNumber} | Workout{workoutNumber}
            </h1>

            {/* Line Under Title */}
            <hr className="mb-4 border-gray-300" />

            {/* Weeks Table and Commit Button - Unchanged */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                    <tbody>
                        {current_workout.workoutExercises.map((ex, index) => (
                            <React.Fragment key={index}>
                                <tr className="transition-colors duration-200 hover:bg-blue-50 border-b border-gray-200">
                                    <td className="p-4">
                                        <h2 className="text-sm font-semibold text-gray-800">
                                            Session {ex.exerciseNumber}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {ex.exercise.name}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs text-gray-500">
                                            {ex.sets} Sets
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-xs text-gray-500">
                                            {ex.repetitions} Repetitions
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={onOpen}
                                            className="
                                            px-4 py-2.5 
                                            bg-gradient-to-r from-blue-500 to-blue-600 
                                            text-white 
                                            rounded-full 
                                            shadow-md 
                                            hover:shadow-lg 
                                            transform hover:-translate-y-0.5 
                                            transition-all 
                                            duration-300 
                                            focus:outline-none 
                                            focus:ring-2 
                                            focus:ring-blue-400 
                                            focus:ring-opacity-50
                                            text-xs
                                        ">
                                            Start
                                        </button>
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="
                                            w-12 
                                            h-12 
                                            rounded-full 
                                            bg-green-100 
                                            flex 
                                            items-center 
                                            justify-center 
                                            mx-auto 
                                            shadow-inner
                                        ">
                                            <span className="
                                                text-green-600 
                                                font-bold 
                                                text-sm
                                            ">
                                                0%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Commit to Program Button */}
            <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors text-sm mb-4">
                Commit to Program
            </button>

            {/* Show Detailed Description Button */}
            <button className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Show Detailed Description
            </button>
            <Detailed_Ex_Modal isOpen={isOpen} onClose={onClose} data={data} weekID={16} workoutID={26} excersizeID={52} />
        </div>
    );
};

export default WorkoutCard;
