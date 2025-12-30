import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1HeaderProps {
    title?: string;
    subtitle?: string;
}

export function C1Header({ title, subtitle }: C1HeaderProps) {
    return (
        <View style={styles.container}>
            {title && <Text style={styles.title}>{title}</Text>}
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
    },
});
