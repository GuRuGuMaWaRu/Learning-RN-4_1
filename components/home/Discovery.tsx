import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { Pressable, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ImageWithSquircle from '@/components/ImageWithSquircle';
import Text from '@/components/Text';

type DiscoveryProps = {
  properties: Property[];
};

const Discovery = ({ properties }: DiscoveryProps) => {
  return (
    <>
      <SquircleButton
        className="mx-4 mb-4 flex-row items-center"
        cornerSmoothing={100}
        preserveSmoothing
        borderRadius={16}
        backgroundColor="#f5f5f5"
        style={{ paddingVertical: 16, paddingHorizontal: 24 }}
        onPress={() => {
          router.navigate('/search');
        }}>
        <Ionicons name="search" size={24} color="gray" />
        <View className="mx-4">
          <Text className="text-gray-500">Where to?</Text>
        </View>
      </SquircleButton>
      <FlatList
        data={properties}
        renderItem={({ item }) => (
          <SquircleView className="mx-2">
            <ImageWithSquircle image={item.images[1]} width={196} height={224} />
            <SquircleView
              cornerSmoothing={100}
              preserveSmoothing
              borderRadius={24}
              style={{
                overflow: 'hidden',
                position: 'absolute',
                bottom: 16,
                left: 24,
                right: 24,
              }}>
              <BlurView intensity={40} tint="dark">
                <Pressable
                  className="flex flex-row items-center justify-between p-4"
                  onPress={() => {
                    router.navigate({
                      pathname: '/properties/[id]',
                      params: {
                        id: item.id,
                      },
                    });
                  }}>
                  <View>
                    <Text variant="caption" className="text-white">
                      {item.name}
                    </Text>
                    <Text variant="caption" className="text-white">
                      from ${item.price_per_night}
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward-outline" size={16} color={'white'} />
                </Pressable>
              </BlurView>
            </SquircleView>
          </SquircleView>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Discovery;
