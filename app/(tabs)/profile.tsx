import Ionicons from '@expo/vector-icons/Ionicons';
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

import Container from '@/components/Container';
import Header from '@/components/Header';
import ImageWithSquircle from '@/components/ImageWithSquircle';
import LoadingIndicator from '@/components/LoadingIndicator';
import Text from '@/components/Text';
import { client } from '@/core/api/client';
import useAuth from '@/core/auth';
import { PRIMARY } from '@/core/theme/colors';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

type UserStat = {
  name: string;
  email: string;
  username: string;
  favoritePropertiesCount: number;
  bookingsCount: number;
  avatar: string;
};

const Profile = () => {
  const { signOut, user } = useAuth();

  const { data, isLoading, refetch } = useQuery<UserStat>({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await client.get('/users/stats');
      return response.data.stats;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading || !user || !data) {
    return <LoadingIndicator />;
  }
  console.log(data);

  return (
    <Container>
      <Header
        title="Profile"
        headerAction={{
          name: 'log-out',
          onPress: () => {
            signOut();
          },
        }}
      />
      <View className="flex flex-row items-center justify-center">
        <ImageWithSquircle image={user.avatar} width={256} height={256} borderRadius={48} />
      </View>
      <View className="mt-4 flex items-center">
        <Text variant="subtitle">{user.email}</Text>
        <Text variant="subtitle">@{user.username}</Text>
      </View>

      <SquircleView className="m-4 mt-10 flex flex-row flex-wrap justify-around">
        <View>
          <View className="flex flex-row items-center justify-center rounded-xl bg-gray-100 p-8">
            <Ionicons name="stats-chart" color={PRIMARY} size={40} />
          </View>
          <View className="mt-4 flex flex-row items-center justify-center">
            <Text variant="body" className="text-center">
              Trips
            </Text>
            <Text variant="body" className="mx-4 text-center">
              {data.bookingsCount}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex flex-row items-center justify-center rounded-xl bg-gray-100 p-8">
            <Ionicons name="heart" color={PRIMARY} size={40} />
          </View>
          <View className="mt-4 flex flex-row items-center justify-center">
            <Text variant="body" className="text-center">
              Favorite
            </Text>
            <Text variant="body" className="mx-4 text-center">
              {data.favoritePropertiesCount}
            </Text>
          </View>
        </View>
        <View>
          <View className="flex flex-row items-center justify-center rounded-xl bg-gray-100 p-8">
            <Ionicons name="albums" color={PRIMARY} size={40} />
          </View>
          <View className="mt-4 flex flex-row items-center justify-center">
            <Text variant="body" className="text-center">
              Albums
            </Text>
            <Text variant="body" className="mx-4 text-center">
              4
            </Text>
          </View>
        </View>
      </SquircleView>
    </Container>
  );
};

export default Profile;
