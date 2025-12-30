import React from 'react';
import { View, StyleSheet } from 'react-native';

interface LayoutRow {
    headerLeft?: any;
    mediumLeft?: any[];
    headerRight?: any;
    mediumRight?: any[];
}

interface LayoutConfig {
    variant: string;
    rows: LayoutRow[];
}

interface C1LayoutProps {
    children: LayoutConfig; // The backend sends the config as "children"
    renderContent: (content: any) => React.ReactNode;
}

export function C1Layout({ children, renderContent }: C1LayoutProps) {
    const { variant, rows } = children;

    if (variant === 'M-M') {
        return (
            <View style={styles.container}>
                {rows.map((row, index) => (
                    <View key={index} style={styles.row}>
                        {/* Left Column */}
                        <View style={styles.column}>
                            {row.headerLeft && renderContent(row.headerLeft)}
                            {row.mediumLeft && row.mediumLeft.map((item: any, i: number) => (
                                <View key={`left-${i}`}>
                                    {renderContent(item)}
                                </View>
                            ))}
                        </View>

                        {/* Spacer */}
                        <View style={styles.spacer} />

                        {/* Right Column */}
                        <View style={styles.column}>
                            {row.headerRight && renderContent(row.headerRight)}
                            {row.mediumRight && row.mediumRight.map((item: any, i: number) => (
                                <View key={`right-${i}`}>
                                    {renderContent(item)}
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        );
    }

    // Fallback for unknown variants or default layout
    return null;
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    column: {
        flex: 1,
    },
    spacer: {
        width: 16,
    },
});
