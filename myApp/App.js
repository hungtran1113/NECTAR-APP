// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, ActivityIndicator } from 'react-native';

// Import Context
import { AuthProvider, useAuth } from './AuthContext';
import { CartProvider } from './CartContext';

// Import Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SignInScreen from './screens/SignInScreen';
import NumberScreen from './screens/NumberScreen';
import VerificationScreen from './screens/VerificationScreen';
import LocationScreen from './screens/LocationScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { BeveragesScreen } from './screens/BeveragesScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { FilterScreen } from './screens/FilterScreen';
import { CartScreen } from './screens/CartScreen';
import { FavoriteScreen } from './screens/FavoriteScreen';
import { AccountScreen } from './screens/AccountScreen'; 
import { OrderHistoryScreen } from './screens/OrderHistoryScreen'; // Đã thêm dòng này

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#53B175',
        tabBarInactiveTintColor: '#181725',
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
          borderTopWidth: 1,
          borderColor: '#E2E2E2',
          backgroundColor: '#fff',
        },
        tabBarIcon: ({ color }) => {
          let iconSource;
          if (route.name === 'Shop') iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }; 
          else if (route.name === 'Explore') iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/151/151773.png' }; 
          else if (route.name === 'Cart') iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png' }; 
          else if (route.name === 'Favourite') iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png' }; 
          else if (route.name === 'Account') iconSource = { uri: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png' }; 
          return <Image source={iconSource} style={{ width: 24, height: 24, tintColor: color }} />;
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourite" component={FavoriteScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// Chuyển hướng thông minh dựa trên trạng thái đăng nhập
const RootNavigator = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#53B175' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        <Stack.Group>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Number" component={NumberScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen name="Beverages" component={BeveragesScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Filters" component={FilterScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}