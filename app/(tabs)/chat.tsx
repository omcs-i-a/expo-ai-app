// app/(tabs)/chat.tsx
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    SafeAreaView, // SafeAreaView を追加
} from 'react-native';

interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    message: string;
}

export default function ChatScreen() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'bot', message: 'こんにちは！' },
    ]);
    const [input, setInput] = useState('');
    const messageListRef = useRef<FlatList<ChatMessage> | null>(null);

    const handleSend = () => {
        if (input.trim() === '') return;

        // 新しいメッセージを作成
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            message: input
        };

        // 新しいメッセージを配列の末尾に追加
        setMessages(prevMessages => [...prevMessages, newMessage]);

        // 入力欄をクリア
        setInput('');

        // ボットの返信をシミュレート
        setTimeout(() => {
            const botReply: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                message: 'これはボットの返信メッセージです。'
            };
            setMessages(prevMessages => [...prevMessages, botReply]);
        }, 1000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Android では padding は不要
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // 不要なオフセットを削除
            >
                <View style={styles.container}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <View
                                style={item.sender === 'user' ? styles.userMessage : styles.botMessage}
                            >
                                <Text style={styles.messageText}>{item.message}</Text>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.messageList}
                        onContentSizeChange={() => messageListRef.current?.scrollToEnd({ animated: true })}
                        onLayout={() => messageListRef.current?.scrollToEnd({ animated: false })}
                        ref={messageListRef}
                    />
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={input}
                            onChangeText={setInput}
                            placeholder="メッセージを入力..."
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSend}>
                            <Text style={styles.buttonText}>送信</Text>
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
        padding: 20,
    },
    messageListContent: {
        flexGrow: 1,
        padding: 10,
        justifyContent: 'flex-end',
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