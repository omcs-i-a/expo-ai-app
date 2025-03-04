import React, { PropsWithChildren } from 'react';
import { Text as RNText, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors'; // Colors は定義済みのものを利用
import { useColorScheme } from '@/hooks/useColorScheme'; // useColorScheme は定義済みのものを利用

interface TextProps extends PropsWithChildren {
    style?: StyleProp<TextStyle>;
    color?: keyof typeof Colors['light'] | keyof typeof Colors['dark']; // Colors から型を生成
    preset?: 'heading' | 'subheading' | 'body' | 'caption'; // プリセット
}

const Text: React.FC<TextProps> = ({ children, style, color, preset = 'body' }) => {
    const colorScheme = useColorScheme() || 'light';

    const textColor = color ? Colors[colorScheme][color] : Colors[colorScheme].text;

    const presetStyles: { [key: string]: TextStyle } = {
        heading: {
            fontSize: 24,
            fontWeight: 'bold',
        },
        subheading: {
            fontSize: 18,
            fontWeight: '600',
        },
        body: {
            fontSize: 16,
        },
        caption: {
            fontSize: 12,
            color: Colors[colorScheme].secondaryText, // 例: 薄い色
        },
    };

    return (
        <RNText style={[presetStyles[preset], { color: textColor }, style]}>
            {children}
        </RNText>
    );
};

export { Text };