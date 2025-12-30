import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface C1ButtonProps {
    children?: string;
    name?: string;
    variant?: 'primary' | 'secondary' | 'tertiary';
    onPress?: () => void;
}

const variantStyles = {
    primary: {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
    },
    secondary: {
        backgroundColor: '#F3F4F6',
        color: '#374151',
    },
    tertiary: {
        backgroundColor: 'transparent',
        color: '#3B82F6',
    },
};

export function C1Button({ children, name, variant = 'primary', onPress }: C1ButtonProps) {
    const style = variantStyles[variant] || variantStyles.primary;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: style.backgroundColor }]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: style.color }]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
    },
});
