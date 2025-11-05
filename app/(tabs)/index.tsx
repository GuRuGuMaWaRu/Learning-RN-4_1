import { FlatList } from 'react-native';

import Container from '@/components/Container';
import Card from '@/components/home/Card';
import Discovery from '@/components/home/Discovery';
import MainHeader from '@/components/home/MainHeader';
import { client } from '@/core/api/client';
import { PROPERTIES } from '@/core/constants';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['properties-list'],
    queryFn: async () => {
      const { data } = await client.get('/properties-list');
      return data.properties;
    },
  });

  console.log(JSON.stringify(data, null, 2));
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
