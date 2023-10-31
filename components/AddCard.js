import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';

export default function AddCard() {
  const [selectedIssuer, setSelectedIssuer] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (selectedIssuer) {
      const fetchCardsForIssuer = async () => {
        try {
          const cardsCollection = db.collection('cards'); // Replace 'cards' with your collection name
          const query = cardsCollection.where('Issuer', '==', selectedIssuer);
          const snapshot = await query.get();

          const cardData = [];
          snapshot.forEach((doc) => {
            cardData.push(doc.data());
          });

          setCards(cardData);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      };

      fetchCardsForIssuer();
    }
  }, [selectedIssuer]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Card:</Text>

      <CardIssuerSelector onSelectIssuer={setSelectedIssuer} />

      {selectedIssuer && (
        <View style={styles.cardListContainer}>
          <Text style={styles.cardListTitle}>Cards from {selectedIssuer}:</Text>
          <FlatList
            data={cards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text>Card Name: {item['Card Name']}</Text>
                <Text>Issuer: {item['Issuer']}</Text>
                {/* Include other card data fields here */}
              </View>
            )}
          />
        </View>
      )}
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
  cardListContainer: {
    marginTop: 20,
  },
  cardListTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
});
