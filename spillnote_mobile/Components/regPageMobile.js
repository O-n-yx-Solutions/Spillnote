import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';

function RegisterPage() {
  return (
    <View>
      <Text>Register</Text>
      <View>
        <Text>First Name:</Text>
        <TextInput
          placeholder="Enter your first name"
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <View>
        <Text>Last Name:</Text>
        <TextInput
          placeholder="Enter your last name"
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <View>
        <Text>Email:</Text>
        <TextInput
          placeholder="Enter your email"
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

      <Button title="Sign Up" onPress={() => console.log('Sign Up clicked')} />

      <TouchableOpacity onPress={() => console.log('Log In clicked')}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterPage;
