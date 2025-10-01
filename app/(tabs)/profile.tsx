import Ionicons from '@expo/vector-icons/Ionicons';
import { SquircleView } from 'expo-squircle-view';
import { View } from 'react-native';

import Container from '@/components/Container';
import Header from '@/components/Header';
import ImageWithSquircle from '@/components/ImageWithSquircle';
import Text from '@/components/Text';
import { PRIMARY } from '@/core/theme/colors';

const user: User = {
  avatar:
    'https://plus.unsplash.com/premium_photo-1755105193614-d59a8a411c56?q=80&w=1750&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  bookings: [],
  created_at: '2022-01-01',
  email: 'iV6Pz@example.com',
  id: '1',
  name: 'John Doe',
  properties: [],
  username: 'johndoe',
  bookings_count: 12,
  favorite_properties_count: 5,
};

const Profile = () => {
  return (
    <Container>
      <Header
        title="Profile"
        headerAction={{
          icon: 'settings-outline',
          onPress: () => {
            console.log('Settings pressed');
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
              {user.bookings_count}
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
              {user.favorite_properties_count}
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
