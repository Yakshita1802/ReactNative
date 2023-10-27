import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const navigation = useNavigation(); // Initialize the navigation hook

  const handleLogin = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user is already signed up, and the login is successful
      Alert.alert('Success', 'You have successfully logged in.');
      
      // Navigate to the Wallet screen
      navigation.navigate('Wallet'); // Make sure 'Wallet' matches the name of your Wallet screen
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // If the user is not signed up, display an alert
        Alert.alert('Error', 'User does not exist. Please sign up first.');
      } else {
        console.error(error.message);
        // For other error cases, you can display a general error message
        Alert.alert('Error', 'An error occurred during login.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="white" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: 200,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
