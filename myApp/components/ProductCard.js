// components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export const ProductCard = ({ name, desc, price, imageUrl, onPress, onAddToCart }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={imageUrl} style={styles.image} resizeMode="contain" />
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{price}</Text>
        
        {/* SỬA NÚT + Ở ĐÂY: Gắn sự kiện onAddToCart */}
        <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150, padding: 15, borderRadius: 18, backgroundColor: '#fff',
    marginRight: 15, marginBottom: 15, borderWidth: 1, borderColor: '#E2E2E2',
  },
  image: { width: '100%', height: 80, marginBottom: 15 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  desc: { fontSize: 14, color: '#7C7C7C', marginVertical: 5 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { backgroundColor: '#53B175', width: 40, height: 40, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  addText: { color: '#fff', fontSize: 24, fontWeight: '500', marginTop: -2 }
});