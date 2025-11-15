import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useRef, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';

import Container from '@/components/Container';
import Header from '@/components/Header';
import LoadingIndicator from '@/components/LoadingIndicator';
import Card from '@/components/search/Card';
import { client } from '@/core/api/client';

type Props = {};
const Search = ({}: Props) => {
  const inputRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['properties-search', debouncedSearchQuery],
    queryFn: async () => {
      if (debouncedSearchQuery) {
        const { data } = await client.get(`/properties/search?city=${debouncedSearchQuery}`);
        return data.properties;
      }
      return [];
    },
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Container>
      <Header title="Search" />

      <View className="mx-4 flex flex-row items-center justify-center rounded-xl bg-gray-100 px-4 py-2">
        <View className="flex flex-row items-center justify-center py-3">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            ref={inputRef}
            className="ml-2 flex-1"
            placeholder="Search by city..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => <Card property={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoading ? <LoadingIndicator /> : null}
      />
    </Container>
  );
};

export default Search;
