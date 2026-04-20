// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Tự động chuyển sang Onboarding sau 3 giây
    setTimeout(() => { navigation.replace('Onboarding'); }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../assets/logo-white.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  logo: { width: 200, height: 100 },
});