// screens/LocationScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function LocationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('./../assets/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Image source={require('./../assets/map-illustration.png')} style={styles.mapImage} />
        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>Switch on your location to stay in tune with what's happening in your area</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Your Zone</Text>
        <Text style={styles.pickerFake}>Banasree</Text>
        
        <Text style={styles.label}>Your Area</Text>
        <Text style={styles.pickerFake}>Types of your area</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  backIcon: { width: 24, height: 24 },
  centerContent: { alignItems: 'center', marginTop: 40 },
  mapImage: { width: 200, height: 150, resizeMode: 'contain', marginBottom: 30 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, color: '#181725' },
  subtitle: { textAlign: 'center', color: '#7C7C7C', marginBottom: 40, paddingHorizontal: 20 },
  form: { marginBottom: 40 },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 5 },
  pickerFake: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, fontSize: 18, marginBottom: 20, color: '#181725' },
  button: { backgroundColor: '#53B175', padding: 18, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});