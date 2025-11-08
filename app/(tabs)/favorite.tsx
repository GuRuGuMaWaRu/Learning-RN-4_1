import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ResponsiveGrid } from 'react-native-flexible-grid';

import Container from '@/components/Container';
import Card from '@/components/favorite/Card';
import Header from '@/components/Header';
import LoadingIndicator from '@/components/LoadingIndicator';
import { client } from '@/core/api/client';

const Favorite = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () => {
      const response = await client.get('/favorites');
      return response.data.favorites;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading || !data) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <Header title="Favorite" />
      <ResponsiveGrid
        data={data as Property[]}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item: Property) => item.id}
        maxItemsPerColumn={2}
        itemUnitHeight={256}
        style={{ padding: 4 }}
      />
    </Container>
  );
};

export default Favorite;
