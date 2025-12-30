import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface C1TextContentProps {
    textMarkdown?: string;
}

export function C1TextContent({ textMarkdown }: C1TextContentProps) {
    if (!textMarkdown) return null;

    // Simple markdown parser for bold text
    const renderMarkdown = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);

        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                // Bold text
                const boldText = part.slice(2, -2);
                return (
                    <Text key={index} style={styles.bold}>
                        {boldText}
                    </Text>
                );
            }
            return <Text key={index}>{part}</Text>;
        });
    };

    return <Text style={styles.text}>{renderMarkdown(textMarkdown)}</Text>;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16, // Slightly larger for readability
        color: '#374151',
        lineHeight: 26, // Increased line height
        letterSpacing: 0.2,
    },
    bold: {
        fontWeight: '700',
        color: '#111827',
    },
});
