import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface TableRow {
    children: any[]; // Can be string or component object
}

interface TableHeader {
    rows: { children: string; type: string }[];
}

interface TableBody {
    rows: TableRow[];
}

interface C1TableProps {
    tableHeader?: TableHeader;
    tableBody?: TableBody;
    renderCellContent: (content: any) => React.ReactNode;
}

export function C1Table({ tableHeader, tableBody, renderCellContent }: C1TableProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Header */}
                {tableHeader && (
                    <View style={styles.headerRow}>
                        {tableHeader.rows.map((header, index) => (
                            <View key={index} style={[styles.cell, styles.headerCell, { width: getColumnWidth(index) }]}>
                                <Text style={styles.headerText}>{header.children}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {/* Body */}
                {tableBody?.rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={[styles.row, rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow]}>
                        {row.children.map((cell, cellIndex) => (
                            <View key={cellIndex} style={[styles.cell, { width: getColumnWidth(cellIndex) }]}>
                                {typeof cell === 'string' ? (
                                    <Text style={styles.cellText}>{cell}</Text>
                                ) : (
                                    renderCellContent(cell)
                                )}
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

// Helper to define column widths based on index (simple heuristic for now)
function getColumnWidth(index: number): number {
    switch (index) {
        case 0: return 140; // Ingredient
        case 1: return 80;  // Concentration
        case 2: return 120; // Function
        case 3: return 100; // Risk
        default: return 100;
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        marginVertical: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    evenRow: {
        backgroundColor: '#FFFFFF',
    },
    oddRow: {
        backgroundColor: '#F9FAFB',
    },
    cell: {
        padding: 12,
        justifyContent: 'center',
    },
    headerCell: {
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#4B5563',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    cellText: {
        fontSize: 14,
        color: '#1F2937',
        lineHeight: 20,
    },
});
