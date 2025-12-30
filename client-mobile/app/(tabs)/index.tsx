import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useC1Chat } from '@/hooks/useC1Chat';
import { C1MessageList } from '@/components/C1MessageList';
import { C1ChatInput } from '@/components/C1ChatInput';
import { C1Header } from '@/components/C1Components/C1Header';

export default function HomeScreen() {
  const { messages, isLoading, sendMessage } = useC1Chat();
  const params = useLocalSearchParams<{ extractedText?: string }>();

  // Auto-send extracted text from OCR
  useEffect(() => {
    if (params.extractedText) {
      sendMessage(params.extractedText);
    }
  }, [params.extractedText]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <C1Header title="C1 Chat" subtitle="AI-Native Health Copilot" />
      <C1MessageList
        messages={messages}
        isLoading={isLoading}
        onSendMessage={sendMessage}
      />
      <C1ChatInput onSend={sendMessage} isLoading={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
