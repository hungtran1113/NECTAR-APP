import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ProductCard } from '../components/ProductCard';

const beveragesData = [
  { id: '1', name: 'Diet Coke', desc: '355ml, Price', price: '$1.99', img: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' },
  { id: '2', name: 'Sprite Can', desc: '325ml, Price', price: '$1.50', img: 'https://cdn-icons-png.flaticon.com/512/2921/2921822.png' },
  { id: '3', name: 'Apple & Grape Juice', desc: '2L, Price', price: '$15.99', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
  { id: '4', name: 'Orenge Juice', desc: '2L, Price', price: '$15.99', img: 'https://cdn-icons-png.flaticon.com/512/3014/3014502.png' },
];

export const BeveragesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Beverages</Text>
        <TouchableOpacity><Text style={styles.icon}>{"⚙️"}</Text></TouchableOpacity>
      </View>

      <FlatList
        data={beveragesData}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard 
            name={item.name} 
            desc={item.desc} 
            price={item.price} 
            imageUrl={item.img} 
            onPress={() => navigation.navigate('ProductDetail')}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20, borderBottomWidth: 1, borderColor: '#E2E2E2', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  icon: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  row: { justifyContent: 'space-between', paddingHorizontal: 20 }
});