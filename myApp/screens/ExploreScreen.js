import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const categories = [
  { id: '1', name: 'Fresh Fruits\n& Vegetable', bg: '#EEF8F2', border: '#53B175', img: 'https://cdn-icons-png.flaticon.com/512/3194/3194591.png' },
  { id: '2', name: 'Cooking Oil\n& Ghee', bg: '#FFF6E5', border: '#F8A44C', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
  { id: '3', name: 'Meat & Fish', bg: '#FDE8E4', border: '#F7A593', img: 'https://cdn-icons-png.flaticon.com/512/3143/3143645.png' },
  { id: '4', name: 'Bakery & Snacks', bg: '#F4EBF7', border: '#D3B0E0', img: 'https://cdn-icons-png.flaticon.com/512/992/992747.png' },
];

export const ExploreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Find Products</Text>
      
      <View style={styles.searchContainer}>
        <TextInput placeholder="🔍 Search Store" style={styles.searchInput} />
      </View>

      <FlatList
        data={categories}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.card, { backgroundColor: item.bg, borderColor: item.border }]}
            onPress={() => navigation.navigate('Beverages')}
          >
            <Image source={{ uri: item.img }} style={styles.image} resizeMode="contain" />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#181725' },
  searchContainer: { backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 20 },
  searchInput: { fontSize: 16 },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  card: { flex: 0.48, borderRadius: 18, padding: 15, alignItems: 'center', height: 190, justifyContent: 'center', borderWidth: 1 },
  image: { width: 70, height: 70, marginBottom: 20 },
  name: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', color: '#181725' }
});