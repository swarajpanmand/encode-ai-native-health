import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface C1HeaderProps {
    title?: string;
    subtitle?: string;
}

export function C1Header({ title, subtitle }: C1HeaderProps) {
    return (
        <View style={styles.wrapper}>
            <BlurView intensity={80} tint="light" style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.headerTop}>
                        {/* <View style={styles.iconContainer}>
                            <Feather name="activity" size={20} color="#3FB984" />
                        </View> */}
                        <View style={styles.textContainer}>
                            {title && <Text style={styles.title}>{title}</Text>}
                            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                        </View>
                    </View>
                </View>
                <LinearGradient
                    colors={['rgba(63, 185, 132, 0.3)', 'rgba(255, 255, 255, 0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.bottomGradient}
                />
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 100,
        overflow: 'hidden',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 60, // Status bar spacing
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(63, 185, 132, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#101820',
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 13,
        color: '#546E7A',
        marginTop: 2,
    },
    bottomGradient: {
        height: 1,
        width: '100%',
    },
});
