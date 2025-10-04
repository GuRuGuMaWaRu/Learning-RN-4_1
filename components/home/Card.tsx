import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { Pressable, View } from 'react-native';

import Text from '@/components/Text';
import CarouselItem from './CarouselItem';

type CardProps = {
  property: Property;
};

const Card = ({ property }: CardProps) => {
  return (
    <View className="border-b border-gray-200 p-4">
      <View className="relative">
        {/* <View> */}
        <CarouselItem property={property} />
        {/* </View> */}

        <View>
          <BlurView
            className="absolute bottom-12 left-8 flex-row items-center overflow-hidden rounded-xl p-2"
            intensity={60}
            tint="dark">
            <Ionicons name="star" size={24} color="#FACC15" />
            <Text className="mx-2 text-white">{5}</Text>
          </BlurView>

          <Pressable className="absolute right-8 bottom-12">
            <BlurView className="overflow-hidden rounded-xl p-2" intensity={60} tint="dark">
              <Ionicons
                name={property.is_favorite ? 'heart' : 'heart-outline'}
                size={24}
                color="white"
              />
            </BlurView>
          </Pressable>
        </View>

        <View className="px-2">
          <View className="flex-row items-center justify-between py-2">
            <View>
              <Text variant="subtitle">{property.name}</Text>
              <Text variant="caption" className="text-gray-500">
                {property.amenities}
              </Text>
            </View>
            <View>
              <Text variant="caption">{`${property.country} starts at $${property.price_per_night}`}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
