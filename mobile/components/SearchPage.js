import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Badge, Card } from 'react-native-paper';
import Svg, { G, Path } from 'react-native-svg'; // Replace muscle model rendering
import { AppContext } from '../context/AppContext';
// import Body from "react-native-body-highlighter";
const SearchPage = () => {
    const [selectedMuscle, setSelectedMuscle] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const sessionToken = useSelector(userSessionToken);
    const [exerciseOptions, setExerciseOptions] = useState([]);
    const [highlightedData, setHighlightedData] = useState([]);

    const muscleOptions = [
        { label: 'Trapezius', value: 'TRAPEZIUS' },
        { label: 'Triceps', value: 'TRICEPS' },
        { label: 'Forearm', value: 'FOREARM' },
        { label: 'Adductors', value: 'ADDUCTORS' },
        { label: 'Calves', value: 'CALVES' },
        { label: 'Hair', value: 'HAIR' },
        { label: 'Neck', value: 'NECK' },
        { label: 'Deltoids', value: 'DELTOIDS' },
        { label: 'Hands', value: 'HANDS' },
        { label: 'Feet', value: 'FEET' },
        { label: 'Head', value: 'HEAD' },
        { label: 'Ankles', value: 'ANKLES' },
        { label: 'Tibialis', value: 'TIBIALIS' },
        { label: 'Obliques', value: 'OBLIQUES' },
        { label: 'Chest', value: 'CHEST' },
        { label: 'Biceps', value: 'BICEPS' },
        { label: 'Abs', value: 'ABS' },
        { label: 'Quadriceps', value: 'QUADRICEPS' },
        { label: 'Knees', value: 'KNEES' },
        { label: 'Upper-Back', value: 'UPPER-BACK' },
        { label: 'Lower-Back', value: 'LOWER-BACK' },
        { label: 'Hamstring', value: 'HAMSTRING' },
        { label: 'Gluteal', value: 'GLUTEAL' },
      ];

        const {
            data: exercisesData,
            isFetching: exercisesIsFetching,
            isLoading: exercisesIsLoading,
        } = useQuery({
            queryKey: ['exercises'],
            queryFn: async () => {
                const response = await apiInstance(sessionToken).get('api/exercises')

                return response.data
            },
            refetchOnWindowFocus: false,
        })

        useEffect(() => {
            if (exercisesData && !exercisesIsFetching) {
                setExerciseOptions(exercisesData)
            }
        }, [exercisesData, exercisesIsFetching])

    // Highlight Data (Dummy Functionality)
    setHighlightedData( selectedName
        ? [{ bodyPartName: selectedName, intensity:2 }]
        : []);

    // Function to format muscle names
    const formatMuscleNameForComparison = (muscleName) =>
        muscleName.toUpperCase().replace(/\s+/g, '_');

    // Handle muscle click
    const handleMuscleClick = (data) => {
        if (data && data.bodyPartName) {
            // Format muscle name
            const muscleName = data.bodyPartName
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim();
            
            // Toggle selection if clicking the same muscle
            if(prevMuscle===muscleName){
            setSelectedMuscle("");
            setSelectedName("");
            }
            else{
                setSelectedMuscle(muscleName);
                setSelectedName(data.bodyPartName);

            }
        }
    };


    // Filter exercises based on selected muscle
    const filteredExercises = selectedMuscle
        ? exerciseOptions.filter(
              (exercise) =>
                  exercise.targetMuscle === formatMuscleNameForComparison(selectedMuscle) ||
                  exercise.secondaryMuscles.includes(formatMuscleNameForComparison(selectedMuscle))
          )
        : [];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Exercise Search</Text>

            {/* Muscle Models */}
            <View style={styles.modelsContainer}>

            <View style={styles.optionsContainer}>
                        {muscleOptions.map((option) => (
                            <TouchableOpacity
                               key={option.value}
                               style={[
                                 styles.muscleOption,
                                 selectedMuscle.includes(option.value) && styles.selectedMuscleOption,
                               ]}
                               onPress={() => handleMuscleClick(option.value)}
                               >
                               <Text
                                 style={[
                                   styles.muscleOptionText,
                                     selectedMuscle.includes(option.value) && styles.selectedMuscleOptionText,
                                   ]}
                                   >
                                   {option.label}
                                 </Text>
                                </TouchableOpacity>
                              ))}
                       </View>

                

            {/* Selected Muscle Info */}
            {selectedMuscle && (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.muscleTitle}>Exercises for {selectedMuscle}</Text>

                    {isLoadingExercises ? (
                        <Text style={styles.loadingText}>Loading exercises...</Text>
                    ) : filteredExercises.length > 0 ? (
                        <FlatList
                            data={filteredExercises}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Card style={styles.card}>
                                    <Card.Title title={item.name.charAt(0).toUpperCase() + item.name.slice(1)} />
                                    <Card.Content>
                                        <View style={styles.badges}>
                                            <Badge style={styles.badge}>{item.equipment.replace(/_/g, ' ')}</Badge>
                                            <Badge style={[styles.badge, styles.outlineBadge]}>
                                                {item.bodyPart.replace(/_/g, ' ')}
                                            </Badge>
                                        </View>
                                        <FlatList
                                            data={item.instructions}
                                            keyExtractor={(instr, index) => index.toString()}
                                            renderItem={({ item: instr }) => (
                                                <Text style={styles.instruction}>{`\u2022 ${instr}`}</Text>
                                            )}
                                        />
                                    </Card.Content>
                                </Card>
                            )}
                        />
                    ) : (
                        <Text>No exercises found for {selectedMuscle}</Text>
                    )}
                </View>
            )}

            {!selectedMuscle && <Text style={styles.hint}>Click on any muscle to see related exercises</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#6B46C1',
    },
    modelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modelSection: {
        flex: 1,
        alignItems: 'center',
    },
    modelTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    exerciseContainer: {
        marginTop: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
    },
    muscleTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6B46C1',
        marginBottom: 8,
    },
    loadingText: {
        textAlign: 'center',
    },
    card: {
        marginVertical: 8,
        padding: 8,
    },
    badges: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    badge: {
        marginRight: 8,
        backgroundColor: '#6B46C1',
        color: '#fff',
    },
    outlineBadge: {
        borderColor: '#6B46C1',
        borderWidth: 1,
        backgroundColor: '#fff',
        color: '#6B46C1',
    },
    instruction: {
        fontSize: 14,
        color: '#333',
    },
    hint: {
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        marginTop: 16,
    },
});

export default SearchPage;
