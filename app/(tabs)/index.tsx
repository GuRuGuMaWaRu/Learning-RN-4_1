import { FlatList } from 'react-native';

import Container from '@/components/Container';
import Card from '@/components/home/Card';
import Discovery from '@/components/home/Discovery';
import MainHeader from '@/components/home/MainHeader';
import LoadingIndicator from '@/components/LoadingIndicator';
import { client } from '@/core/api/client';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data } = await client.get('/properties');
      return data.properties;
    },
  });

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <MainHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Discovery properties={data.toReversed()} />}
      />
    </Container>
  );
}
