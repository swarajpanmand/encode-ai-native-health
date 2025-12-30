import React from 'react';
import { View, StyleSheet } from 'react-native';

interface C1TagBlockProps {
    children?: React.ReactNode;
}

export function C1TagBlock({ children }: C1TagBlockProps) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
});
