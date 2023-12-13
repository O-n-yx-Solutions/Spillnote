import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { getCurrentUser, login, deleteCurrentUserAccount } from '../firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      const user = await getCurrentUser();
      console.log('User logged in successfully:', user.email);
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Check if a user is currently logged in
      const user = await getCurrentUser();

      if (user) {
        // Delete the currently logged-in user's account
        await deleteCurrentUserAccount(user);
      } else {
        console.error('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error deleting user account:', error.message);
    }
  };

  return (
    <View>
      <Text style={styles.heading}>Log In</Text>
      <View>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          name="email"
          placeholder="Enter your email"
          style={styles.inputboxes}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          name="password"
          placeholder="Enter your password"
          secureTextEntry={true}
          style={styles.inputboxes}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.login} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete My Account</Text>
      </TouchableOpacity>
    </View>
  );
};

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

  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
});

export default LoginPage;
