import { router } from 'expo-router';
import { SquircleButton } from 'expo-squircle-view';
import { useState } from 'react';
import { ActivityIndicator, Image, TextInput, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import Container from '@/components/Container';
import Header from '@/components/Header';
import Text from '@/components/Text';
import { PRIMARY } from '@/core/theme/colors';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    router.push('/(tabs)');
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={4} style={{ flex: 1 }}>
        <Header title="Sign Up" />
        <View className="flex-1 px-4">
          <View className="mt-24 flex flex-row items-center justify-center">
            <Image
              source={require('../assets/logo.png')}
              style={{ height: 40, width: 176 }}
              resizeMode="contain"
            />
          </View>
          <Text variant="subtitle-primary" className="mt-4 text-center">
            Let&apos;s get started
          </Text>
          <TextInput
            className="mt-4 rounded-xl bg-gray-100 px-4 py-6"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            className="mt-4 rounded-xl bg-gray-100 px-4 py-6"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            className="mt-4 rounded-xl bg-gray-100 px-4 py-6"
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
            onPress={handleRegister}
            style={{
              backgroundColor: PRIMARY,
              paddingVertical: 16,
            }}>
            {isLoading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text variant="button" className="text-center">
                Sign Up
              </Text>
            )}
          </SquircleButton>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Signup;
