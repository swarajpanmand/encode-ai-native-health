import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface C1IconProps {
    name?: string;
    category?: string;
}

const iconMap: Record<string, string> = {
    'help-circle': '❓',
    'compass': '🧭',
    'star': '⭐',
    'heart': '❤️',
    'check': '✓',
    'info': 'ℹ️',
    'alert': '⚠️',
    'settings': '⚙️',
    'user': '👤',
    'search': '🔍',
};

export function C1Icon({ name }: C1IconProps) {
    const icon = name ? iconMap[name] || '•' : '•';

    return <Text style={styles.icon}>{icon}</Text>;
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
    },
});
