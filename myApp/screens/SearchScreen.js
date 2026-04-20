// screens/SearchScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { productData } from '../data'; 
import { useCart } from '../CartContext'; // Import giỏ hàng

export const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(productData); 
  const { addToCart } = useCart(); // Lấy hàm thêm vào giỏ

  const handleSearch = (text) => {
    setSearchQuery(text); 
    if (text) {
      const formatQuery = text.toLowerCase();
      const newData = productData.filter((item) => item.name.toLowerCase().includes(formatQuery));
      setFilteredData(newData);
    } else {
      setFilteredData(productData);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredData(productData);
  };

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    Alert.alert("Thành công", `Đã thêm ${item.name} vào giỏ hàng!`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Text style={{ fontSize: 20, marginRight: 10 }}>🔍</Text>
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput} 
            value={searchQuery}
            onChangeText={handleSearch} 
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Text style={{ fontSize: 15, color: '#7C7C7C' }}>✖️</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
          <Text style={{ fontSize: 24 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ProductCard 
              name={item.name} 
              desc={item.desc} 
              price={item.price} 
              imageUrl={item.image || {uri: item.img}} 
              onPress={() => navigation.navigate('ProductDetail', { product: item })} 
              onAddToCart={() => handleAddToCart(item)} // Gắn hàm thêm vào giỏ
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 50 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: 'row', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, alignItems: 'center', marginRight: 15 },
  searchInput: { flex: 1, fontSize: 16, color: '#181725', fontWeight: 'bold' },
  row: { justifyContent: 'space-between', marginBottom: 15 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#7C7C7C', fontWeight: 'bold' }
});