import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { signup } from '../firebase';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // signup is in util.js
      await signup(email, password, firstName, lastName);

      console.log('User signed up successfully:', { firstName, lastName, email });

      // Reset the form
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
      <Text style={styles.heading}>Register</Text>
      <View>
        <Text style={styles.text}>First Name:</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          style={styles.inputboxes}
        />
      </View>

      <View>
        <Text style={styles.text}>Last Name:</Text>
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          style={styles.inputboxes}
        />
      </View>

      <View>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          style={styles.inputboxes}
        />
      </View>

      <View>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry={true}
          style={styles.inputboxes}
        />
      </View>

      <TouchableOpacity style={styles.login} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login} onPress={() => console.log('Log In clicked')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  login: {
    backgroundColor: "#3f4966",
    margin: 5,
    padding: 8,
  },
  reg: {
    backgroundColor: "#3f4966",
    margin: 5,
    padding: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
  heading:
  {
    textAlign: 'center',
    fontSize: 20,
  },
  inputboxes:
  {
    margin: 5,
    borderWidth: 1, 
    borderColor: 'black', 
    borderRadius: 5
  },
  text:
  {
    marginLeft: 5,
  },
});
export default RegisterPage;
