import { Tabs } from 'expo-router';
import React from 'react';
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

    // Web版のみ、横幅が768px以上ならサイドバーを表示
    const isWebWithSidebar = Platform.OS === 'web' && width >= 768;

    return (
        <View style={styles.container}>
            {isWebWithSidebar && <Sidebar />}
            <View style={styles.content}>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                        headerShown: false,
                        tabBarButton: isWebWithSidebar ? () => null : HapticTab, // Webではタブを非表示
                        tabBarBackground: isWebWithSidebar ? undefined : TabBarBackground,
                        tabBarStyle: isWebWithSidebar ? { display: 'none' } : styles.tabBar,
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
