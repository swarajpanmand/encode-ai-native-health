import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface C1IconProps {
    name?: string;
    category?: string;
    size?: number;
    color?: string;
}

// Map C1 icon names to Feather icon names
const iconMap: Record<string, keyof typeof Feather.glyphMap> = {
    'help-circle': 'help-circle',
    'compass': 'compass',
    'star': 'star',
    'heart': 'heart',
    'check': 'check',
    'info': 'info',
    'alert': 'alert-triangle',
    'settings': 'settings',
    'user': 'user',
    'search': 'search',
    'shield': 'shield',
    'shield-check': 'shield', // Feather doesn't have shield-check, fallback to shield
    'zap': 'zap',
    'droplets': 'droplet',
    'flower': 'sun', // Fallback for flower
    'leaf': 'feather', // Fallback for leaf
    'security': 'lock',
    'medical': 'activity',
    'nature': 'sun',
};

export function C1Icon({ name, size = 20, color = '#101820' }: C1IconProps) {
    const iconName = name ? iconMap[name] || 'circle' : 'circle';

    return <Feather name={iconName} size={size} color={color} />;
}

const styles = StyleSheet.create({});
