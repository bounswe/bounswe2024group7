import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CreatePost from './CreatePost';
import CreateProgram from './CreateProgram';
import CreateDietProgram from './CreateDietProgram';

const Create = ({ darkMode , setSelectedPage}) => {
  const [activeTab, setActiveTab] = useState('CreatePost');

  return (
    <View style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'CreatePost' && styles.activeTab]}
          onPress={() => setActiveTab('CreatePost')}
        >
          <Text style={[styles.tabText, activeTab === 'CreatePost' && styles.activeTabText]}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'CreateProgram' && styles.activeTab]}
          onPress={() => setActiveTab('CreateProgram')}
        >
          <Text style={[styles.tabText, activeTab === 'CreateProgram' && styles.activeTabText]}>Program</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={[styles.tabButton, activeTab === 'CreateDiet' && styles.activeTab]}
                  onPress={() => setActiveTab('CreateDiet')}
                >
                  <Text style={[styles.tabText, activeTab === 'CreateDiet' && styles.activeTabText]}>Diet</Text>
                </TouchableOpacity>
      </View>

      {/* Render the active component */}
      <View style={styles.content}>
        {activeTab === 'CreatePost' ? (
          <CreatePost darkMode={darkMode} setSelectedPage={setSelectedPage} />
        ) : ((activeTab==='CreateProgram')?
          <CreateProgram darkMode={darkMode} setSelectedPage={setSelectedPage} />:(<CreateDietProgram darkMode={darkMode} setSelectedPage={setSelectedPage} />)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  activeTab: {
    backgroundColor: '#4F46E5',
  },
  tabText: {
    color: '#111827',
    fontSize: 16,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

export default Create;
