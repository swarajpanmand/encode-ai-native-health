import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'C1 Chat',
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Document Scanner',
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
