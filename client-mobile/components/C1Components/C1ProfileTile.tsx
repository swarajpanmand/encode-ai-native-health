import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1ProfileTileProps {
    title?: string;
    label?: string;
    child?: React.ReactNode;
}

export function C1ProfileTile({ title, label, child }: C1ProfileTileProps) {
    return (
        <View style={styles.container}>
            {child && <View style={styles.iconContainer}>{child}</View>}
            <View style={styles.textContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
                {label && <Text style={styles.label}>{label}</Text>}
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
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        gap: 2,
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    label: {
        fontSize: 13,
        color: '#6B7280',
    },
});
