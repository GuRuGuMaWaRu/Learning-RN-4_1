import { FlatList, View } from 'react-native';

import Container from '@/components/Container';
import Card from '@/components/home/Card';
import Discovery from '@/components/home/Discovery';
import MainHeader from '@/components/home/MainHeader';
import Text from '@/components/Text';
import { client } from '@/core/api/client';
import { PROPERTIES } from '@/core/constants';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['properties-list'],
    queryFn: async () => {
      const { data } = await client.get('/properties-list');
      return data.properties;
    },
  });

  if (!isLoading)
    return (
      <Container>
        <View className="flex flex-row items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </Container>
    );

  return (
    <Container>
      <MainHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Discovery properties={PROPERTIES} />}
      />
    </Container>
  );
}
