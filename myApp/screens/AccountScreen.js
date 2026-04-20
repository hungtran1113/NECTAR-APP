// screens/AccountScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';

export const AccountScreen = () => {
  const { logout } = useAuth();
  const { orders, removeOrder } = useCart();

  const confirmDelete = (orderId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa đơn hàng này khỏi lịch sử không?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", style: "destructive", onPress: () => removeOrder(orderId) }
      ]
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderId}>Mã đơn: {item.id}</Text>
        </View>
        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Xóa</Text>
        </TouchableOpacity>
      </View>
      
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
  orderCard: { padding: 15, borderRadius: 15, backgroundColor: '#F2F3F2', marginBottom: 15 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  orderDate: { fontSize: 12, color: '#7C7C7C', marginBottom: 2 },
  orderId: { fontSize: 13, fontWeight: 'bold', color: '#181725' },
  deleteBtn: { paddingVertical: 5, paddingHorizontal: 12, backgroundColor: '#FFEBEB', borderRadius: 8 },
  deleteText: { color: '#F36060', fontSize: 12, fontWeight: 'bold' },
  orderItems: { fontSize: 14, color: '#7C7C7C', marginBottom: 5 },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  emptyText: { color: '#7C7C7C', fontSize: 15, textAlign: 'center', marginTop: 30 },
  logoutBtn: { backgroundColor: '#F2F3F2', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 20, marginBottom: 10 },
  logoutText: { color: '#53B175', fontSize: 18, fontWeight: 'bold' }
});