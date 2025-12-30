import React from 'react';
import { View, StyleSheet } from 'react-native';

interface C1MiniCardProps {
    lhs?: React.ReactNode;
    rhs?: React.ReactNode;
}

export function C1MiniCard({ lhs, rhs }: C1MiniCardProps) {
    return (
        <View style={styles.card}>
            {lhs}
            {rhs}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
});
