import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth, useAuth } from '../firebase';

function SettingsMobile() 
{
    const currentUser = useAuth();

  return (
    <View style={styles.backgd}>
      <Text style={styles.header}>Account</Text>
      <View>
        <Text style={styles.acctinfo}>Name: </Text>
        <Text>{currentUser.firstName + currentUser.lastName}</Text>
        <Text style={styles.acctinfo}>Email: </Text>
        <Text>{currentUser.email}</Text>
      </View>
      <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#3f4966" }]}
            onPress={() => console.log("logged out... I lov' ya")}>
            <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
      
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
    backgd: {
        backgroundColor: "#807b7b",
      margin: 10,
      height: "97%",
      borderRadius: 5,
    },
    header: {
      margin: 5,
      padding: 8,
      fontSize: 30,
      textAlign: 'center',
    },
    acctinfo: {
      fontSize: 20,
      textAlign: "center",
      backgroundColor: '#807b7b',
    },
    button: {
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
      },
      buttonText: {
        color: "#ffffff",
        fontSize: 16,
        textAlign: "center",
      },
  });
  

export default SettingsMobile;
