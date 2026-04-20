// screens/CartScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useCart } from '../CartContext';

export const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity, checkout } = useCart();

  // Tính TỔNG TIỀN của toàn bộ giỏ hàng (cập nhật realtime)
  const totalAmount = cartItems.reduce((sum, item) => {
    const priceValue = parseFloat(item.price.replace('$', ''));
    return sum + (priceValue * item.qty);
  }, 0).toFixed(2);

  const handleCheckout = () => {
    if (checkout(`$${totalAmount}`)) {
      Alert.alert("Thành công", "Đơn hàng đã được đặt thành công!");
      navigation.navigate('Account'); 
    }
  };

  const renderItem = ({ item }) => {
    // TÍNH GIÁ TIỀN RIÊNG CHO TỪNG MÓN (Đơn giá x Số lượng - cập nhật realtime)
    const unitPrice = parseFloat(item.price.replace('$', ''));
    const itemTotalPrice = (unitPrice * item.qty).toFixed(2);

    return (
      <View style={styles.itemContainer}>
        <Image source={item.image || {uri: item.img}} style={styles.itemImage} resizeMode="contain" />
        <View style={styles.itemInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Text style={{ fontSize: 15, color: '#B3B3B3' }}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemDesc}>{item.desc}</Text>
          <View style={styles.qtyPriceRow}>
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQuantity(item.id, item.qty - 1)}>
                <Text style={styles.qtyBtnText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.qtyText}>{item.qty}</Text>
              
              <TouchableOpacity style={[styles.qtyBtn, { borderColor: '#53B175' }]} onPress={() => updateQuantity(item.id, item.qty + 1)}>
                <Text style={[styles.qtyBtnText, { color: '#53B175' }]}>+</Text>
              </TouchableOpacity>
            </View>
            
            {/* Hiển thị giá tiền đã nhân với số lượng */}
            <Text style={styles.itemPrice}>${itemTotalPrice}</Text>
            
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>
      
      {cartItems.length > 0 ? (
        <FlatList 
          data={cartItems} 
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()} 
          renderItem={renderItem} 
          showsVerticalScrollIndicator={false} 
          ItemSeparatorComponent={() => <View style={styles.separator} />} 
          contentContainerStyle={{ paddingHorizontal: 20 }} 
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 16, color: '#7C7C7C'}}>Giỏ hàng đang trống!</Text>
        </View>
      )}

      {cartItems.length > 0 && (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutBtnText}>Go to Checkout</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalText}>${totalAmount}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#E2E2E2' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  itemContainer: { flexDirection: 'row', paddingVertical: 20, alignItems: 'center' },
  itemImage: { width: 70, height: 70, marginRight: 20 },
  itemInfo: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725', flex: 1 },
  itemDesc: { fontSize: 14, color: '#7C7C7C', marginTop: 5, marginBottom: 15 },
  qtyPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qtyControl: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 35, height: 35, borderRadius: 12, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 20, color: '#B3B3B3' },
  qtyText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15 },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  separator: { height: 1, backgroundColor: '#E2E2E2' },
  bottomBar: { padding: 20, backgroundColor: '#fff' },
  checkoutBtn: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 18, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  checkoutBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginRight: 10 },
  totalBadge: { backgroundColor: '#489E67', borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5, position: 'absolute', right: 20 },
  totalText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});