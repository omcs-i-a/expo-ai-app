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

interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    message: string;
}

const OPENAI_API_KEY = Constants.expoConfig?.extra?.openAIApiKey;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

export default function ChatScreen() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'bot', message: 'こんにちは！' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); // 追加: ローディング状態
    const messageListRef = useRef<FlatList<ChatMessage> | null>(null);


    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            message: input,
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput('');
        setLoading(true); // ローディング開始

        // 「考え中...」メッセージを追加
        const loadingMessageId = (Date.now() + 1).toString();
        const loadingMessage: ChatMessage = {
            id: loadingMessageId,
            sender: 'bot',
            message: '考え中...',
        };
        setMessages((prevMessages) => [...prevMessages, loadingMessage]);

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "system" as const, content: SYSTEM_PROMPT },
                    ...messages.map(msg => ({
                        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
                        content: msg.message
                    }))
                ],
                temperature: 0.7,
            });

            // 「考え中...」メッセージを実際の応答で置き換え
            const botReply = response.choices[0].message.content || '応答がありません';
            setMessages((prevMessages) =>
                prevMessages.map(msg =>
                    msg.id === loadingMessageId
                        ? { ...msg, message: botReply }
                        : msg
                )
            );
        } catch (error) {
            console.error('OpenAI API error:', error);

            // エラー時は「考え中...」メッセージをエラーメッセージに置き換え
            setMessages((prevMessages) =>
                prevMessages.map(msg =>
                    msg.id === loadingMessageId
                        ? { ...msg, message: '申し訳ありません。エラーが発生しました。' }
                        : msg
                )
            );
        } finally {
            setLoading(false); // ローディング終了
        }
        // messageListRef.current?.scrollToEnd({ animated: true });
    };
    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                messageListRef.current?.scrollToEnd({ animated: true });
            }, 100); // 少し遅延させてレイアウト更新後にスクロールさせる
        }
    }, [messages]);

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
                        renderItem={({ item }) => (
                            <View
                                style={
                                    item.sender === 'user' ? styles.userMessage : styles.botMessage
                                }
                            >
                                <Text style={styles.messageText}>{item.message}</Text>
                            </View>
                        )}
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
                                <Text style={styles.buttonText}>送信</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageText: {
        fontSize: 16,
    },
});