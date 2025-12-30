import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Section {
    value: string;
    trigger: string;
    content: Array<{
        component: string;
        props: any;
    }>;
}

interface C1SectionBlockProps {
    isFoldable?: boolean;
    sections?: Section[];
    children?: React.ReactNode;
}

export function C1SectionBlock({ isFoldable, sections, children }: C1SectionBlockProps) {
    if (!sections || sections.length === 0) return null;

    const childrenArray = React.Children.toArray(children);

    return (
        <View style={styles.container}>
            {sections.map((section, index) => (
                <View key={section.value || index} style={styles.section}>
                    {section.trigger && <Text style={styles.trigger}>{section.trigger}</Text>}
                    <View style={styles.content}>
                        {childrenArray[index]}
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    section: {
        gap: 12,
    },
    trigger: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    content: {
        gap: 12,
    },
});
