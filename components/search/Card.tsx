import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, View } from 'react-native';

import { WIDTH } from '@/core/utils/layout';
import ImageWithSquircle from '../ImageWithSquircle';
import Text from '../Text';

type Props = {
  property: Property;
};
const Card = ({ property }: Props) => {
  return (
    <Pressable className="border-b border-gray-200 p-4">
      <View className="relative">
        <View className="mb-4 flex items-center overflow-hidden">
          <ImageWithSquircle image={property.images[0]} width={WIDTH - 40} />
        </View>
        <View className="absolute top-6 right-6">
          <Ionicons
            name={property.is_favorite ? 'heart' : 'heart-outline'}
            size={24}
            color="white"
          />
        </View>
      </View>
      <View className="px-2">
        <View className="flex flex-row items-center">
          <Text variant="body" className="">
            {property.name}, {property.country}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
