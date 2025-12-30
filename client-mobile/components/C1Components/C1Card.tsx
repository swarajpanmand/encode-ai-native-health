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
        borderRadius: 20, // Increased radius
        padding: 20, // Increased padding
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)', // Subtle border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06, // Reduced opacity
        shadowRadius: 12, // Softer shadow
        elevation: 2,
        gap: 20, // Increased gap
    },
});
