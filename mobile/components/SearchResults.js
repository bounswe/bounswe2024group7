import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import { LazyImage } from 'react-native-lazy-image-loader';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SearchBar from './SearchBar';
import apiInstance from "../Api";
import { useSelector } from "react-redux";
import { userSessionToken } from "../user";
import { Badge, Card } from 'react-native-paper';
import PostCard from './PostCard';
import ProgramCard from './ProgramCard';


const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResults = ({ navigation }) => {
const titleString = (str) => {
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}
    const [activeTab, setActiveTab] = useState("posts"); // Control active tab

  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const sessionToken = useSelector(userSessionToken);
  console.log("Navigation object:", navigation);

  const renderPost = ({ item }) => (
    <PostCard
                description={item.content}
                            owner={item.username}
                            tags={item.tags}
                            liked={item.liked}
                            likeCount={item.likeCount}
                            imageUrl = {item.imageUrl}
                            date={item.createdAt}
                            navigation={navigation}
                            post_id={item.id}
                            program_id={item.trainingProgram.id}
              />
  );
  const renderProgram = ({ item }) => (
      <ProgramCard
                    title={item.title}
                    description={item.description}
                    trainerUsername={item.trainer}
                    weeks={item.weeks}
                    participants = {item.participants}
                    date = {item.createdAt}
                    level = {item.level}
                    rating = {item.rating}
                    navigation = {navigation}
                    programId = {item.id}
                    type = {item.type}
                    interval = {item.interval}

                  />
    );
    const renderExercise = ({ item }) => (
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
      );
      const renderTabButton = (label, key) => (
              <TouchableOpacity
                  style={[styles.tabButton, activeTab === key && styles.activeTabButton]}
                  onPress={() => setActiveTab(key)}
              >
                  <Text style={[styles.tabText, activeTab === key && styles.activeTabText]}>
                      {label}
                  </Text>
              </TouchableOpacity>
          );

  return (
          <SafeAreaProvider>
              <SafeAreaView style={styles.container}>
                  <View style={styles.pageButtonContainer}>
                                        <TouchableOpacity style={styles.pageButton} onPress={()=> navigation.navigate('SearchPage')} >
                                        <Text style={styles.pageButtonText}>Search By Muscle</Text>
                                        </TouchableOpacity>
                  </View>
                  <View style={styles.searchBarContainer}>
                      <SearchBar setResults={setSearchResults} setLoading={setLoading} loading={loading} />
                  </View>

                  {/* Tabs */}
                  <View style={styles.tabsContainer}>
                      {renderTabButton(`Posts (${searchResults?.posts?.length || 0})`, "posts")}
                      {renderTabButton(`Exercises (${searchResults?.exercises?.length || 0})`, "exercises")}
                      {renderTabButton(`Programs (${searchResults?.trainingPrograms?.length || 0})`, "programs")}
                  </View>

                  {/* Conditional Rendering Based on Active Tab */}
                  {searchResults && (
                      <View style={styles.resultsContainer}>
                          {activeTab === "posts" && (
                              <FlatList
                                  data={searchResults.posts}
                                  renderItem={renderPost}
                                  keyExtractor={(item, index) => index.toString()}
                              />
                          )}
                          {activeTab === "exercises" && (
                              <FlatList
                                  data={searchResults.exercises}
                                  renderItem={renderExercise}
                                  keyExtractor={(item, index) => index.toString()}
                              />
                          )}
                          {activeTab === "programs" && (
                              <FlatList
                                  data={searchResults.trainingPrograms}
                                  renderItem={renderProgram}
                                  keyExtractor={(item, index) => index.toString()}
                              />
                          )}
                      </View>
                  )}

                  {!searchResults && (
                      <View style={styles.placeholderContainer}>
                          <Text style={styles.placeholderText}>Use the search bar to find results.</Text>
                      </View>
                  )}
              </SafeAreaView>
          </SafeAreaProvider>
      );
  };

  const styles = StyleSheet.create({
      container: {
          minWidth:'%80',
          flex: 1,
          padding: 16,
      },
      searchBarContainer: {
          marginBottom: 10,
      },
      pageButtonContainer: {
                marginBottom: 10,
                alignItems:'center',
            },
      tabsContainer: {
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 16,
      },
      tabButton: {
          minWidth:50,
          flex: 1,
          paddingVertical: 10,
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          marginHorizontal: 4,
      },
      pageButton: {
                 backgroundColor: "#6B46C1",
                height:50,
                padding:5,
                alignItems:'center',
                justifyContent:'center',
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
            },
            pageButtonText: {
                      color: "#FFF",
                      fontWeight: "bold",
                  },
      activeTabButton: {
          backgroundColor: "#6B46C1",
          borderColor: "#6B46C1",
      },
      tabText: {
          color: "#333",
      },
      activeTabText: {
          color: "#FFF",
          fontWeight: "bold",
      },
      resultsContainer: {
          flex: 1,
      },
      card: {
          marginBottom: 10,
          padding: 8,
      },
      badge: {
          backgroundColor: "#6B46C1",
          color: "#fff",
      },
      placeholderContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
      },
      placeholderText: {
          fontSize: 16,
          color: "#888",
      },
  });

  export default SearchResults;