import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // For icons

const PostDetail = ({route}) => {
  // Post data
  const {title, description, owner, date, likeCount, commentList, navigation} = route.params;
  const [likes, setLikes] = useState(likeCount);
  /*const [comments, setComments] = useState([
    { id: '1', user: 'jshine1337', text: 'Nope, that’s not a concept...' },
    { id: '2', user: 'sqlpro23', text: 'You could try batching your statements!' },
  ]);*/
  const [comments, setComments] = useState(commentList)
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = () => {
  isLiked?setLikes(likes-1):setLikes(likes + 1);
  setIsLiked(!isLiked);
  }

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: String(comments.length + 1), user: 'You', text: newComment }]);
      setNewComment('');
    }
  };

 /* return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>Help with Trigger: Executing Action Only After All Inserts Are Complete</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>SQL Server</Text>
        </View>
        <Text style={styles.postDescription}>
          Hi all, I'm losing my mind trying to figure this out, and any help would be greatly appreciated!{'\n\n'}
          I'm working on configuring an AFTER INSERT trigger on a table "A"...{'\n\n'}
          Thanks in advance for any guidance or suggestions!
        </Text>
      </View>


      <View style={styles.interactionContainer}>
        <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
          <Icon name="heart" size={20} color="#FF4500" />
          <Text style={styles.interactionText}>{likes} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Icon name="chatbubble-ellipses" size={20} color="#1E90FF" />
          <Text style={styles.interactionText}>{comments.length} Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => setIsBookmarked(!isBookmarked)}
        >
          <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color="#FFD700" />
          <Text style={styles.interactionText}>Bookmark</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>Comments</Text>
        <FlatList
          data={comments}
          nestedScrollEnable
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />
      </View>


      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
          <Icon name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  ); */

  return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Post Header */}
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Posted in {date}</Text>
          </View>
          <View style={styles.ownerContainer}>
                      <Text style={styles.owner}>{owner}</Text>
          </View>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>SQL Server</Text>
          </View>
          <Text style={styles.postDescription}>
            {description}
          </Text>
        </View>

        {/* Interaction Buttons */}
        <View style={styles.interactionContainer}>
          <TouchableOpacity style={styles.interactionButton} onPress={handleLike}>
            <Icon name="heart" size={20} color="#FF4500" />
            <Text style={styles.interactionText}>{likes} Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Icon name="chatbubble-ellipses" size={20} color="#1E90FF" />
            <Text style={styles.interactionText}>{comments.length} Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={() => setIsBookmarked(!isBookmarked)}
          >
            <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={20} color="#FFD700" />
            <Text style={styles.interactionText}>Bookmark</Text>
          </TouchableOpacity>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <FlatList
            data={comments}
            nestedScrollEnable
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentText}>{item.text}</Text>
              </View>
            )}
          />
        </View>

        {/* Add Comment Input */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
            <Icon name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  date: {
      fontSize: 14,
      color: '#999',
    },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ownerContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
postHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginRight:20,
      marginBottom: 10,
    },
  tag: {
    backgroundColor: '#E0E0E0',
    color: '#333333',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  owner: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#1E90FF',
      marginBottom: 4,
    },
  postDescription: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  interactionButton: {
    alignItems: 'center',
  },
  interactionText: {
    fontSize: 12,
    color: '#333333',
    marginTop: 4,
  },
  commentsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  commentItem: {
    marginBottom: 15,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#555555',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  commentInput: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});

export default PostDetail;
