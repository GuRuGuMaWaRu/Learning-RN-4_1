import { Redirect, SplashScreen, Tabs } from 'expo-router';

import useAuth from '@/core/auth';
import { PRIMARY } from '@/core/theme/colors';
import { useCallback, useEffect } from 'react';
import { TabBarIcon } from '../../components/TabBarIcon';

const commonTabOptions = {
  tabBarShowLabel: false,
  headerShown: false,
};

export default function TabLayout() {
  const { status } = useAuth();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (status === 'idle' || status === 'signOut') {
    return <Redirect href={'/welcome'} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          ...commonTabOptions,
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          ...commonTabOptions,
          title: 'Favorite',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          ...commonTabOptions,
          title: 'Bookings',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-clear" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          ...commonTabOptions,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}
