import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

export default function UserWallet() {
  const [cards, setCards] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      // Fetch cards associated with the user from Firebase Firestore
      const db = getFirestore();
      const cardsCollection = collection(db, 'cards');
      const userCardsQuery = query(cardsCollection, where('userId', '==', user.uid));

      getDocs(userCardsQuery)
        .then((querySnapshot) => {
          const userCards = [];
          querySnapshot.forEach((doc) => {
            userCards.push({ id: doc.id, ...doc.data() });
          });
          setCards(userCards);
        })
        .catch((error) => {
          console.error('Error fetching user cards:', error);
        });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>Your Cards:</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Issuer: {item.issuer}</Text>
            <Text>Card Number: {item.cardNumber}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
  },
});
