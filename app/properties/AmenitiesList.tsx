import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

import Text from '@/components/Text';
import { PRIMARY } from '@/core/theme/colors';

export type AmenityType =
  | 'WiFi'
  | 'Kitchen'
  | 'Pool'
  | 'Air conditioning'
  | 'Pet friendly'
  | 'Free parking';

const amenityIcon: Record<AmenityType, keyof typeof Ionicons.glyphMap> = {
  'Air conditioning': 'snow',
  'Pet friendly': 'paw',
  Kitchen: 'restaurant',
  Pool: 'water',
  WiFi: 'wifi',
  'Free parking': 'car',
};

type Props = { amenities: string };

const AmenitiesList = ({ amenities }: Props) => {
  const allAmenities = amenities.split(', ') as AmenityType[];

  return (
    <View className="my-4 flex flex-row flex-wrap justify-evenly">
      {allAmenities.map((amenity, index) => {
        return (
          <View
            key={index}
            className="mx-2 flex flex-1 items-center justify-center rounded-2xl bg-white p-2">
            <Ionicons name={amenityIcon[amenity]} size={24} color={PRIMARY} />
            <Text variant="body-primary" className="mt-2 text-center">
              {amenity}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default AmenitiesList;
