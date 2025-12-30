import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface C1StepsProps {
    children?: React.ReactNode;
}

export function C1Steps({ children }: C1StepsProps) {
    return <View style={styles.container}>{children}</View>;
}

interface C1StepsItemProps {
    title?: string;
    details?: React.ReactNode;
    index?: number; // To show step number
    isLast?: boolean;
}

export function C1StepsItem({ title, details, index, isLast }: C1StepsItemProps) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.leftColumn}>
                <View style={styles.circle}>
                    <Text style={styles.number}>{index !== undefined ? index + 1 : '•'}</Text>
                </View>
                {!isLast && <View style={styles.line} />}
            </View>
            <View style={styles.content}>
                {title && <Text style={styles.title}>{title}</Text>}
                {details && <View style={styles.details}>{details}</View>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 0,
        paddingVertical: 8,
    },
    itemContainer: {
        flexDirection: 'row',
    },
    leftColumn: {
        alignItems: 'center',
        marginRight: 16,
        width: 24,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E0F2F1', // Soft Teal
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    number: {
        fontSize: 12,
        fontWeight: '700',
        color: '#00695C', // Teal
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#E0F2F1',
        marginVertical: 4,
    },
    content: {
        flex: 1,
        paddingBottom: 24,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#101820',
        marginBottom: 4,
        marginTop: 2, // Align with circle
    },
    details: {
        // Child content styles
    },
});
