import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Message } from '@/hooks/useC1Chat';
import { C1ContentRenderer } from './C1ContentRenderer';

import { Feather } from '@expo/vector-icons';

interface C1MessageListProps {
    messages: Message[];
    isLoading: boolean;
    onSendMessage?: (message: string) => void;
}

export function C1MessageList({ messages, isLoading, onSendMessage }: C1MessageListProps) {
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages, isLoading]);

    return (
        <ScrollView
            ref={scrollViewRef}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >




            {messages.length === 0 && !isLoading && (
                <View style={styles.emptyState}>
                    <View style={styles.emptyStateContent}>
                        <View style={styles.emptyStateIconContainer}>
                            <Feather name="activity" size={40} color="#3FB984" />
                        </View>
                        <Text style={styles.emptyStateTitle}>Health Copilot</Text>
                        <Text style={styles.emptyStateText}>
                            I can analyze ingredients, explain health impacts, and help you make safer choices.
                        </Text>
                    </View>

                    <View style={styles.suggestionsContainer}>
                        <Text style={styles.suggestionsLabel}>Try asking...</Text>
                        {[
                            { icon: 'camera', text: 'Analyze this label', query: 'Analyze this label' },
                            { icon: 'shield', text: 'Is this safe for kids?', query: 'Is this product safe for children?' },
                            { icon: 'alert-circle', text: 'Any hidden sugars?', query: 'Does this contain hidden sugars?' },
                            { icon: 'info', text: 'Explain ingredients', query: 'Explain these ingredients in simple terms' },
                        ].map((suggestion, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.suggestionChip}
                                onPress={() => onSendMessage?.(suggestion.query)}
                            >
                                <Feather name={suggestion.icon as any} size={16} color="#3FB984" />
                                <Text style={styles.suggestionText}>{suggestion.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            {messages.map((message) => (
                <View
                    key={message.id}
                    style={[
                        styles.messageContainer,
                        message.role === 'user' ? styles.userMessage : styles.assistantMessage,
                    ]}
                >
                    {message.role === 'assistant' && (
                        <View style={styles.avatarContainer}>
                            <Feather name="zap" size={18} color="#00695C" />
                        </View>
                    )}

                    <View style={styles.messageContent}>
                        {message.role === 'user' ? (
                            <Text style={styles.userMessageText}>{message.content}</Text>
                        ) : (
                            <C1ContentRenderer
                                content={message.content}
                                onButtonPress={onSendMessage}
                            />
                        )}
                    </View>

                    {message.role === 'user' && (
                        <View style={[styles.avatarContainer, styles.userAvatar]}>
                            <Feather name="user" size={18} color="#FFFFFF" />
                        </View>
                    )}
                </View>
            ))}

            {isLoading && (
                <View style={[styles.messageContainer, styles.assistantMessage]}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>🤖</Text>
                    </View>
                    <View style={styles.loadingContainer}>
                        <View style={styles.typingDot} />
                        <View style={[styles.typingDot, styles.typingDotDelay1]} />
                        <View style={[styles.typingDot, styles.typingDotDelay2]} />
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9F9', // Off White background
    },
    contentContainer: {
        padding: 16,
        gap: 24,
        paddingBottom: 32,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 40,
        gap: 40,
    },
    emptyStateContent: {
        alignItems: 'center',
        gap: 16,
    },
    emptyStateIconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3FB984',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 4,
        marginBottom: 8,
    },
    emptyStateTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#101820',
        letterSpacing: -1,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#546E7A',
        textAlign: 'center',
        maxWidth: 280,
        lineHeight: 24,
    },
    suggestionsContainer: {
        gap: 12,
        paddingHorizontal: 16,
    },
    suggestionsLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 4,
    },
    suggestionChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 16,
        gap: 12,
        borderWidth: 1,
        borderColor: '#E0F2F1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    suggestionText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#101820',
    },
    messageContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    assistantMessage: {
        justifyContent: 'flex-start',
    },
    avatarContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E0F2F1', // Soft Teal
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    userAvatar: {
        backgroundColor: '#3FB984', // Emerald Green
    },
    avatarText: {
        fontSize: 18,
    },
    messageContent: {
        flex: 1,
        maxWidth: '85%',
    },
    userMessageText: {
        backgroundColor: '#3FB984', // Emerald Green
        color: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderBottomRightRadius: 4,
        fontSize: 16,
        lineHeight: 24,
        overflow: 'hidden',
    },
    loadingContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 20,
        borderBottomLeftRadius: 4,
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#B0BEC5',
    },
    typingDotDelay1: {
        opacity: 0.7,
    },
    typingDotDelay2: {
        opacity: 0.4,
    },
});
