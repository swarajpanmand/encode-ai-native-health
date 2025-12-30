import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1CardProps {
    children?: React.ReactNode;
}

export function C1Card({ children }: C1CardProps) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        gap: 16,
    },
});
