import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Message } from '@/hooks/useC1Chat';
import { C1ContentRenderer } from './C1ContentRenderer';

interface C1MessageListProps {
    messages: Message[];
    isLoading: boolean;
}

export function C1MessageList({ messages, isLoading }: C1MessageListProps) {
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
                    <Text style={styles.emptyStateEmoji}>💬</Text>
                    <Text style={styles.emptyStateTitle}>Start a conversation</Text>
                    <Text style={styles.emptyStateText}>
                        Ask me anything and I'll generate interactive responses
                    </Text>
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
                            <Text style={styles.avatarText}>🤖</Text>
                        </View>
                    )}

                    <View style={styles.messageContent}>
                        {message.role === 'user' ? (
                            <Text style={styles.userMessageText}>{message.content}</Text>
                        ) : (
                            <C1ContentRenderer content={message.content} />
                        )}
                    </View>

                    {message.role === 'user' && (
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>👤</Text>
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
        backgroundColor: '#F9FAFB',
    },
    contentContainer: {
        padding: 16,
        gap: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyStateEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    emptyStateText: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: 280,
    },
    messageContainer: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
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
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 20,
    },
    messageContent: {
        flex: 1,
        maxWidth: '75%',
    },
    userMessageText: {
        backgroundColor: '#3B82F6',
        color: '#FFFFFF',
        padding: 12,
        borderRadius: 16,
        fontSize: 15,
        lineHeight: 22,
    },
    loadingContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 16,
        gap: 6,
    },
    typingDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#9CA3AF',
    },
    typingDotDelay1: {
        opacity: 0.7,
    },
    typingDotDelay2: {
        opacity: 0.4,
    },
});
