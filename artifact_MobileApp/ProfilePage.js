import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
//import { Badge, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import PostCard from './PostCard';


const ProfilePage = () => {
  return (
    <><View style={styles.container}>
          <Image
              source={{ uri: 'https://source.unsplash.com/random/300x300' }}
              style={styles.profileImage} />
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileUsername}>@johndoe</Text>
          <View style={styles.badgesContainer}>
              <Text style={styles.badge}>Posts: 100</Text>
              <Text style={styles.badge}>Followers: 500</Text>

          </View>
          <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                  <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
          </View>
      </View><View style={styles.postCardsContainer}>

              <View key={1} style={styles.row}>
                  <View key={1} style={styles.col}>
                      <PostCard
                          title="Mona Lisa"
                          imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                          genre="portrait"
                          material="Oil"
                          creator="Leonardo da Vinci" />
                  </View>
                  <View key={2} style={styles.col}>
                      <PostCard
                          title="Mona Lisa"
                          imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                          genre="portrait"
                          material="Oil"
                          creator="Leonardo da Vinci" />
                  </View>
                  <View key={3} style={styles.col}>
                      <PostCard
                          title="Mona Lisa"
                          imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                          genre="portrait"
                          material="Oil"
                          creator="Leonardo da Vinci" />
                  </View>
              </View>
              <View key={2} style={styles.row}>
                  <View key={1} style={styles.col}>
                      <PostCard
                          title="Mona Lisa"
                          imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                          genre="portrait"
                          material="Oil"
                          creator="Leonardo da Vinci" />
                  </View>
                  <View key={1} style={styles.col}>
                      <PostCard
                          title="Mona Lisa"
                          imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                          genre="portrait"
                          material="Oil"
                          creator="Leonardo da Vinci" />
                  </View>
                  <View key={1} style={styles.col}>
                      <PostCard
                          title="Mona Lisa"
                          imageURL="https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
                          genre="portrait"
                          material="Oil"
                          creator="Leonardo da Vinci" />
                  </View>
              </View>

          </View></>
  );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        marginBottom: 10
      },
      col: {
        flex: 1,
        margin: 5,
      },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: 'purple',
    padding: 8,
    margin: 8
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  iconButton: {
    backgroundColor: 'purple',
    borderRadius: 8,
    padding: 12,
    margin: 8
  },
  postCardsContainer: {
    marginTop: 20,
  }
});

export default ProfilePage;
