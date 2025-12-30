import React from 'react';
import { View, StyleSheet } from 'react-native';

interface C1ButtonGroupProps {
  children?: React.ReactNode;
  variant?: 'horizontal' | 'vertical';
}

export function C1ButtonGroup({ children, variant = 'horizontal' }: C1ButtonGroupProps) {
  return (
    <View style={[styles.container, variant === 'vertical' && styles.vertical]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  vertical: {
    flexDirection: 'column',
  },
});
