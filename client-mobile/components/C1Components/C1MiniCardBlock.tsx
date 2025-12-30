import React from 'react';
import { View, StyleSheet } from 'react-native';

interface C1MiniCardBlockProps {
    children?: React.ReactNode;
}

export function C1MiniCardBlock({ children }: C1MiniCardBlockProps) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        gap: 8,
    },
});
