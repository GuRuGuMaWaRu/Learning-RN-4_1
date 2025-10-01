import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';

import Image from '@/components/Image';

type Props = {
  property: Property;
};

const Card = ({ property }: Props) => {
  return (
    <View className="flex-1 p-2">
      <Image source={property.images[0]} />
      <BlurView
        intensity={80}
        tint="light"
        className="absolute right-4 bottom-4 overflow-hidden rounded-xl p-2">
        <Ionicons name={property.is_favorite ? 'heart' : 'heart-outline'} size={24} color="white" />
      </BlurView>
    </View>
  );
};

export default Card;
