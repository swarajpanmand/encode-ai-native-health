import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface C1ChatInputProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

import { BlurView } from 'expo-blur';

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
            <BlurView intensity={20} tint="light" style={styles.blurContainer}>
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
                        <Feather name="arrow-up" size={20} color="#FFFFFF" />
                    )}
                </TouchableOpacity>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 24,
        backgroundColor: 'transparent', // Transparent to show content behind if floating
    },
    blurContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        borderRadius: 32,
        padding: 8,
        paddingLeft: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
    },
    input: {
        flex: 1,
        minHeight: 40,
        maxHeight: 100,
        paddingVertical: 10,
        fontSize: 16,
        color: '#101820',
        marginRight: 12,
    },
    sendButton: {
        backgroundColor: '#3FB984', // Emerald Green
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3FB984',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2,
    },
    sendButtonDisabled: {
        backgroundColor: '#E0E0E0',
        shadowOpacity: 0,
        elevation: 0,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
});
