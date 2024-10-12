import React, { useState } from 'react';
import { FlatList ,View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from './AuthContext';
import apiInstance from './Api';
import { useEffect } from 'react';

const Feed = () => {
    
    const { user, password } = useAuth();


    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            backgroundColor: 'white',
        },
        postcontainer: {
            flex: 1,
            alignItems: 'center',
            margin: 5, // Add margin between grid items
        }
    });
}
export default Feed;