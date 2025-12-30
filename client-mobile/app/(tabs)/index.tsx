import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useC1Chat } from '@/hooks/useC1Chat';
import { C1MessageList } from '@/components/C1MessageList';
import { C1ChatInput } from '@/components/C1ChatInput';

export default function HomeScreen() {
  const { messages, isLoading, sendMessage } = useC1Chat();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <C1MessageList messages={messages} isLoading={isLoading} />
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
