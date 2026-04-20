// screens/AccountScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';

export const AccountScreen = () => {
  const { logout } = useAuth();
  const { orders } = useCart();

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderId}>Order ID: {item.id}</Text>
      <Text style={styles.orderItems}>Số lượng món: {item.items.length}</Text>
      <Text style={styles.orderTotal}>Tổng tiền: <Text style={{color: '#53B175'}}>{item.total}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Account</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order History</Text>
        <FlatList 
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderOrder}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>Chưa có đơn hàng nào.</Text>}
        />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  header: { alignItems: 'center', paddingBottom: 20, borderBottomWidth: 1, borderColor: '#E2E2E2' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  section: { flex: 1, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#181725' },
  orderCard: { padding: 15, borderRadius: 10, backgroundColor: '#F2F3F2', marginBottom: 10 },
  orderDate: { fontSize: 12, color: '#7C7C7C', marginBottom: 5 },
  orderId: { fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#181725' },
  orderItems: { fontSize: 14, color: '#7C7C7C', marginBottom: 5 },
  orderTotal: { fontSize: 16, fontWeight: 'bold', marginTop: 5, color: '#181725' },
  emptyText: { color: '#7C7C7C', fontSize: 15, textAlign: 'center', marginTop: 20 },
  logoutBtn: { backgroundColor: '#F2F3F2', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 20, marginBottom: 20 },
  logoutText: { color: '#53B175', fontSize: 18, fontWeight: 'bold' }
});