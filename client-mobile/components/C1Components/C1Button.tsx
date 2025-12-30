import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface C1ButtonProps {
    children?: string;
    name?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    onPress?: (text: string) => void;
}

const variantStyles = {
    primary: {
        backgroundColor: '#3FB984', // Emerald Green
        color: '#FFFFFF',
    },
    secondary: {
        backgroundColor: '#F7F9F9', // Off White
        color: '#2F8F7E', // Teal
    },
    tertiary: {
        backgroundColor: 'transparent',
        color: '#3FB984', // Emerald Green
    },
};

export function C1Button({ children, name, variant = 'primary', onPress }: C1ButtonProps) {
    const style = variantStyles[variant] || variantStyles.primary;

    const handlePress = () => {
        if (onPress && children) {
            onPress(children);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: style.backgroundColor }]}
            onPress={handlePress}
        >
            <Text style={[styles.text, { color: style.color }]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30, // Pill shape
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48, // Touch target size
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
});
