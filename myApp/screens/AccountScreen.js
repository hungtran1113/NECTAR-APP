// screens/AccountScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuth } from '../AuthContext';

export const AccountScreen = ({ navigation }) => {
  const { userToken, logout } = useAuth();
  
  // Tách tên từ Email (VD: imshuvo97@gmail.com -> Tên: imshuvo97)
  const userName = userToken ? userToken.split('@')[0] : 'Guest';
  const userEmail = userToken && userToken.includes('@') ? userToken : 'guest@nectar.com';

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Avatar & Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Menu Tabs */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('OrderHistory')}>
        <View style={styles.menuLeft}>
          <Text style={styles.menuIcon}>📦</Text>
          <Text style={styles.menuText}>Orders History</Text>
        </View>
        <Text style={styles.arrowIcon}>{">"}</Text>
      </TouchableOpacity>
      
      <View style={styles.separator} />

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
          <Text style={styles.menuIcon}>🎫</Text>
          <Text style={styles.menuText}>Promo Cord</Text>
        </View>
        <Text style={styles.arrowIcon}>{">"}</Text>
      </TouchableOpacity>
      
      <View style={styles.separator} />

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuLeft}>
          <Text style={styles.menuIcon}>🔔</Text>
          <Text style={styles.menuText}>Notifications</Text>
        </View>
        <Text style={styles.arrowIcon}>{">"}</Text>
      </TouchableOpacity>
      
      <View style={styles.separator} />

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileSection: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60 },
  avatarPlaceholder: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  infoBox: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#181725', textTransform: 'capitalize' },
  userEmail: { fontSize: 16, color: '#7C7C7C', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginBottom: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 20 },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { fontSize: 22, marginRight: 15 },
  menuText: { fontSize: 18, fontWeight: '600', color: '#181725' },
  arrowIcon: { fontSize: 20, color: '#181725', fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: '#E2E2E2', marginLeft: 20, marginRight: 20 },
  logoutBtn: { flexDirection: 'row', backgroundColor: '#F2F3F2', padding: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', margin: 20, marginTop: 40 },
  logoutIcon: { fontSize: 20, marginRight: 10 },
  logoutText: { color: '#53B175', fontSize: 18, fontWeight: 'bold' }
});