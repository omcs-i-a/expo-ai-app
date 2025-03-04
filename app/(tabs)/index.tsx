import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/alien.png')}
                    style={styles.reactLogo}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">こんにちはようこそ！</ThemedText>
                <HelloWave />
            </ThemedView>

            {/* ダッシュボードセクション */}
            <ThemedView style={styles.dashboardContainer}>
                <ThemedText type="subtitle">あなたのダッシュボード</ThemedText>

                <ThemedView style={styles.cardContainer}>
                    {/* 最近のアクティビティカード */}
                    <ThemedView style={styles.card}>
                        <ThemedText type="defaultSemiBold">最近のアクティビティ</ThemedText>
                        <ThemedText>最近の学習記録や相談履歴がここに表示されます</ThemedText>
                    </ThemedView>

                    {/* 専門家相談カード */}
                    <ThemedView style={styles.card}>
                        <ThemedText type="defaultSemiBold">専門家に相談</ThemedText>
                        <ThemedText>質問や悩みがありますか？専門家に相談できます</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            {/* 主要機能へのナビゲーション */}
            <ThemedView style={styles.navigationContainer}>
                <ThemedText type="subtitle">クイックアクセス</ThemedText>

                <ThemedView style={styles.cardContainer}>
                    {/* チャットカード */}
                    <ThemedView style={[styles.navCard, { backgroundColor: '#A1CEDC' }]}>
                        <ThemedText type="defaultSemiBold" style={styles.navCardText}>チャット</ThemedText>
                    </ThemedView>

                    {/* 学びカード */}
                    <ThemedView style={[styles.navCard, { backgroundColor: '#B8D8BE' }]}>
                        <ThemedText type="defaultSemiBold" style={styles.navCardText}>学び</ThemedText>
                    </ThemedView>

                    {/* Pro相談カード */}
                    <ThemedView style={[styles.navCard, { backgroundColor: '#F2D5A8' }]}>
                        <ThemedText type="defaultSemiBold" style={styles.navCardText}>Pro相談</ThemedText>
                    </ThemedView>
                </ThemedView>
            </ThemedView>

            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
                    Press{' '}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({
                            ios: 'cmd + d',
                            android: 'cmd + m',
                            web: 'F12'
                        })}
                    </ThemedText>{' '}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                <ThemedText>
                    Tap the Explore tab to learn more about what's included in this starter app.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
                <ThemedText>
                    When you're ready, run{' '}
                    <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
                    <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
                    <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
                    <ThemedText type="defaultSemiBold">app-example</ThemedText>.
                </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 210,
        width: 210,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    dashboardContainer: {
        gap: 8,
        marginBottom: 8,
    },
    cardContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    card: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    navigationContainer: {
        gap: 8,
        marginBottom: 8,
    },
    navCard: {
        flex: 1,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    navCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
});
