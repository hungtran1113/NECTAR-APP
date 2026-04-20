// screens/SignInScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/top-sign-in-banner.png')} style={styles.banner} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>
        
        {/* Nút giả lập số điện thoại */}
        <TouchableOpacity style={styles.inputMock} onPress={() => navigation.navigate('Number')}>
          <Image source={require('./../assets/flag-icon.png')} style={styles.flag} />
          <Text style={{ fontSize: 16, flex: 1 }}>+880</Text>
        </TouchableOpacity>
        
        <Text style={styles.orText}>Or connect with social media</Text>

        {/* Nút Google */}
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#5383EC' }]}>
          <Image source={require('./../assets/google-icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Nút Facebook */}
        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#4A66AC' }]} onPress={() => navigation.navigate('Login')}>
          <Image source={require('./../assets/fb-icon.png')} style={styles.socialIcon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 250, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, color: '#181725' },
  inputMock: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, marginBottom: 30 },
  flag: { width: 30, height: 20, marginRight: 10 },
  orText: { textAlign: 'center', color: '#828282', marginBottom: 30 },
  socialBtn: { flexDirection: 'row', padding: 18, borderRadius: 15, alignItems: 'center', marginBottom: 15, justifyContent: 'center' },
  socialIcon: { width: 20, height: 20, position: 'absolute', left: 20 },
  socialText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});