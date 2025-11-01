import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { SquircleButton, SquircleView } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Container from '@/components/Container';
import Header from '@/components/Header';
import ImageWithSquircle from '@/components/ImageWithSquircle';
import Text from '@/components/Text';
import useShoppingCartStore from '@/core/store';
import { PRIMARY } from '@/core/theme/colors';

interface BookingRequest {
  property_id: string;
  check_in: string | Date;
  check_out: string | Date;
  guest_count: number;
  special_requests: string;
}

// formatted date for back-end 2024-12-15T14:00:00Z
const formattedDate = (date: Date): string => {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
};

const Checkout = () => {
  const { item, getTotalPrice } = useShoppingCartStore();
  const { bottom } = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {};

  if (!item) {
    return (
      <Container>
        <Header title="Checkout" />
        <View className="flex-1 items-center justify-center">
          <Text variant="body">No item in the cart.</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView className="flex-1">
        <View className="px-4">
          <Header title="Checkout" />
          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor={'#f3f4f6'}
            className="flex flex-row"
            style={{
              padding: 16,
              overflow: 'hidden',
            }}>
            <ImageWithSquircle image={item.image} width={96} height={96} borderRadius={24} />
            <View className="ml-4 flex-1">
              <Text variant="body">Property</Text>
              <Text variant="body">{item.name}</Text>
            </View>
          </SquircleView>
          <SquircleView
            className="my-4 bg-white"
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor={'#f3f4f6'}
            style={{
              padding: 16,
              overflow: 'hidden',
            }}>
            <Text variant="subtitle">Your trip</Text>
            <View className="mb-4">
              <Text variant="body" className="mb-2">
                Dates
              </Text>
              <View className="flex flex-row items-center">
                <Ionicons name="calendar-outline" size={20} className="mr-2" />
                <Text variant="body">
                  {format(new Date(item.startDate), 'EEE, MMM d')} {' - '}
                  {format(new Date(item.endDate), 'EEE, MMM d, yyyy')}
                </Text>
              </View>
            </View>
          </SquircleView>
          <SquircleView
            cornerSmoothing={100}
            preserveSmoothing
            borderRadius={24}
            backgroundColor={'#f3f4f6'}
            style={{
              padding: 16,
              overflow: 'hidden',
            }}>
            <Text variant="subtitle">Price details</Text>
            <View>
              <View className="my-1 flex flex-row items-center justify-between">
                <Text variant="body">
                  ${item.price_per_night} x {item.days} nights
                </Text>
                <Text variant="body" className="text-center">
                  ${getTotalPrice()}
                </Text>
              </View>
              <View className="my-1 flex flex-row items-center justify-between">
                <Text variant="body">Cleaning Fee</Text>
                <Text variant="body" className="text-center">
                  FREE
                </Text>
              </View>
              <View className="my-1 flex flex-row items-center justify-between">
                <Text variant="body">Service Fee</Text>
                <Text variant="body" className="text-center">
                  FREE
                </Text>
              </View>

              <View className="my-2 h-[1px] bg-gray-200"></View>

              <View className="flex flex-row items-center justify-between">
                <Text variant="body" className="text-center">
                  Total (USD)
                </Text>
                <Text variant="body" className="text-center">
                  ${getTotalPrice().toFixed(2)}
                </Text>
              </View>
            </View>
          </SquircleView>
        </View>
      </ScrollView>
      <SquircleButton
        cornerSmoothing={100}
        preserveSmoothing
        borderRadius={24}
        backgroundColor={PRIMARY}
        onPress={onSubmit}
        style={{
          position: 'absolute',
          bottom: bottom + 12,
          left: 0,
          right: 0,
          marginHorizontal: 16,
          paddingVertical: 16,
        }}>
        {isLoading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text variant="button" className="text-center">
            Confirm and Pay
          </Text>
        )}
      </SquircleButton>
    </Container>
  );
};

export default Checkout;
