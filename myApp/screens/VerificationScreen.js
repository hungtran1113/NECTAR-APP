// screens/VerificationScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

export default function VerificationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('./../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Enter your 4-digit code</Text>
      <Text style={styles.label}>Code</Text>
      
      <TextInput style={styles.input} placeholder="- - - -" keyboardType="number-pad" autoFocus />

      <View style={styles.bottomRow}>
        <TouchableOpacity>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Location')}>
          <Image source={require('./../assets/next-icon.png')} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  backIcon: { width: 24, height: 24, marginBottom: 50 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#181725' },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 10 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10, fontSize: 18, color: '#181725', marginBottom: 50 },
  
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', bottom: 350, left: 20, right: 20 },
  
  resendText: { color: '#53B175', fontSize: 16 },
  fab: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' }
});