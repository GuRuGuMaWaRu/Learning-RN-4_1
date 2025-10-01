import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, View } from 'react-native';

import { PRIMARY } from '@/core/theme/colors';

const MainHeader = () => {
  return (
    <View className="px-4 py-4">
      <View className="flex-row items-center justify-between">
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 88, height: 20, resizeMode: 'contain' }}
        />
        <Ionicons name="sparkles" size={24} color={PRIMARY} />
      </View>
    </View>
  );
};

export default MainHeader;
