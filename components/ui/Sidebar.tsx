import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Sidebar() {
    const router = useRouter();

    return (
        <View style={styles.sidebar}>
            <Text style={styles.title}>My App</Text>

            <TouchableOpacity style={styles.link} onPress={() => router.push('/')}>
                <Ionicons name="home-outline" size={24} color="#0D0D0D" />
                <Text style={styles.linkText}>ホーム</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={() => router.push('/explore')}>
                <Ionicons name="search-outline" size={24} color="#0D0D0D" />
                <Text style={styles.linkText}>探索</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    sidebar: {
        width: 250,
        height: '100%',
        backgroundColor: '#f4f4f4',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0D0D0D',
        marginBottom: 20,
    },
    link: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    linkText: {
        fontSize: 18,
        color: '#0D0D0D',
        marginLeft: 10,
    },
});
