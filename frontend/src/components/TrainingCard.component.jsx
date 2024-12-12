import React from 'react';
import { StarIcon } from '@chakra-ui/icons';

const TrainingCard = () => {
    const program = {
        title: "Full Body Strength",
        description: "A comprehensive workout plan to build strength and muscle.",
        rating: 4,
        type: "Strength Training",
        level: "Intermediate",
        weeks: [
            { week: "Week 1", workouts: ["Squats", "Deadlifts", "Push-ups"], progress: 40 },
            { week: "Week 2", workouts: ["Pull-ups", "Lunges", "Dips", "Bench Press"], progress: 30 },
            { week: "Week 3", workouts: ["Squats", "Deadlifts", "Pull-ups"], progress: 50 },
            { week: "Week 4", workouts: ["Leg Press", "Chest Fly", "Push-ups", "Planks"], progress: 20 },
            { week: "Week 5", workouts: ["Squats", "Lunges", "Pull-ups", "Dips"], progress: 10 }
        ],
        trainer: "John Doe"
    };

    const renderRatingStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={i < rating ? 'currentColor' : 'none'}
            />
        ));
    };

    const renderLevelTag = (level) => {
        const colorSchemes = {
            "Beginner": "bg-green-100 text-green-800",
            "Intermediate": "bg-orange-100 text-orange-800",
            "Advanced": "bg-red-100 text-red-800"
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${colorSchemes[level] || 'bg-gray-100 text-gray-800'}`}>
                Level: {level}
            </span>
        );
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-4">{program.title}</h1>

            {/* Tags */}
            <div className="flex justify-center space-x-2 mb-4">
                {renderLevelTag(program.level)}
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    Type: {program.type}
                </span>
                <div className="flex items-center px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                    <img
                        src="/api/placeholder/24/24"
                        alt={program.trainer}
                        className="w-6 h-6 rounded-full mr-2"
                    />
                    {program.trainer}
                </div>
            </div>

            {/* Description */}
            <p className="text-center text-sm text-gray-600 mb-4">{program.description}</p>

            {/* Rating */}
            <div className="flex justify-center mb-4">
                {renderRatingStars(program.rating)}
            </div>

            {/* Weeks and Workouts Table */}
            <table className="w-full mb-4 border-collapse">
                <tbody>
                    {program.weeks.map((week, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-2">{week.week}</td>
                            <td className="border p-2">{week.workouts.join(", ")}</td>
                            <td className="border p-2 text-right">
                                <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                                    Start
                                </button>
                            </td>
                            <td className="border p-2 text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                                    <span className="text-green-600 font-bold">{week.progress}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Commit to Program Button */}
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
                Commit to Program
            </button>
        </div>
    );
};

export default TrainingCard;