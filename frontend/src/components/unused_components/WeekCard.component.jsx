import React from 'react';
import { StarIcon, AtSignIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import Detailed_Week_Modal from './Detailed_Week_Modal.component';
import { useDisclosure } from '@chakra-ui/react';
import data from "./mock_Data.json";
import { useNavigate } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';
// assumed week number 1
const WeekCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getWeekByNumber = (weekNumber) => {
        return data.weeks.find(week => week.weekNumber === weekNumber);
    };

    const current_week = getWeekByNumber(1);
    const router = useRouter();
    const navigate = useNavigate()
    const handleStartPracticing = (data) => {
        navigate(
            {
                to: `/training/week/workout`,
            }
        )
    }
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
                {data.title} | Week1
            </h1>

            {/* Line Under Title */}
            <hr className="mb-4 border-gray-300" />

            {/* Weeks Table and Commit Button - Unchanged */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                    <tbody>
                        {current_week.workouts.map((workout, index) => (
                            <React.Fragment key={index}>
                                <tr className="transition-colors duration-200 hover:bg-blue-50 border-b border-gray-200">
                                    <td className="p-4">
                                        <h2 className="text-sm font-semibold text-gray-800">
                                            {workout.name}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {workout.workoutExercises ? workout.workoutExercises.length : 0} Exercises
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={handleStartPracticing} className="
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
            <button onClick={onOpen} className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Show Detailed Description
            </button>
            <Detailed_Week_Modal isOpen={isOpen} onClose={onClose} data={data} weekNumber={1} />
        </div>
    );
};

export default WeekCard;
