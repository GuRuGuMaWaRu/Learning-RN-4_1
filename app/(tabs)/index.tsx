import { FlatList } from 'react-native';

import Container from '@/components/Container';
import Card from '@/components/home/Card';
import Discovery from '@/components/home/Discovery';
import MainHeader from '@/components/home/MainHeader';
import { PROPERTIES } from '@/core/constants';

export default function Home() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/login');
  //   }, 1000);
  // });
  return (
    <Container>
      <MainHeader />
      <FlatList
        data={PROPERTIES}
        renderItem={({ item }) => <Card property={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Discovery properties={PROPERTIES} />}
      />
    </Container>
  );
}
