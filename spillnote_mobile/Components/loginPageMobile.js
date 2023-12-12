import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../firebase';
import { useAuth } from '../firebase';

const LoginPage = () => {
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      //console.log('User logged in successfully:', currentUser?.uid);
    } catch (error) {
      //console.error('Login failed:', error.message);
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
          ref={emailRef}
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
          ref={passwordRef}
        />
      </View>

      <TouchableOpacity style={styles.login} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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

    image: {
      width: 200,
      height: 200,
      resizeMode: "cover",
    },
  });
  
  export default LoginPage;