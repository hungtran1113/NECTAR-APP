// screens/NumberScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function NumberScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('./../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your mobile number</Text>
      <Text style={styles.label}>Mobile Number</Text>
      
      <View style={styles.inputContainer}>
        <Image source={require('./../assets/flag-icon.png')} style={styles.flag} />
        <TextInput style={styles.input} defaultValue="+880 " keyboardType="phone-pad" autoFocus />
      </View>

      {/* Nút Next nổi ở góc phải */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Verification')}>
        <Image source={require('./../assets/next-icon.png')} style={{width: 20, height: 20}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  backIcon: { width: 24, height: 24, marginBottom: 50 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#181725' },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  flag: { width: 30, height: 20, marginRight: 10 },
  input: { flex: 1, fontSize: 18, color: '#181725' },
  fab: { position: 'absolute', bottom: 350, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' }
});