// screens/SignUpScreen.js
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

export default function SignUpScreen({ navigation }) {
  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#fff' }} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        <Image source={require('./../assets/carrot-color-icon.png')} style={styles.logo} />
        
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Afsar Hossen Shuvo" />

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput style={styles.inputField} placeholder="Imshuvo97@gmail.com" />
          <Image source={require('./../assets/check-icon.png')} style={styles.checkIcon} />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainerWithIcon}>
          <TextInput style={styles.inputField} placeholder="••••••••" secureTextEntry={true} />
          <Image source={require('./../assets/eye-icon.png')} style={styles.eyeIcon} />
        </View>

        <Text style={styles.termsText}>
          By continuing you agree to our <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Home')} 
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.loginView}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Signup</Text> 
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // Thay đổi container
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  logo: { width: 40, height: 40, alignSelf: 'center', marginBottom: 40 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, color: '#181725' },
  subtitle: { color: '#7C7C7C', marginBottom: 30 },
  label: { color: '#7C7C7C', fontSize: 16, marginBottom: 5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, fontSize: 16, marginBottom: 20, color: '#181725' },
  inputContainerWithIcon: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', marginBottom: 20 },
  inputField: { flex: 1, paddingVertical: 10, fontSize: 16, color: '#181725' },
  checkIcon: { width: 20, height: 20, tintColor: '#53B175' },
  eyeIcon: { width: 20, height: 20, tintColor: '#7C7C7C' },
  termsText: { color: '#7C7C7C', fontSize: 14, marginBottom: 30, lineHeight: 22 },
  termsLink: { color: '#53B175' },
  button: { backgroundColor: '#53B175', padding: 18, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  loginView: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: '#181725' },
  loginLink: { color: '#53B175', fontWeight: 'bold' }
});