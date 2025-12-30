import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface C1TextContentProps {
    textMarkdown?: string;
}

export function C1TextContent({ textMarkdown }: C1TextContentProps) {
    if (!textMarkdown) return null;

    return <Text style={styles.text}>{textMarkdown}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 24,
    },
});
