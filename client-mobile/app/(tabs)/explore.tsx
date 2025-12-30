import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ImageTextExtractor } from '@/components/ImageTextExtractor';

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
