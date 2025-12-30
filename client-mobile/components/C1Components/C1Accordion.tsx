import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AccordionItem {
    value: string;
    trigger: {
        text: string;
    };
    content: React.ReactNode;
}

interface C1AccordionProps {
    children?: AccordionItem[];
}

export function C1Accordion({ children }: C1AccordionProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (value: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }
            return newSet;
        });
    };

    if (!children || children.length === 0) return null;

    return (
        <View style={styles.container}>
            {children.map((item, index) => (
                <View key={item.value || index} style={styles.item}>
                    <TouchableOpacity
                        style={styles.trigger}
                        onPress={() => toggleItem(item.value)}
                    >
                        <Text style={styles.triggerText}>{item.trigger.text}</Text>
                        <Text style={styles.icon}>
                            {openItems.has(item.value) ? '▼' : '▶'}
                        </Text>
                    </TouchableOpacity>

                    {openItems.has(item.value) && (
                        <View style={styles.content}>
                            {item.content}
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12, // Increased gap
    },
    item: {
        backgroundColor: '#F7F9F9', // Off White
        borderRadius: 12,
        overflow: 'hidden',
        // Removed border for cleaner look
    },
    trigger: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        // Removed background color to blend with item
    },
    triggerText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#101820', // Deep Charcoal
        flex: 1,
    },
    icon: {
        fontSize: 12,
        color: '#546E7A', // Blue Grey
    },
    content: {
        padding: 16,
        paddingTop: 0, // Reduce top padding since trigger has padding
        gap: 12,
    },
});
