import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1HeaderProps {
    title?: string;
    subtitle?: string;
}

import { BlurView } from 'expo-blur';

export function C1Header({ title, subtitle }: C1HeaderProps) {
    return (
        <BlurView intensity={80} tint="light" style={styles.container}>
            <View style={styles.content}>
                {title && <Text style={styles.title}>{title}</Text>}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        gap: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#101820',
        letterSpacing: -0.5,
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 15,
        color: '#546E7A',
        lineHeight: 22,
        letterSpacing: 0.1,
    },
});
