import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1DataTileProps {
    amount?: string;
    description?: string;
    child?: React.ReactNode;
}

export function C1DataTile({ amount, description, child }: C1DataTileProps) {
    return (
        <View style={styles.container}>
            {child && <View style={styles.iconContainer}>{child}</View>}
            <View style={styles.textContainer}>
                {amount && <Text style={styles.amount}>{amount}</Text>}
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0F2F1', // Soft Teal
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        gap: 2,
    },
    amount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#101820', // Deep Charcoal
        letterSpacing: -0.3,
    },
    description: {
        fontSize: 13,
        color: '#546E7A', // Blue Grey
        fontWeight: '500',
    },
});
