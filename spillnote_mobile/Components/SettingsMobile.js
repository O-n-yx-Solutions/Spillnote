

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth, getUserInfo, logout } from '../firebase';

function SettingsMobile() {
  const [currentUser, setCurrentUser] = useState(null);
  const authUser = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(authUser);
        setCurrentUser(userInfo);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (authUser) {
      fetchUserInfo();
    }
  }, [authUser]);

  return (
    <View style={styles.backgd}>
      <Text style={styles.header}>Account</Text>
      <View>
        <Text style={styles.acctinfo}>
          Name: {currentUser?.firstName} {currentUser?.lastName}
        </Text>
          <Text style={styles.acctinfo}>Email: {authUser?.email}</Text>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3f4966" }]}
          onPress={() => logout()}
        >
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
