import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1InlineHeaderProps {
    heading?: string;
    description?: string;
}

export function C1InlineHeader({ heading, description }: C1InlineHeaderProps) {
    return (
        <View style={styles.container}>
            {heading && <Text style={styles.heading}>{heading}</Text>}
            {description && <Text style={styles.description}>{description}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    heading: {
        fontSize: 16,
        fontWeight: '700',
        color: '#101820', // Deep Charcoal
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#546E7A', // Blue Grey
        lineHeight: 20,
    },
});
