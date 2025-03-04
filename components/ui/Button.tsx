// @/components/ui/Button.tsx
import React, { PropsWithChildren } from 'react';
import {
    Text as RNText,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors } from '@/constants/Colors'; // Colors は定義済みのものを利用
import { useColorScheme } from '@/hooks/useColorScheme'; // useColorScheme は定義済みのものを利用

interface ButtonProps extends PropsWithChildren {
    onPress: () => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    color?: keyof typeof Colors['light'] | keyof typeof Colors['dark']; // Colors から型を生成
    preset?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    title,
    style,
    textStyle,
    color,
    preset = 'primary',
}) => {
    const colorScheme = useColorScheme() || 'light';

    const buttonColors = {
        primary: {
            backgroundColor: Colors[colorScheme].primary,
            textColor: Colors[colorScheme].buttonText,
            borderColor: Colors[colorScheme].primary,
        },
        secondary: {
            backgroundColor: Colors[colorScheme].secondary,
            textColor: Colors[colorScheme].buttonText,
            borderColor: Colors[colorScheme].secondary,
        },
        outline: {
            backgroundColor: 'transparent',
            textColor: Colors[colorScheme].primary,
            borderColor: Colors[colorScheme].primary,
        },
    };

    const currentPreset = buttonColors[preset];

    const combinedButtonStyle: StyleProp<ViewStyle> = [
        styles.button,
        { backgroundColor: currentPreset.backgroundColor },
        preset === 'outline' && currentPreset.borderColor
            ? { borderWidth: 1, borderColor: currentPreset.borderColor }
            : {},
        style,
    ];

    const combinedTextStyle: StyleProp<TextStyle> = [
        styles.text,
        { color: color ? Colors[colorScheme][color] : currentPreset.textColor },
        textStyle,
    ];

    return (
        <TouchableOpacity style={combinedButtonStyle} onPress={onPress}>
            {title ? <RNText style={combinedTextStyle}>{title}</RNText> : children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export { Button };