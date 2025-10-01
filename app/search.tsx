import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';

import Container from '@/components/Container';
import Header from '@/components/Header';
import Card from '@/components/search/Card';
import { PROPERTIES } from '@/core/constants';

type Props = {};
const Search = ({}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container>
      <Header title="Search" />

      <View className="mx-4 flex flex-row items-center justify-center rounded-xl bg-gray-100 px-4 py-2">
        <View className="flex flex-row items-center justify-center py-3">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search by city..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList
        data={PROPERTIES}
        renderItem={({ item }) => <Card property={item} />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Search;
