import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    // 現在のパスに基づいてアクティブなタブを判断
    const isHomeActive = pathname === '/' || pathname === '/index';
    const isExploreActive = pathname.includes('/explore');
    const isChatActive = pathname.includes('/chat');

    return (
        <View style={styles.sidebar}>
            <Text style={styles.title}>My App</Text>

            <TouchableOpacity
                style={[styles.link, isHomeActive && styles.activeLink]}
                onPress={() => router.push('/')}
            >
                <Ionicons
                    name={isHomeActive ? "home" : "home-outline"}
                    size={24}
                    color={isHomeActive ? "#007bff" : "#0D0D0D"}
                />
                <Text style={[styles.linkText, isHomeActive && styles.activeLinkText]}>ホーム</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.link, isExploreActive && styles.activeLink]}
                onPress={() => router.push('/explore')}
            >
                <Ionicons
                    name={isExploreActive ? "search" : "search-outline"}
                    size={24}
                    color={isExploreActive ? "#007bff" : "#0D0D0D"}
                />
                <Text style={[styles.linkText, isExploreActive && styles.activeLinkText]}>探索</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.link, isChatActive && styles.activeLink]}
                onPress={() => router.push('/chat')}
            >
                <Ionicons
                    name={isChatActive ? "chatbubble" : "chatbubble-outline"}
                    size={24}
                    color={isChatActive ? "#007bff" : "#0D0D0D"}
                />
                <Text style={[styles.linkText, isChatActive && styles.activeLinkText]}>チャット</Text>
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
        flexShrink: 0,
        position: 'relative',
        flexBasis: 250,
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
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    activeLink: {
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
    },
    linkText: {
        fontSize: 18,
        color: '#0D0D0D',
        marginLeft: 10,
    },
    activeLinkText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});
