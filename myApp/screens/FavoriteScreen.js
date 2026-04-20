// screens/FavoriteScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const favItems = [
  { id: '1', name: 'Sprite Can', desc: '325ml, Price', price: '$1.50', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' } },
  { id: '2', name: 'Diet Coke', desc: '355ml, Price', price: '$1.99', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' } },
  { id: '3', name: 'Apple & Grape Juice', desc: '2L, Price', price: '$15.50', image: { uri: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' } },
  { id: '4', name: 'Coca Cola Can', desc: '325ml, Price', price: '$4.99', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' } },
  { id: '5', name: 'Pepsi Can', desc: '330ml, Price', price: '$4.99', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' } },
];

export const FavoriteScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('ProductDetail')}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.desc}</Text>
      </View>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <Text style={{ fontSize: 18, color: '#181725', fontWeight: 'bold', marginRight: 15 }}>{">"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorurite</Text>
      </View>
      <FlatList data={favItems} keyExtractor={item => item.id} renderItem={renderItem} showsVerticalScrollIndicator={false} ItemSeparatorComponent={() => <View style={styles.separator} />} />
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#E2E2E2' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  itemContainer: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  itemImage: { width: 50, height: 50, marginRight: 20 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  itemDesc: { fontSize: 14, color: '#7C7C7C', marginTop: 5 },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginRight: 15 },
  arrowIcon: { width: 15, height: 15, tintColor: '#181725' },
  separator: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 20 },
  bottomBar: { padding: 20, backgroundColor: '#fff' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 18, alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});