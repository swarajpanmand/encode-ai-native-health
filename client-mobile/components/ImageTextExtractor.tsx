import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTextRecognition } from '@/hooks/useTextRecognition';
import { Feather } from '@expo/vector-icons';

interface ImageTextExtractorProps {
    onTextExtracted?: (text: string) => void;
}

export function ImageTextExtractor({ onTextExtracted }: ImageTextExtractorProps) {
    const {
        pickImage,
        takePhoto,
        extractedText,
        isProcessing,
        error,
        imageUri,
        clearResult,
    } = useTextRecognition();

    const handleSendToChat = () => {
        if (extractedText && onTextExtracted) {
            onTextExtracted(extractedText);
            clearResult();
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                {/* <View style={styles.iconContainer}>
                    <Feather name="camera" size={32} color="#3FB984" />
                </View> */}
                {/* <Text style={styles.title}>Document Scanner</Text> */}
                <Text style={styles.subtitle}>Extract text from images using OCR</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cameraButton]}
                    onPress={takePhoto}
                    disabled={isProcessing}
                >
                    <Feather name="camera" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.galleryButton]}
                    onPress={pickImage}
                    disabled={isProcessing}
                >
                    <Feather name="image" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                </TouchableOpacity>
            </View>

            {isProcessing && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#3FB984" />
                    <Text style={styles.loadingText}>Extracting text...</Text>
                </View>
            )}

            {error && (
                <View style={styles.errorContainer}>
                    <Feather name="alert-triangle" size={24} color="#991B1B" />
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}

            {imageUri && !isProcessing && (
                <View style={styles.resultContainer}>
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />

                    {extractedText ? (
                        <View style={styles.textContainer}>
                            <Text style={styles.textLabel}>Extracted Text:</Text>
                            <ScrollView style={styles.textScrollView}>
                                <Text style={styles.extractedText}>{extractedText}</Text>
                            </ScrollView>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.sendButton]}
                                    onPress={handleSendToChat}
                                >
                                    <Feather name="message-square" size={20} color="#FFFFFF" />
                                    <Text style={styles.actionButtonText}>Send to C1 Chat</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, styles.clearButton]}
                                    onPress={clearResult}
                                >
                                    <Text style={styles.clearButtonText}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.noTextContainer}>
                            <Feather name="file-text" size={48} color="#92400E" />
                            <Text style={styles.noTextText}>No text found in image</Text>
                        </View>
                    )}
                </View>
            )}

            {!imageUri && !isProcessing && !error && (
                <View style={styles.emptyState}>
                    <View style={styles.emptyStateIconContainer}>
                        <Feather name="smartphone" size={48} color="#3FB984" />
                    </View>
                    <Text style={styles.emptyStateTitle}>No image selected</Text>
                    <Text style={styles.emptyStateText}>
                        Take a photo or choose an image from your gallery to extract text
                    </Text>
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
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
        flexDirection: 'row', // Added for icon + text alignment
        justifyContent: 'center',
    },
    cameraButton: {
        backgroundColor: '#3FB984', // Emerald Green
    },
    galleryButton: {
        backgroundColor: '#2F8F7E', // Teal
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    loadingContainer: {
        alignItems: 'center',
        padding: 40,
        gap: 16,
    },
    loadingText: {
        fontSize: 16,
        color: '#6B7280',
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    errorText: {
        flex: 1,
        fontSize: 15,
        color: '#991B1B',
    },
    resultContainer: {
        gap: 16,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
    },
    textContainer: {
        gap: 12,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    textScrollView: {
        maxHeight: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    extractedText: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 24,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    sendButton: {
        backgroundColor: '#3FB984', // Emerald Green
    },
    clearButton: {
        backgroundColor: '#F3F4F6',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    clearButtonText: {
        color: '#374151',
        fontSize: 15,
        fontWeight: '600',
    },
    noTextContainer: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        gap: 12,
    },
    noTextText: {
        fontSize: 16,
        color: '#92400E',
        textAlign: 'center',
    },
    emptyState: {
        alignItems: 'center',
        padding: 60,
        gap: 16,
    },
    emptyStateIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0F2F1', // Soft Teal
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
    },
    emptyStateText: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        maxWidth: 280,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E6F8EF', // Soft Emerald
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        alignSelf: 'center',
    },
});
