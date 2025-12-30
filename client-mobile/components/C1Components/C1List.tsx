import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C1Icon } from './C1Icon';

interface ListItem {
    title?: string;
    subtitle?: string;
    iconName?: string;
    iconCategory?: string;
}

interface C1ListProps {
    variant?: 'icon' | 'simple';
    items?: ListItem[];
}

export function C1List({ variant = 'simple', items }: C1ListProps) {
    if (!items || items.length === 0) return null;

    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View key={index} style={styles.item}>
                    {variant === 'icon' && item.iconName && (
                        <View style={styles.iconContainer}>
                            <C1Icon name={item.iconName} category={item.iconCategory} />
                        </View>
                    )}
                    <View style={styles.textContainer}>
                        {item.title && <Text style={styles.title}>{item.title}</Text>}
                        {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    item: {
        flexDirection: 'row',
        gap: 16, // Increased gap
        padding: 16, // Increased padding
        backgroundColor: '#FFFFFF',
        borderRadius: 16, // More rounded
        borderWidth: 1,
        borderColor: '#E0F2F1', // Soft Teal border
        alignItems: 'center',
    },
    iconContainer: {
        width: 40, // Larger icon container
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E0F2F1', // Soft Teal
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
        color: '#101820', // Deep Charcoal
    },
    subtitle: {
        fontSize: 13,
        color: '#546E7A', // Blue Grey
        lineHeight: 18,
    },
});
