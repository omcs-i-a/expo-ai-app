import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator, // 追加: ローディングインジケーター
} from 'react-native';
import OpenAI from 'openai';
import Constants from 'expo-constants';
import { SYSTEM_PROMPT } from '@/prompts/systemPrompts';
import { Ionicons } from '@expo/vector-icons'; // 追加: Ioniconsをインポート

interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    message: string;
}

const OPENAI_API_KEY = Constants.expoConfig?.extra?.openAIApiKey;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // ブラウザ環境での実行を許可
});

export default function ChatScreen() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'bot', message: 'こんにちは！私はビジネスコンセプターです。あなたのビジネスアイデアを磨き上げていきましょう。' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // 追加: ローディング状態
    const messageListRef = useRef<FlatList<ChatMessage> | null>(null);


    const handleSend = async () => {
        if (input.trim() === '') return;

        // ユーザーメッセージを作成
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            message: input,
        };

        // ローカル変数に最新のメッセージ配列を保持（APIリクエスト用）
        const updatedMessages = [...messages, userMessage];

        // UIを更新
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        // ローディングメッセージ
        const loadingMessageId = (Date.now() + 1).toString();
        const loadingMessage: ChatMessage = {
            id: loadingMessageId,
            sender: 'bot',
            message: '考え中...',
        };

        setMessages([...updatedMessages, loadingMessage]);

        try {
            // updatedMessagesを使用して最新のメッセージを含める
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system" as const, content: SYSTEM_PROMPT },
                    ...updatedMessages.map(msg => ({
                        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
                        content: msg.message
                    }))
                ],
                temperature: 0.7,
            });

            // 応答処理
            const botReply = response.choices[0].message.content || '応答がありません';
            setMessages((prevMessages) =>
                prevMessages.map(msg =>
                    msg.id === loadingMessageId
                        ? { ...msg, message: botReply }
                        : msg
                )
            );
        } catch (error) {
            // エラー処理
            console.error('OpenAI API error:', error);
            setMessages((prevMessages) =>
                prevMessages.map(msg =>
                    msg.id === loadingMessageId
                        ? { ...msg, message: '申し訳ありません。エラーが発生しました。' }
                        : msg
                )
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                messageListRef.current?.scrollToEnd({ animated: true });
            }, 100); // 少し遅延させてレイアウト更新後にスクロールさせる
        }
    }, [messages]);

    const renderMessage = ({ item }: { item: ChatMessage }) => {
        const isLoading = item.message === '考え中...' && loading;

        return (
            <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
                {isLoading ? (
                    <View style={styles.loadingRow}>
                        <Text style={styles.messageText}>考え中</Text>
                        <ActivityIndicator size="small" color="#0084ff" style={styles.indicator} />
                    </View>
                ) : (
                    <Text style={styles.messageText}>{item.message}</Text>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={styles.container}>
                    <FlatList
                        ref={messageListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.messageListContent}
                        showsVerticalScrollIndicator={true}
                        onContentSizeChange={() => messageListRef.current?.scrollToEnd({ animated: false })}
                        onLayout={() => messageListRef.current?.scrollToEnd({ animated: false })}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={input}
                            onChangeText={setInput}
                            placeholder="メッセージを入力..."
                            placeholderTextColor="#999"
                            editable={!loading} // ローディング中は編集不可
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSend}
                            disabled={loading} // ローディング中は無効化
                        >
                            {loading ? ( // ローディングインジケーターを表示
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Ionicons name="send" size={22} color="#fff" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff', // SafeAreaView に背景色を設定
    },
    keyboardAvoidingView: {
        flex: 1,
        marginBottom: 50
    },
    container: {
        flex: 1,
        justifyContent: 'space-between', // ★ これが重要: 子要素を上下に配置
        padding: 0,
    },
    messageList: {
        width: '100%',
        flex: 1, //追加
    },
    messageListContent: {
        padding: 20, // 下部に余白を追加してスクロール時に見えるようにする
        flexGrow: 1, // FlatListが適切に拡張するように
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
        padding: 10,
        borderRadius: 10,
        marginBottom: 16,
        maxWidth: '80%',
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ECECEC',
        padding: 10,
        borderRadius: 10,
        marginBottom: 16,
        maxWidth: '80%',
        minHeight: 40, // 高さを確保してインジケーターの表示を安定させる
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#fff', // 背景色
        borderTopWidth: 1, // 輪郭線の太さ
        borderTopColor: '#ccc', // 輪郭線の色
        // borderTopWidth と borderColor は不要 (タブバーと接するため)
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        margin: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    messageText: {
        fontSize: 16,
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicator: {
        marginLeft: 8,
    },
});