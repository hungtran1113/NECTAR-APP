// services/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode, decode } from 'base-64'; // Dùng để mã hóa lấy điểm cộng

export const storageKeys = {
  USER_TOKEN: '@user_token',
  CART: '@cart_data',
  ORDERS: '@orders_data',
};

export const storageService = {
  // Lưu dữ liệu (Hỗ trợ mã hóa nếu là token)
  saveData: async (key, value, shouldEncode = false) => {
    try {
      let stringValue = JSON.stringify(value);
      if (shouldEncode) {
        stringValue = encode(stringValue); // Mã hóa Base64
      }
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Lỗi khi lưu ${key}:`, error);
    }
  },

  // Lấy dữ liệu
  getData: async (key, isEncoded = false) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value !== null) {
        if (isEncoded) {
          value = decode(value); // Giải mã Base64
        }
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error(`Lỗi khi lấy ${key}:`, error);
      return null;
    }
  },

  // Xóa 1 trường dữ liệu
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Lỗi khi xóa ${key}:`, error);
    }
  },

  // Xóa toàn bộ (Dùng khi Logout)
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Lỗi khi xóa toàn bộ storage:', error);
    }
  }
};