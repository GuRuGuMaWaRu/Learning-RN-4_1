import { Image } from 'expo-image';
import { router } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import Container from '@/components/Container';
import Header from '@/components/Header';
import Text from '@/components/Text';
import { PRIMARY } from '@/core/theme/colors';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    router.push('/(tabs)');
  };

  return (
    <Container>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={4}>
        <Header title="Login" />
        <View className="flex-1 px-4">
          <View className="mt-24 flex flex-row items-center justify-center">
            <Image
              source={require('../assets/logo.png')}
              style={{
                height: 40,
                width: 176,
              }}
            />
          </View>
          <Text variant="subtitle-primary" className="mt-2 mb-16 text-center">
            Welcome Back
          </Text>
          <TextInput
            className="bg-gray100 mt-4 rounded-xl bg-gray-100 px-4 py-5 text-xl"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            className="bg-gray100 mt-4 rounded-xl bg-gray-100 px-4 py-5 text-xl"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry
          />

          <SquircleButton
            className="mt-auto"
            preserveSmoothing
            cornerSmoothing={100}
            borderRadius={16}
            onPress={handleSignIn}
            style={{
              backgroundColor: PRIMARY,
              paddingVertical: 16,
            }}>
            {isLoading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text variant="button" className="text-center">
                Sign In
              </Text>
            )}
          </SquircleButton>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;
