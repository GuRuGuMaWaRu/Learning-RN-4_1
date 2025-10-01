import { ResponsiveGrid } from 'react-native-flexible-grid';

import Container from '@/components/Container';
import Card from '@/components/favorite/Card';
import Header from '@/components/Header';
import { FAVORITES } from '@/core/constants';

const Favorite = () => {
  return (
    <Container>
      <Header title="Favorite" />
      <ResponsiveGrid
        data={FAVORITES as Property[]}
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
