import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';

import Text from '@/components/Text';

type Props = {
  title: string;
  headerAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
};

const Header = ({ title, headerAction }: Props) => {
  const onPress = () => {
    router.back();
  };

  return (
    <View className="mb-4 flex-row items-center justify-between px-2">
      <View className="flex-row items-center justify-center">
        <Pressable onPress={onPress}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text variant="subtitle" className="ml-2">
          {title}
        </Text>
      </View>

      {headerAction ? (
        <Pressable onPress={headerAction.onPress}>
          <Ionicons name={headerAction.icon} size={24} color="black" />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;
