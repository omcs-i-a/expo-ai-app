import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Platform, View, StyleSheet, useWindowDimensions } from 'react-native';
// import { useMediaQuery } from 'react-responsive';
import { usePathname } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Sidebar from '@/components/ui/Sidebar';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const pathname = usePathname();
    const { width } = useWindowDimensions();
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    // Web版のみ、横幅が768px以上ならサイドバーを表示
    const shouldShowSidebar = Platform.OS === 'web' && width >= 768;
    const [showSidebar, setShowSidebar] = useState(shouldShowSidebar);

    // マウント時に一度だけレイアウトを確定
    useEffect(() => {
        setShowSidebar(shouldShowSidebar);
        setIsLayoutReady(true);
    }, [shouldShowSidebar]);

    // ウィンドウサイズ変更時のサイドバー表示制御（サイズ変更対応）
    useEffect(() => {
        if (isLayoutReady) {
            setShowSidebar(shouldShowSidebar);
        }
    }, [width, isLayoutReady, shouldShowSidebar]);

    // レイアウトが準備できるまでは何も表示しない
    if (!isLayoutReady && Platform.OS === 'web') {
        return <View style={styles.container} />;
    }

    return (
        <View style={styles.container}>
            {showSidebar && <Sidebar />}
            <View style={styles.content}>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                        headerShown: false,
                        tabBarButton: showSidebar ? () => null : HapticTab, // Webではタブを非表示
                        tabBarBackground: showSidebar ? undefined : TabBarBackground,
                        tabBarStyle: showSidebar ? { display: 'none' } : styles.tabBar,
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Home',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="explore"
                        options={{
                            title: '探索',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="safari.fill" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="chat" // またはチャット画面のファイル名 (例: chat.js なら name="chat")
                        options={{
                            title: 'チャット', // タブに表示されるタイトル
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="message.fill" color={color} />,
                        }}
                    />
                </Tabs>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        flex: 1,
    },
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.light.background,
        borderTopColor: 'transparent',
    },
});
