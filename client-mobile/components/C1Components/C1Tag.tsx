import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';

interface C1TagProps {
    text?: string;
    variant?: 'success' | 'info' | 'warning' | 'error' | 'neutral';
}

const variantStyles: Record<string, { backgroundColor: string; color: string }> = {
    success: { backgroundColor: '#E6F8EF', color: '#2F8F7E' }, // Soft Emerald / Teal
    info: { backgroundColor: '#E0F2F1', color: '#00695C' }, // Soft Teal / Dark Teal
    warning: { backgroundColor: '#F9FBE7', color: '#827717' }, // Soft Lime / Dark Lime
    error: { backgroundColor: '#FEE2E2', color: '#991B1B' }, // Keep Red for errors
    neutral: { backgroundColor: '#F7F9F9', color: '#101820' }, // Off White / Deep Charcoal
};

export function C1Tag({ text, variant = 'neutral' }: C1TagProps) {
    if (!text) return null;

    const variantStyle = variantStyles[variant] || variantStyles.neutral;

    return (
        <Text
            style={[
                styles.tag,
                {
                    backgroundColor: variantStyle.backgroundColor,
                    color: variantStyle.color,
                },
            ]}
        >
            {text}
        </Text>
    );
}

const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20, // More rounded
        fontSize: 13,
        fontWeight: '600',
        overflow: 'hidden',
        letterSpacing: 0.2,
    },
});
