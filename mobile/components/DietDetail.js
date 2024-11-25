import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const DietDetail = ({ route }) => {
  const { title, description, owner, followCount, category, nutrition_list /*, weeklySchedule */ } = route.params;

  // Mock data for daily diets
   const weeklySchedule = {
    Monday: ['Egg', 'Squats', 'Turkey', 'Orange'],
    Tuesday: ['Avocado Toast', 'Grilled Chicken', 'Deadlift', 'Kefir'],
    Wednesday: ['Pancakes', 'Meatballs', 'Beef Steak', 'Pineapple'],
    Thursday: ['Olive', 'Rice', 'Manti', 'Turkish Yoghurt'],
    Friday: ['Kashar Cheese', 'Broccoli', 'Lentil', 'Apple'],
    Saturday: ['Cottage Cheese', 'Pasta', 'Falafel', 'Banana'],
    Sunday: ['Cucumber', 'Tuna Salad', 'Mushroom', 'Ayran']
  };

  // Render diets for each day
  const renderDiets = (day) => (
    <View style={styles.dayContainer}>
      {weeklySchedule[day].map((meal, index) => (
        <Text key={index} style={styles.dietText}>{meal}</Text>
      ))}
    </View>
  );

  // Scene map for tabs
  const renderScene = SceneMap({
    Monday: () => renderDiets('Monday'),
    Tuesday: () => renderDiets('Tuesday'),
    Wednesday: () => renderDiets('Wednesday'),
    Thursday: () => renderDiets('Thursday'),
    Friday: () => renderDiets('Friday'),
    Saturday: () => renderDiets('Saturday'),
    Sunday: () => renderDiets('Sunday'),
  });

  // State for tab view index and routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Monday', title: 'Mo' },
    { key: 'Tuesday', title: 'Tue' },
    { key: 'Wednesday', title: 'We' },
    { key: 'Thursday', title: 'Th' },
    { key: 'Friday', title: 'Fri' },
    { key: 'Saturday', title: 'Sa' },
    { key: 'Sunday', title: 'Su' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.owner}>Dietician: {owner}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.nutritionList}>Targeted Nutritions: {nutrition_list.join(', ')}</Text>
      <Text style={styles.followCount}>Followers: {followCount}</Text>

      {/* Weekly Schedule Tabs */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => {
          const { key, ...rest } = props; // Destructure key and rest of props
          return <TabBar {...rest} style={styles.tabBar} indicatorStyle={styles.indicator} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  owner: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  nutritionList: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  followCount: {
    fontSize: 14,
    color: '#888',
  },
  tabBar: {
    backgroundColor: '#007bff',
  },
  indicator: {
    backgroundColor: 'white',
  },
  dayContainer: {
    padding: 16,
  },
  dietText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
});

export default DietDetail;
