import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ImageTextExtractor } from '@/components/ImageTextExtractor';
import { C1Header } from '@/components/C1Components/C1Header';

export default function TabTwoScreen() {
  const router = useRouter();

  const handleTextExtracted = (text: string) => {
    // Navigate to C1 chat with extracted text
    router.push({
      pathname: '/(tabs)',
      params: { extractedText: text },
    });
  };

  return (
    <View style={styles.container}>
      <C1Header title="Document Scanner" subtitle="Analyze medical records & labels" />
      <ImageTextExtractor onTextExtracted={handleTextExtracted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});
