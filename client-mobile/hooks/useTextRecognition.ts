import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

export interface TextRecognitionResult {
    text: string;
    blocks: Array<{
        text: string;
        lines: Array<{
            text: string;
        }>;
    }>;
}

export interface UseTextRecognitionReturn {
    pickImage: () => Promise<void>;
    takePhoto: () => Promise<void>;
    extractedText: string;
    isProcessing: boolean;
    error: string | null;
    imageUri: string | null;
    clearResult: () => void;
}

export function useTextRecognition(): UseTextRecognitionReturn {
    const [extractedText, setExtractedText] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const recognizeText = async (uri: string) => {
        setIsProcessing(true);
        setError(null);

        try {
            const result = await TextRecognition.recognize(uri);
            setExtractedText(result.text);
            setImageUri(uri);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to recognize text';
            setError(errorMessage);
            console.error('Text recognition error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                setError('Permission to access photo library is required');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets[0]) {
                await recognizeText(result.assets[0].uri);
            }
        } catch (err) {
            setError('Failed to pick image');
            console.error('Image picker error:', err);
        }
    };

    const takePhoto = async () => {
        try {
            const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

            if (!permissionResult.granted) {
                setError('Permission to access camera is required');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled && result.assets[0]) {
                await recognizeText(result.assets[0].uri);
            }
        } catch (err) {
            setError('Failed to take photo');
            console.error('Camera error:', err);
        }
    };

    const clearResult = () => {
        setExtractedText('');
        setImageUri(null);
        setError(null);
    };

    return {
        pickImage,
        takePhoto,
        extractedText,
        isProcessing,
        error,
        imageUri,
        clearResult,
    };
}
