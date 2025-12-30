import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1CalloutV2Props {
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    description?: string;
}

const variantStyles = {
    info: { backgroundColor: '#EFF6FF', borderColor: '#3B82F6', iconColor: '#3B82F6' },
    success: { backgroundColor: '#F0FDF4', borderColor: '#10B981', iconColor: '#10B981' },
    warning: { backgroundColor: '#FFFBEB', borderColor: '#F59E0B', iconColor: '#F59E0B' },
    error: { backgroundColor: '#FEF2F2', borderColor: '#EF4444', iconColor: '#EF4444' },
};

const variantIcons = {
    info: 'ℹ️',
    success: '✓',
    warning: '⚠️',
    error: '✕',
};

export function C1CalloutV2({ variant = 'info', title, description }: C1CalloutV2Props) {
    const style = variantStyles[variant] || variantStyles.info;
    const icon = variantIcons[variant] || variantIcons.info;

    return (
        <View style={[styles.container, { backgroundColor: style.backgroundColor, borderLeftColor: style.borderColor }]}>
            <Text style={styles.icon}>{icon}</Text>
            <View style={styles.content}>
                {title && <Text style={styles.title}>{title}</Text>}
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        gap: 12,
    },
    icon: {
        fontSize: 20,
    },
    content: {
        flex: 1,
        gap: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
    },
});
