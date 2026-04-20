// screens/HomeScreen.js
import React from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../CartContext'; // Import giỏ hàng

export const HomeScreen = ({ navigation }) => {
  const { addToCart } = useCart(); // Lấy hàm thêm vào giỏ

  const exclusiveOffers = [
    { id: '1', name: 'Organic Bananas', desc: '7pcs, Priceg', price: '$4.99', image: { uri: 'https://cdn-icons-png.flaticon.com/512/2909/2909808.png' } },
    { id: '2', name: 'Red Apple', desc: '1kg, Priceg', price: '$4.99', image: { uri: 'https://cdn-icons-png.flaticon.com/512/415/415682.png' } },
  ];

  const handleAddToCart = (item) => {
    addToCart(item, 1);
    Alert.alert("Thành công", `Đã thêm ${item.name} vào giỏ hàng!`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.location}>📍 Dhaka, Banassre</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput placeholder="🔍 Search Store" style={styles.searchInput} />
        </View>

        <View style={styles.banner}>
          <View>
            <Text style={styles.bannerText}>Fresh Vegetables</Text>
            <Text style={styles.bannerSub}>Get Up To 40% OFF</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={exclusiveOffers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              name={item.name} 
              desc={item.desc} 
              price={item.price} 
              imageUrl={item.image} 
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
              onAddToCart={() => handleAddToCart(item)} // Gắn hàm thêm vào giỏ
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  header: { alignItems: 'center', marginTop: 50, marginBottom: 20 },
  location: { fontSize: 18, color: '#4C4F4D', fontWeight: 'bold' },
  searchContainer: { backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 20 },
  searchInput: { fontSize: 16 },
  banner: { backgroundColor: '#E2F0CB', borderRadius: 15, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  bannerText: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  bannerSub: { fontSize: 14, color: '#53B175', marginTop: 5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  seeAll: { fontSize: 16, color: '#53B175', fontWeight: '600' }
});