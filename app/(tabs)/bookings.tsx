import { FlatList, View } from 'react-native';

import Container from '@/components/Container';
import Header from '@/components/Header';
import BookingItem from '@/components/bookings/BookingItem';
import { BOOKINGS } from '@/core/constants';

const Bookings = () => {
  return (
    <Container>
      <Header title="Bookings" />
      <FlatList
        data={BOOKINGS}
        renderItem={({ item }) => <BookingItem booking={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </Container>
  );
};

export default Bookings;
