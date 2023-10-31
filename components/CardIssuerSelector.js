import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function CardIssuerSelector() {
  const [issuers, setIssuers] = useState([]);
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    const fetchIssuers = async () => {
      try {
        const issuersCollection = db.collection('issuers');
        const issuersSnapshot = await issuersCollection.get();
        const newIssuers = [];
        issuersSnapshot.forEach((doc) => {
          newIssuers.push(doc.data());
        });
        setIssuers(newIssuers);
      } catch (error) {
        console.error('Error fetching issuers:', error);
      }
    };

    fetchIssuers();
  }, []);

  const handleIssuerSelection = (selectedIssuer) => {
    // Navigate to the AddCard screen and pass the selected issuer as a parameter
    navigation.navigate('AddCard', { selectedIssuer });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={issuers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleIssuerSelection(item)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'lightgray',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  issuerItem: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
});
