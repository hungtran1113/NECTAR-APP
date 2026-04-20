// screens/OnboardingScreen.js
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <ImageBackground source={require('./../assets/onboarding-bg.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={{ color: 'white', textAlign: 'center', marginBottom: 10 }}>MSSV: 23810310252 - Nguyen The Hiep - D18CNPM4</Text>
        <Image source={require('./../assets/carrot-white-icon.png')} style={styles.icon} />
        <Text style={styles.title}>Welcome{"\n"}to our store</Text>
        <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },
  overlay: { padding: 30, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingBottom: 50 },
  icon: { width: 40, height: 40, marginBottom: 15 },
  title: { fontSize: 40, color: 'white', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#53B175', width: '100%', padding: 18, borderRadius: 15, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});