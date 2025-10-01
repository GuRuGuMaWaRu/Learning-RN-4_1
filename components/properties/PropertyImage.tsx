import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';

import Text from '@/components/Text';
import { WIDTH } from '@/core/utils/layout';
import ImageWithSquircle from '../ImageWithSquircle';

type Props = {
  imageUrl: string;
  rating: number;
  isFavorite: boolean;
};

const PropertyImage = ({ imageUrl, rating = 5, isFavorite = false }: Props) => {
  return (
    <View>
      <View className="flex flex-row items-center justify-center">
        <ImageWithSquircle image={imageUrl} width={WIDTH - 40} />
      </View>

      <BlurView
        className="absolute bottom-6 left-8 flex-row items-center overflow-hidden rounded-xl p-2"
        intensity={80}
        tint="dark">
        <Ionicons name="star" size={24} color="#FACC15" />
        <Text variant="body" className="ml-2 text-white">
          {rating}
        </Text>
      </BlurView>
      <BlurView
        className="absolute right-8 bottom-6 overflow-hidden rounded-xl p-2"
        intensity={80}
        tint="dark">
        <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color="white" />
      </BlurView>
    </View>
  );
};

export default PropertyImage;
