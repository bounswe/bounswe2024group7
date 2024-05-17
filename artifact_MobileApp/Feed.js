import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import PostViewPage from './PostViewPage';

const Feed = () => {
    const paintings = [
        {
            "imageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQsu7yYuRPXNK9eHHSFD2tUYO4stQDb1Ez8vjqGERfs9xqYLLnY_y6lQkPFZa-44cqn",
            "title": "Mona Lisa",
            "material": "Oil on poplar",
            "genre": "Portrait",
            "creator": "Leonardo da Vinci"
        }
        
        // ,
        // {
        //     "imageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQsu7yYuRPXNK9eHHSFD2tUYO4stQDb1Ez8vjqGERfs9xqYLLnY_y6lQkPFZa-44cqn",
        //     "title": "Starry Night",
        //     "material": "Oil on canvas",
        //     "genre": "Post-Impressionism",
        //     "creator": "Vincent van Gogh"
        // },
        // {
        //     "imageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQsu7yYuRPXNK9eHHSFD2tUYO4stQDb1Ez8vjqGERfs9xqYLLnY_y6lQkPFZa-44cqn",
        //     "title": "The Persistence of Memory",
        //     "material": "Oil on canvas",
        //     "genre": "Surrealism",
        //     "creator": "Salvador Dalí"
        // },
        // {
        //     "imageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQsu7yYuRPXNK9eHHSFD2tUYO4stQDb1Ez8vjqGERfs9xqYLLnY_y6lQkPFZa-44cqn",
        //     "title": "The Scream",
        //     "material": "Oil, tempera, and pastel on cardboard",
        //     "genre": "Expressionism",
        //     "creator": "Edvard Munch"
        // },
        // {
        //     "imageURL": "https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQsu7yYuRPXNK9eHHSFD2tUYO4stQDb1Ez8vjqGERfs9xqYLLnY_y6lQkPFZa-44cqn",
        //     "title": "Girl with a Pearl Earring",
        //     "material": "Oil on canvas",
        //     "genre": "Tronie",
        //     "creator": "Johannes Vermeer"
        // }
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {paintings.map((painting, index) => (
                <View key={index} style={styles.postcontainer}>
                    <PostViewPage
                        post = {{ imageURL:painting.imageURL,
                        title:painting.title,
                        material:painting.material,
                        genre:painting.genre,
                        creator:painting.creator}}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: 'white',
    },
    postcontainer: {
        marginBottom: 20,
    },
});

export default Feed;