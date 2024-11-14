import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PostCard = ({ title, description, owner, date, likeCount, commentCount }) => {
  return (
    <View style={styles.card}>
      {/* Post Image */}
      <Image
        source={{ uri: 'https://commons.wikimedia.org/wiki/File:FitnessBerlin.jpg' }} // Replace with actual image source
        style={styles.postImage}
      />
      
      {/* Post Title and Description */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        {/* Post Owner and Date */}
        <View style={styles.ownerInfo}>
          <View style={styles.ownerAvatar}>
            <Icon name="user-circle" size={20} color="#ccc" />
          </View>
          <View>
            <Text style={styles.ownerName}>{owner}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>

        {/* Post Engagement (Likes, Comments, Shares) */}
        <View style={styles.engagement}>
          <Text style={styles.engagementText}>{likeCount} Likes</Text>
          <Text style={styles.engagementText}>{commentCount} Comments</Text>
        </View>

        {/* Action Buttons (Like, Comment, Share) */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="thumbs-up" size={20} color="gray" />
            <Text style={styles.actionText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="comments" size={20} color="gray" />
            <Text style={styles.actionText}>Comment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ownerAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  ownerName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  engagement: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  engagementText: {
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 4,
  },
});

export default PostCard;
