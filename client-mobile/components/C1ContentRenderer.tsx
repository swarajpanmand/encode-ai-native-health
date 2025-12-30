import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C1Card } from './C1Components/C1Card';
import { C1Header } from './C1Components/C1Header';
import { C1TextContent } from './C1Components/C1TextContent';
import { C1MiniCardBlock } from './C1Components/C1MiniCardBlock';
import { C1MiniCard } from './C1Components/C1MiniCard';
import { C1ProfileTile } from './C1Components/C1ProfileTile';
import { C1Icon } from './C1Components/C1Icon';
import { C1TagBlock } from './C1Components/C1TagBlock';
import { C1Tag } from './C1Components/C1Tag';
import { C1ButtonGroup } from './C1Components/C1ButtonGroup';
import { C1Button } from './C1Components/C1Button';
import { C1CalloutV2 } from './C1Components/C1CalloutV2';

interface C1ContentRendererProps {
    content: string;
}

export function C1ContentRenderer({ content }: C1ContentRendererProps) {
    try {
        // First, try to extract content from <content thesys="true"> wrapper
        let jsonContent = content;
        const contentMatch = content.match(/<content thesys="true">(.*?)<\/content>/s);
        if (contentMatch) {
            jsonContent = contentMatch[1].trim();
        }

        // Decode HTML entities (&quot; -> ", &amp; -> &, etc.)
        jsonContent = jsonContent
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#39;/g, "'");

        // Try to parse as JSON (new C1 format)
        const parsed = JSON.parse(jsonContent);

        if (parsed.component) {
            return <View style={styles.container}>{renderComponent(parsed.component)}</View>;
        }


        // Fallback to text
        return <Text style={styles.fallbackText}>{content}</Text>;
    } catch (error) {
        // If JSON parsing fails, try XML-like format
        const parsedXML = parseC1XMLResponse(content);

        if (parsedXML.thinking || parsedXML.content || parsedXML.artifact) {
            return (
                <View style={styles.container}>
                    {parsedXML.thinking && (
                        <View style={styles.thinkingContainer}>
                            <Text style={styles.thinkingText}>💭 {parsedXML.thinking}</Text>
                        </View>
                    )}

                    {parsedXML.content && (
                        <View style={styles.contentContainer}>
                            <Text style={styles.contentText}>{parsedXML.content}</Text>
                        </View>
                    )}

                    {parsedXML.artifact && (
                        <View style={styles.artifactContainer}>
                            <Text style={styles.artifactTitle}>📄 Document</Text>
                            <Text style={styles.artifactText}>{parsedXML.artifact}</Text>
                        </View>
                    )}
                </View>
            );
        }

        // Final fallback: plain text
        return <Text style={styles.fallbackText}>{content}</Text>;
    }
}

function renderComponent(comp: any): React.ReactNode {
    if (!comp || !comp.component) return null;

    const { component, props } = comp;

    switch (component) {
        case 'Card':
            return (
                <C1Card key={Math.random()}>
                    {props?.children?.map((child: any, index: number) => (
                        <View key={index}>{renderComponent(child)}</View>
                    ))}
                </C1Card>
            );

        case 'Header':
            return <C1Header title={props?.title} subtitle={props?.subtitle} />;

        case 'TextContent':
            return <C1TextContent textMarkdown={props?.textMarkdown} />;

        case 'MiniCardBlock':
            return (
                <C1MiniCardBlock>
                    {props?.children?.map((child: any, index: number) => (
                        <View key={index}>{renderComponent(child)}</View>
                    ))}
                </C1MiniCardBlock>
            );

        case 'MiniCard':
            return (
                <C1MiniCard
                    lhs={props?.lhs ? renderComponent(props.lhs) : undefined}
                    rhs={props?.rhs ? renderComponent(props.rhs) : undefined}
                />
            );

        case 'ProfileTile':
            return (
                <C1ProfileTile
                    title={props?.title}
                    label={props?.label}
                    child={props?.child ? renderComponent(props.child) : undefined}
                />
            );

        case 'Icon':
            return <C1Icon name={props?.name} category={props?.category} />;

        case 'TagBlock':
            return (
                <C1TagBlock>
                    {props?.children?.map((tag: any, index: number) => (
                        <C1Tag key={index} text={tag.text} variant={tag.variant} />
                    ))}
                </C1TagBlock>
            );

        case 'ButtonGroup':
            return (
                <C1ButtonGroup variant={props?.variant}>
                    {props?.children?.map((child: any, index: number) => (
                        <View key={index}>{renderComponent(child)}</View>
                    ))}
                </C1ButtonGroup>
            );

        case 'Button':
            return (
                <C1Button
                    name={props?.name}
                    variant={props?.variant}
                >
                    {props?.children}
                </C1Button>
            );

        case 'CalloutV2':
            return (
                <C1CalloutV2
                    variant={props?.variant}
                    title={props?.title}
                    description={props?.description}
                />
            );

        default:
            return <Text style={styles.unknownComponent}>Unknown component: {component}</Text>;
    }
}

interface ParsedC1Response {
    thinking?: string;
    content?: string;
    artifact?: string;
}

function parseC1XMLResponse(response: string): ParsedC1Response {
    const result: ParsedC1Response = {};

    try {
        const thinkingMatch = response.match(/<thinking>(.*?)<\/thinking>/s);
        if (thinkingMatch) {
            result.thinking = thinkingMatch[1].trim();
        }

        const contentMatch = response.match(/<content>(.*?)<\/content>/s);
        if (contentMatch) {
            result.content = contentMatch[1].trim();
        }

        const artifactMatch = response.match(/<artifact>(.*?)<\/artifact>/s);
        if (artifactMatch) {
            result.artifact = artifactMatch[1].trim();
        }
    } catch (error) {
        console.error('Error parsing XML response:', error);
    }

    return result;
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    thinkingContainer: {
        backgroundColor: '#FEF3C7',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#F59E0B',
    },
    thinkingText: {
        fontSize: 14,
        color: '#92400E',
        fontStyle: 'italic',
    },
    contentContainer: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
    },
    contentText: {
        fontSize: 15,
        color: '#111827',
        lineHeight: 22,
    },
    artifactContainer: {
        backgroundColor: '#EFF6FF',
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: '#3B82F6',
    },
    artifactTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E40AF',
        marginBottom: 8,
    },
    artifactText: {
        fontSize: 14,
        color: '#1E3A8A',
        lineHeight: 20,
    },
    fallbackText: {
        fontSize: 15,
        color: '#374151',
        lineHeight: 24,
    },
    unknownComponent: {
        fontSize: 13,
        color: '#9CA3AF',
        fontStyle: 'italic',
    },
});
