// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useAuth } from '../AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState(''); // State lưu email người dùng gõ

  const handleLogin = () => {
    // Nếu không nhập gì, mặc định là Guest
    const userEmail = email.trim() === '' ? 'Guest' : email;
    login(userEmail); 
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Image source={require('./../assets/carrot-color-icon.png')} style={styles.logo} />
        <Text style={styles.title}>Loging</Text>
        <Text style={styles.subtitle}>Enter your emails and password</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Imshuvo97@gmail.com" 
          value={email}
          onChangeText={setEmail} // Lưu chữ đang gõ vào biến email
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput style={styles.inputPass} placeholder="••••••••" secureTextEntry={true} />
          <Image source={require('./../assets/eye-icon.png')} style={styles.eyeIcon} />
        </View>

        <TouchableOpacity style={styles.forgotView}><Text style={styles.forgotText}>Forgot Password?</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupView}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity><Text style={styles.signupLink}>Signup</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ... Copy nguyên phần styles cũ của LoginScreen vào đây ...
const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  logo: { width: 40, height: 40, alignSelf: 'center', marginBottom: 50 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#181725' },
  subtitle: { color: '#7C7C7C', marginBottom: 40 },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, fontSize: 16, marginBottom: 20, color: '#181725' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', marginBottom: 15 },
  inputPass: { flex: 1, paddingVertical: 10, fontSize: 16, color: '#181725' },
  eyeIcon: { width: 20, height: 20, tintColor: '#7C7C7C' },
  forgotView: { alignItems: 'flex-end', marginBottom: 30 },
  forgotText: { color: '#181725' },
  button: { backgroundColor: '#53B175', padding: 18, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  signupView: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { color: '#181725' },
  signupLink: { color: '#53B175', fontWeight: 'bold' }
});