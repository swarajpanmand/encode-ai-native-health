import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';

interface C1ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export function C1ChatInput({ onSend, isLoading }: C1ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSend(input.trim());
            setInput('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask me anything..."
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={500}
                editable={!isLoading}
                onSubmitEditing={handleSend}
                blurOnSubmit={false}
            />
            <TouchableOpacity
                style={[styles.sendButton, (isLoading || !input.trim()) && styles.sendButtonDisabled]}
                onPress={handleSend}
                disabled={isLoading || !input.trim()}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Text style={styles.sendButtonText}>Send</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        minHeight: 44,
        maxHeight: 120,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        fontSize: 16,
        color: '#111827',
        marginRight: 12,
    },
    sendButton: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 80,
        height: 44,
    },
    sendButtonDisabled: {
        backgroundColor: '#9CA3AF',
        opacity: 0.5,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
