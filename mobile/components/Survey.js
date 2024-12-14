import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';


const Survey = ({ route }) => {
    const {userId, fitnessGoals, fitnessLevel, navigation} = route.params;

    const goHome = () => navigation.navigate('Home');

    const [level, setLevel] = useState('Beginner'); // Default Level
    const [geals, setGoals] = useState(''); // Default No Goals

    const deliverDatabase = async (userId, fitnessGoals, fitnessLevel) => {
        try{
            const response = await apiInstance().post(
                "api/surveys",
                {
                    userId,
                    fitnessGoals,
                    fitnessLevel
                }
            )

            if (response.status === 201) {
            
                    const data = response.data
            
                    dispatch(
                        userActions.login({
                            userId: data.id,
                            userName: data.username,
                            fitnessGoals: data.fitnessGoals,
                            fitnessLevel: data.fitnessLevel
                        })
                    )            
                    goHome();
                }
        }
        catch (e) {
              console.log(e);
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Survey Completion Error',
                text2: 'There is an error in your survey. Please try again.',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40
            });
        }
    }

    const renderSurvey = ({ item, index, navigation }) => {
        <View style={styles.exerciseContainer}>

            <Text style={styles.fitnessGoal}>{item.fitnessGoals} Your Fitness Goals</Text>
            <Picker
                selectedValue={fitnessGoals}
                onValueChange={(itemValue) => setGoals(itemValue)}
                style={styles.picker} >
                <Picker.Item label="Pilates" value="pilates" />
                <Picker.Item label="Cycling" value="cycling" />
                <Picker.Item label="Yoga" value="yoga" />
                <Picker.Item label="Cardio" value="cardio" />
                <Picker.Item label="Strength Training" value="strength_training" />
            </Picker>
        
            <Text style={styles.fitnessLevel}>{item.fitnessLevels} Select Your Fitness Level</Text>        
            <Picker
                selectedValue={fitnessLevel}
                onValueChange={(itemValue) => setLevel(itemValue)}
                style={styles.picker} >
                <Picker.Item label="Intermediate" value="Intermediate" />
                <Picker.Item label="Beginner" value="Beginner" />
                <Picker.Item label="Professional" value="Professional" />
            </Picker>
        
        </View>
    }

    return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}> Before Facting Fitness... </Text>    
            <FlatList
                data={fitnessGoals}
                renderItem={(props) => renderSurvey({ item, index, navigation })}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                  style={styles.button}
                  onPress={() => deliverDatabase(userId, fitnessGoals, fitnessLevel)}
                >
                  <Text style={styles.buttonText}>Start The Journey</Text>
            </TouchableOpacity>
        </ScrollView>
      );

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    exerciseNameContainer: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    detailsContainer: {
      marginBottom: 16,
    },
    level: {
      fontSize: 14,
      color: 'orange',
    },
    type: {
      fontSize: 14,
      color: 'blue',
    },
    trainer: {
      fontSize: 14,
      color: 'red',
    },
    date: {
      fontSize: 12,
      color: 'gray',
    },
    description: {
      fontSize: 16,
      marginVertical: 8,
    },
    rating: {
      fontSize: 16,
      marginBottom: 16,
      textAlign: 'center',
    },
    exerciseContainer: {
      backgroundColor: '#f9f9f9',
      padding: 16,
      marginBottom: 8,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly', // Ensure equal spacing between items
    },
    exerciseTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    fitnessGoal: {
      fontSize: 14,
      color: 'gray',
      flex: 0.8, // Set equal flex for alignment
      textAlign: 'center',
    },
    fitnessLevel: {
      fontSize: 14,
      color: 'gray',
      flex: 0.8, // Set equal flex for alignment
      textAlign: 'center',
    },
    exerciseName: {
      fontSize: 13,
      color: 'gray',
    },
    startButton: {
      backgroundColor: '#007bff',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      flex: 0.9, // Equalize space allocation
      alignItems: 'center',
    },
    startButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    completionText: {
      fontSize: 14,
      color: 'green',
      flex: 0.4, // Equal flex
      textAlign: 'center',
    },
    commitButton: {
      backgroundColor: 'green',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 16,
    },
    commitButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    detailButton: {
      backgroundColor: 'gray',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    detailButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    picker: {
        width: '80%',
        height: 50,
        marginTop: 10,
        backgroundColor: '#F8F8F8',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#3C3633',
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
  });

export default Survey;