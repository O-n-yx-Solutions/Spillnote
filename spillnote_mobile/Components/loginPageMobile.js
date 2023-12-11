import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { login } from '../firebase';
import { useState } from 'react';

function LoginPage({navigation}) {
  const handleNavigation = (screen) => 
  {
    navigation.navigate(screen);
  };

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");


  const handleChange = (event) => 
  {
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setAge(event.target.value);
        break;
    }
  };

    return (
        <View>
        <Text style={styles.heading}>Log In</Text>
        <View>
          <Text style={styles.text}>Username:</Text>
          <TextInput
            name="username"
            onChange={handleChange}
            placeholder="Enter your username"
            style={styles.inputboxes}
          />
        </View>
        <View>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            name="password"
            placeholder="Enter your password"
            secureTextEntry={true}
            style={styles.inputboxes}
          />
        </View>
  
        {/* <Button title="Log In" onPress={() => console.log('Log In clicked')} /> */}
  
        <TouchableOpacity style={styles.login} onPress={(username) => console.log(username.value)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

        <TouchableOpacity style={styles.reg} onPress={() => handleNavigation("RegisterPage")}>
          <Text style={styles.buttonText}>Need an Account? Register</Text>
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