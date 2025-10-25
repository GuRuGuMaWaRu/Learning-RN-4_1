import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

import Container from '@/components/Container';
import Header from '@/components/Header';
import Text from '@/components/Text';
import AmenitiesList from '@/components/properties/AmenitiesList';
import PropertyImage from '@/components/properties/PropertyImage';
import { PROPERTIES, today } from '@/core/constants';
import { BACKGROUND_GREY_100, PRIMARY } from '@/core/theme/colors';

const Property = () => {
  const { id } = useLocalSearchParams();
  const defaultStyles = useDefaultStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [datesRange, setDatesRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

  const property = PROPERTIES.find((prop) => prop.id === id) as Property | undefined;
  const snapPoints = useMemo(() => ['25%', '60%'], []);

  const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    );
  }, []);

  const handleChangeDate = ({ startDate, endDate }: { startDate: DateType; endDate: DateType }) => {
    setDatesRange({ startDate, endDate });
  };

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

      <ScrollView style={{ flex: 1, padding: 4, backgroundColor: BACKGROUND_GREY_100 }}>
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
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        index={-1}
        enablePanDownToClose
        enableDynamicSizing={false}>
        <BottomSheetView className="flex-column mt-14 flex">
          <DateTimePicker
            mode="range"
            minDate={today}
            startDate={datesRange.startDate}
            endDate={datesRange.endDate}
            onChange={handleChangeDate}
            styles={{
              ...defaultStyles,
              today: { borderColor: 'blue', borderWidth: 1 }, // Add a border to today's date
              selected: { backgroundColor: 'blue' }, // Highlight the selected day
              selected_label: { color: 'white' }, // Highlight the selected day label
            }}
          />

          <View className="mt-auto flex flex-row items-center justify-center py-2">
            <SquircleButton
              backgroundColor={PRIMARY}
              cornerSmoothing={100}
              preserveSmoothing
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
              className="flex flex-row items-center justify-center px-4"
              style={{
                paddingVertical: 16,
              }}
              borderRadius={24}>
              <Ionicons name="checkmark-circle" size={20} color="white" />
              <Text variant="button" className="mx-2 text-center">
                Confirm
              </Text>
            </SquircleButton>
          </View>
        </BottomSheetView>
      </BottomSheet>

      <View className="right-0 bottom-0 left-0 -z-10 mx-4 mt-auto">
        <SquircleButton
          backgroundColor={PRIMARY}
          cornerSmoothing={100}
          preserveSmoothing
          onPress={() => {
            bottomSheetRef.current?.expand();
          }}
          style={{
            paddingVertical: 16,
          }}
          borderRadius={24}>
          <Text variant="button" className="mx-2 text-center">
            Book Now
          </Text>
        </SquircleButton>
      </View>
    </Container>
  );
};

export default Property;
