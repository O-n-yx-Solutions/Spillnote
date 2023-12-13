import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { signup } from '../firebase';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Call the signup function with the entered email and password
      await signup(email, password, firstName, lastName);

      // Optionally, you can use the user information (e.g., first name, last name) as needed
      console.log('User signed up successfully:', { firstName, lastName, email });

      // Reset the form after successful signup
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <View>
      <Text>Register</Text>
      <View>
        <Text>First Name:</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <View>
        <Text>Last Name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <View>
        <Text>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <View>
        <Text>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          style={{ borderWidth: 1, borderColor: 'black', borderRadius: 5 }}
        />
      </View>

      <Button title="Sign Up" onPress={handleSignUp} />

      <TouchableOpacity onPress={() => console.log('Log In clicked')}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

export default RegisterPage;
