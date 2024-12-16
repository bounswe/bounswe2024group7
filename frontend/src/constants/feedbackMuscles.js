export const FEEDBACK_MUSCLES = {
    TRAPEZIUS: 'TRAPEZIUS',
    UPPER_BACK: 'UPPER_BACK',
    LOWER_BACK: 'LOWER_BACK',
    CHEST: 'CHEST',
    BICEPS: 'BICEPS',
    TRICEPS: 'TRICEPS',
    FOREARM: 'FOREARM',
    BACK_DELTOIDS: 'BACK_DELTOIDS',
    FRONT_DELTOIDS: 'FRONT_DELTOIDS',
    ABS: 'ABS',
    OBLIQUES: 'OBLIQUES',
    ADDUCTOR: 'ADDUCTOR',
    HAMSTRING: 'HAMSTRING',
    QUADRICEPS: 'QUADRICEPS',
    ABDUCTORS: 'ABDUCTORS',
    CALVES: 'CALVES',
    GLUTEAL: 'GLUTEAL',
    HEAD: 'HEAD',
    NECK: 'NECK'
};

export const formatMuscleName = (muscle) => {
    return muscle.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
};