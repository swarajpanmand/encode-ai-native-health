import React from 'react';
import { Text, StyleSheet, ViewStyle } from 'react-native';

interface C1TagProps {
    text?: string;
    variant?: 'success' | 'info' | 'warning' | 'error' | 'neutral';
}

const variantStyles: Record<string, { backgroundColor: string; color: string }> = {
    success: { backgroundColor: '#D1FAE5', color: '#065F46' },
    info: { backgroundColor: '#DBEAFE', color: '#1E40AF' },
    warning: { backgroundColor: '#FEF3C7', color: '#92400E' },
    error: { backgroundColor: '#FEE2E2', color: '#991B1B' },
    neutral: { backgroundColor: '#F3F4F6', color: '#374151' },
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
        borderRadius: 16,
        fontSize: 13,
        fontWeight: '500',
    },
});
