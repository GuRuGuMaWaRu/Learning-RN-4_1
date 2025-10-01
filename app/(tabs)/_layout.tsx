import { Tabs } from 'expo-router';

import { PRIMARY } from '@/core/theme/colors';
import { TabBarIcon } from '../../components/TabBarIcon';

const commonTabOptions = {
  tabBarShowLabel: false,
  headerShown: false,
};

export default function TabLayout() {
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
