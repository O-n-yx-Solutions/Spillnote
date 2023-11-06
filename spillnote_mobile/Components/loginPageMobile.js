import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

function LoginPage() {
  return (
    <View>
      <Text>Log In</Text>
      <View>
        <Text>Username:</Text>
        <TextInput
          placeholder="Enter your username"
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <View>
        <Text>Password:</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true}
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <Button title="Log In" onPress={() => console.log('Log In clicked')} />

      <TouchableOpacity onPress={() => console.log('Register clicked')}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginPage;