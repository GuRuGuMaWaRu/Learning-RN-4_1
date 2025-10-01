import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlashList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useDateRange } from '@marceloterreiro/flash-calendar';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useCallback, useRef, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import Container from '@/components/Container';
import Header from '@/components/Header';
import Text from '@/components/Text';
import PropertyImage from '@/components/properties/PropertyImage';
import { PROPERTIES, today } from '@/core/constants';
import { PRIMARY } from '@/core/theme/colors';
import AmenitiesList from './AmenitiesList';

const SafeFlashList = Platform.select({
  ios: FlashList,
  android: BottomSheetFlashList as any,
});

const Property = () => {
  const { id } = useLocalSearchParams();

  const [selectedDate, setSelectedDate] = useState(today);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const { calendarActiveDateRanges, onCalendarDayPress } = useDateRange();

  console.log('calendarActiveDateRanges', calendarActiveDateRanges);
  const property = PROPERTIES.find((prop) => prop.id === id) as Property | undefined;

  if (!property) {
    return (
      <Container>
        <Header title="Property" />
        <View className="flex-1 items-center justify-center">
          <Text variant="body">Property not found</Text>
        </View>
      </Container>
    );
  }

  const imageUrl = property.images[1];

  return (
    <Container>
      <Header title="Property" />
      <ScrollView className="bg-gray-100 p-4">
        <PropertyImage imageUrl={imageUrl} rating={4.8} isFavorite={property.is_favorite} />

        <View className="mx-6">
          <View className="flex flex-row items-center justify-between">
            <Text variant="subtitle-primary" className="mt-4">
              {property.name}
            </Text>
            <View className="flex flex-row items-center justify-center">
              <Ionicons name="pricetag" size={12} color={PRIMARY} />
              <Text variant="body-primary" className="ml-2">
                ${property.price_per_night} per night
              </Text>
            </View>
          </View>
          <View className="flex flex-row items-center">
            <Ionicons name="location" size={16} color={PRIMARY} />
            <Text variant="body-primary" className="">
              {property.city}, {property.country}
            </Text>
          </View>
          <Text variant="body" className="mt-1 text-gray-700">
            {property.description}
          </Text>
        </View>
        <AmenitiesList amenities={property.amenities} />
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%']}
        backdropComponent={renderBackdrop}
        index={-1}
        enablePanDownToClose={true}
        enableDynamicSizing={false}>
        <BottomSheetView style={{ flex: 1 }}>
          <Text variant="body" className="text-center">
            Bottom Sheet
          </Text>

          <BottomSheetView style={{ flex: 1 }}>
            {/* <Calendar.List
              onCalendarDayPress={onCalendarDayPress}
              calendarActiveDateRanges={calendarActiveDateRanges}
              calendarMinDateId={today}
              CalendarScrollComponent={SafeFlashList}
              theme={calendarTheme}
            /> */}
            <Text>Selected date: {selectedDate}</Text>
            {/* <Calendar.List
              calendarActiveDateRanges={[
                {
                  startId: selectedDate,
                  endId: selectedDate,
                },
              ]}
              calendarInitialMonthId={today}
              onCalendarDayPress={setSelectedDate}
            /> */}
          </BottomSheetView>

          <SquircleButton
            backgroundColor={PRIMARY}
            cornerSmoothing={100}
            preserveSmoothing
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
            className="m-8 flex flex-row items-center justify-center px-4"
            style={{
              paddingVertical: 16,
            }}
            borderRadius={24}>
            <Ionicons name="checkmark-circle" size={20} color="white" />
            <Text variant="button" className="mx-2 text-center">
              Confirm
            </Text>
          </SquircleButton>
        </BottomSheetView>
      </BottomSheet>

      <View className="right-0 bottom-0 left-0 -z-10 mx-4 mt-auto flex flex-row items-center justify-center py-2">
        <SquircleButton
          onPress={() => bottomSheetRef.current?.expand()}
          className="flex-grow"
          backgroundColor={PRIMARY}
          borderRadius={16}
          style={{
            paddingVertical: 16,
            marginVertical: 4,
          }}>
          <Text variant="button" className="text-center">
            Book Now
          </Text>
        </SquircleButton>
      </View>
    </Container>
  );
};

export default Property;
