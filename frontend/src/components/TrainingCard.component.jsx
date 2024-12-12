import React from 'react';
import { StarIcon, AtSignIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import Detailed_Training_Modal from './Detailed_Training_Modal.components.jsx';
import { useDisclosure } from '@chakra-ui/react';
import data from "./mock_Data.json";

const TrainingCard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const renderRatingStars = (rating) => {
        return (
            <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill={i < rating ? 'currentColor' : 'none'}
                        />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
                </div>
                <span className="text-sm text-gray-500">
                    {data.ratingCount} ratings
                </span>
            </div>
        );
    };

    const renderLevelTag = (level) => {
        const colorSchemes = {
            "BEGINNER": "bg-green-50 text-green-600",
            "INTERMEDIATE": "bg-orange-50 text-orange-600",
            "ADVANCED": "bg-red-50 text-red-600"
        };
        return (
            <span className={`
                px-2 py-1 
                rounded-full 
                text-xs 
                font-semibold 
                inline-flex 
                items-center 
                ${colorSchemes[level.toUpperCase()] || 'bg-gray-100 text-gray-600'}
            `}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Level: {level}
            </span>
        );
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg text-sm">
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
                {data.title}
            </h1>

            {/* Line Under Title */}
            <hr className="mb-4 border-gray-300" />


            <div className=" flex-wrap items-center space-x-2 space-y-2 mb-3">
                {renderLevelTag(data.level)}

                <span className="
                    px-2 py-1 
                    bg-blue-50 
                    text-blue-600 
                    rounded-full 
                    text-xs 
                    font-semibold 
                    inline-flex 
                    items-center
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Type: {data.type}
                </span>

                <span className="
                    px-2 py-1 
                    bg-gray-50 
                    text-gray-600 
                    rounded-full 
                    text-xs 
                    font-semibold 
                    inline-flex 
                    items-center
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Created @ {data.createdAt.split('T')[0]}
                </span>

                <span className="
                    inline-flex 
                    items-center 
                    px-2 
                    py-1
                    bg-red-50 
                    text-red-600 
                    rounded-full 
                    text-xs 
                    font-semibold
                ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Trainer: {data.trainer}
                </span>


            </div>

            {/* Description */}
            <p className="
                text-center 
                text-xs 
                text-gray-600 
                mb-6 
                max-w-2xl 
                mx-auto 
                leading-relaxed
            ">
                {data.description}
            </p>

            {/* Rating */}
            <div className="flex justify-center mb-6">
                {renderRatingStars(data.rating)}
            </div>

            {/* Weeks Table and Commit Button - Unchanged */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                <table className="w-full">
                    <tbody>
                        {data.weeks.map((week, index) => (
                            <React.Fragment key={index}>
                                <tr className="transition-colors duration-200 hover:bg-blue-50 border-b border-gray-200">
                                    <td className="p-4">
                                        <h2 className="text-sm font-semibold text-gray-800">
                                            Week {week.weekNumber || index + 1}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {week.workouts ? week.workouts.length : 0} Workouts
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <button className="
                                            px-3 py-1.5 
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
                                            Start Workout
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
            <Detailed_Training_Modal isOpen={isOpen} onClose={onClose} data={data} />
        </div>
    );
};

export default TrainingCard;
