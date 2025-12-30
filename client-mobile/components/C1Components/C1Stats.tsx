import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';

interface C1StatsProps {
    number?: string;
    label?: string;
    icon?: keyof typeof Feather.glyphMap;
}

export function C1Stats({ number, label, icon }: C1StatsProps) {
    return (
        <View style={styles.container}>
            {icon && (
                <View style={styles.iconContainer}>
                    <Feather name={icon} size={20} color="#3FB984" />
                </View>
            )}
            {number && <Text style={styles.number} numberOfLines={1}>{number}</Text>}
            {label && <Text style={styles.label} numberOfLines={2}>{label}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 4,
        paddingVertical: 8,
        flex: 1, // Allow it to grow/shrink
        minWidth: 80, // Minimum width to prevent crushing
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E6F8EF', // Soft Emerald
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    number: {
        fontSize: 24, // Slightly smaller to fit better
        fontWeight: '800',
        color: '#101820',
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: '#546E7A',
        textAlign: 'center',
        letterSpacing: 0.1,
    },
});
