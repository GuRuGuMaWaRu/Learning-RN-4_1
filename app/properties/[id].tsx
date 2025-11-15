import Ionicons from '@expo/vector-icons/Ionicons';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { differenceInDays, format } from 'date-fns';
import { router, useLocalSearchParams } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { nanoid } from 'nanoid/non-secure';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

import Container from '@/components/Container';
import Header from '@/components/Header';
import LoadingIndicator from '@/components/LoadingIndicator';
import Text from '@/components/Text';
import AmenitiesList from '@/components/properties/AmenitiesList';
import PropertyImage from '@/components/properties/PropertyImage';
import { client } from '@/core/api/client';
import { today } from '@/core/constants';
import useShoppingCartStore from '@/core/store';
import { calendarTheme } from '@/core/theme/calendar-theme';
import { BACKGROUND_GREY_100, PRIMARY } from '@/core/theme/colors';
import { useQuery } from '@tanstack/react-query';

const Property = () => {
  const { id } = useLocalSearchParams();
  const defaultStyles = useDefaultStyles();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ['property' + id],
    queryFn: async () => {
      const { data } = await client.get(`/properties/${id}`);
      return data.property;
    },
  });

  const { addItem, getTotalPrice } = useShoppingCartStore();

  const [datesRange, setDatesRange] = useState<{
    startDate: DateType;
    endDate: DateType;
  }>({ startDate: undefined, endDate: undefined });

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

  const calculateDays = () => {
    if (!datesRange.startDate) return 0;
    if (!datesRange.endDate) return 1;

    const start = datesRange.startDate;
    const end = datesRange.endDate;

    return differenceInDays(end as Date, start as Date) + 1;
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

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

  const hasSelectedDates = datesRange.startDate;
  const days = calculateDays();
  const totalPrice = days * property.price_per_night;

  return (
    <Container>
      <Header title="Property" />

      <ScrollView style={{ flex: 1, padding: 4, backgroundColor: BACKGROUND_GREY_100 }}>
        <PropertyImage imageUrl={property.images[1]} isFavorite={property.is_favorite} rating={5} />

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
            <Text variant="body-primary">
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
          {/* <View className="my-4 flex flex-row items-center justify-between px-4"> */}
          <View className="mb-4 flex flex-row items-center justify-center">
            <Ionicons name="wallet" color={PRIMARY} size={24} />
            <Text variant="subtitle" className="mx-4">
              Price : ${hasSelectedDates ? totalPrice : property.price_per_night}
              {!hasSelectedDates && ' per night'}
            </Text>
          </View>
          {/* </View> */}

          <DateTimePicker
            mode="range"
            minDate={today}
            startDate={datesRange.startDate}
            endDate={datesRange.endDate}
            onChange={handleChangeDate}
            styles={{
              ...defaultStyles,
              today: { borderColor: calendarTheme.today.borderColor, borderWidth: 1 }, // Add a border to today's date
              selected: { backgroundColor: calendarTheme.selectedDay.backgroundColor }, // Highlight the selected day
              selected_label: { color: calendarTheme.selectedDay.textColor }, // Highlight the selected day label
            }}
          />

          <View className="mt-auto flex flex-row items-center justify-center py-2">
            <SquircleButton
              backgroundColor={PRIMARY}
              cornerSmoothing={100}
              preserveSmoothing
              onPress={() => {
                if (!hasSelectedDates) return;

                const cartItem: ICartItem = {
                  id: nanoid(),
                  image: property.images[0],
                  name: property.name,
                  product: property.id,
                  price_per_night: property.price_per_night,
                  quantity: 1,
                  startDate: format(datesRange.startDate as Date, 'yyyy-MM-dd'),
                  endDate: datesRange.endDate
                    ? format(datesRange.endDate as Date, 'yyyy-MM-dd')
                    : format(datesRange.startDate as Date, 'yyyy-MM-dd'),
                  days,
                };
                addItem(cartItem);
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
        {hasSelectedDates ? (
          <Pressable
            onPress={() => bottomSheetRef.current?.expand()}
            className="mb-4 flex-row items-center justify-center p-2">
            <Ionicons name="pricetag" size={16} color={PRIMARY} />
            <Text variant="body-primary" className="text-center">
              Total: ${totalPrice} for {days} {days === 1 ? 'night' : 'nights'}
            </Text>
          </Pressable>
        ) : (
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
              Select dates
            </Text>
          </SquircleButton>
        )}

        <SquircleButton
          onPress={() => {
            router.push('/checkout');
          }}
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
