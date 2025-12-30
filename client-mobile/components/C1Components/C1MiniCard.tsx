import React from 'react';
import { View, StyleSheet } from 'react-native';

interface C1MiniCardProps {
    lhs?: React.ReactNode;
    rhs?: React.ReactNode;
}

export function C1MiniCard({ lhs, rhs }: C1MiniCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.lhs}>
                {lhs}
            </View>
            {rhs && (
                <View style={styles.rhs}>
                    {rhs}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF', // Clean white
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E0F2F1', // Soft Teal border
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    lhs: {
        flex: 1,
        marginRight: 12,
    },
    rhs: {
        flexShrink: 0,
        alignItems: 'flex-end',
    },
});
