import Ionicons from '@expo/vector-icons/Ionicons';
import { format } from 'date-fns';
import { BlurView } from 'expo-blur';
import { SquircleView } from 'expo-squircle-view';
import { StyleSheet, View } from 'react-native';

import Image from '@/components/Image';
import Text from '@/components/Text';
import useImageColors from '@/core/hooks/use-image-colors';

const CalendarDate = ({ date = new Date() }) => {
  const month = format(date, 'MMM').toUpperCase();
  const day = format(date, 'd').toUpperCase();
  const weekday = format(date, 'EEE').toUpperCase();

  return (
    <SquircleView
      cornerSmoothing={100}
      preserveSmoothing
      className="flex-col gap-2"
      backgroundColor="#f3f4f6"
      borderRadius={16}
      style={{ paddingVertical: 4, paddingHorizontal: 4 }}>
      <View className="mx-2">
        <Text variant="caption" className="text-center text-gray-500">
          {month}
        </Text>
      </View>
      <View className="mx-2">
        <Text variant="subtitle" className="text-center">
          {day}
        </Text>
      </View>
      <View className="mx-2 mt-auto">
        <Text variant="caption" className="text-center text-gray-500">
          {weekday}
        </Text>
      </View>
    </SquircleView>
  );
};

type Props = {
  booking: Booking;
};

const BookingItem = ({ booking }: Props) => {
  const { colors } = useImageColors(booking.property.images[0]);

  return (
    <View className="mx-4 flex-row justify-between gap-4">
      <View>
        <CalendarDate date={booking.check_in as unknown as Date} />
      </View>
      <SquircleView
        cornerSmoothing={100}
        preserveSmoothing
        className="flex-1"
        borderRadius={24}
        backgroundColor="lightgray"
        style={{ overflow: 'hidden' }}>
        <SquircleView
          borderRadius={24}
          style={{ overflow: 'hidden', borderBottomEndRadius: 0, borderBottomStartRadius: 0 }}>
          <View className="h-36 overflow-hidden">
            <Image source={booking.property.images[0]} style={styles.image} />
          </View>
        </SquircleView>
        <SquircleView
          cornerSmoothing={100}
          preserveSmoothing
          style={{
            padding: 24,
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: colors?.secondary,
          }}>
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            tint="dark"
            intensity={20}
          />
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={24} color="white" />
            <Text className="mx-2 text-white">
              {booking.property.name}, {booking.property.city}, {booking.property.address},{' '}
              {booking.property.country}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-white">Check In</Text>
              <Text className="text-white">{format(booking.check_in, 'dd/MM/yyyy')}</Text>
            </View>
            <View>
              <Text className="text-white">Check Out</Text>
              <Text className="text-white">{format(booking.check_out, 'dd/MM/yyyy')}</Text>
            </View>
          </View>
        </SquircleView>
      </SquircleView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 256,
  },
});

export default BookingItem;
