// services/storageService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encode, decode } from 'base-64'; 

export const storageKeys = {
  USER_TOKEN: '@user_token',
  CART: '@cart_data',
  ORDERS: '@orders_data',
};

export const storageService = {
  // 1. Hàm lưu dữ liệu (Có hỗ trợ mã hóa Base64)
  saveData: async (key, value, shouldEncode = false) => {
    try {
      let stringValue = JSON.stringify(value);
      if (shouldEncode) {
        stringValue = encode(stringValue); // Mã hóa để bảo mật (điểm cộng)
      }
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Lỗi khi lưu ${key}:`, error);
    }
  },

  // 2. Hàm lấy dữ liệu (Hỗ trợ giải mã)
  getData: async (key, isEncoded = false) => {
    try {
      let value = await AsyncStorage.getItem(key);
      if (value !== null) {
        if (isEncoded) {
          value = decode(value); // Giải mã
        }
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error(`Lỗi khi lấy ${key}:`, error);
      return null;
    }
  },

  // 3. Hàm xóa 1 item cụ thể
  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Lỗi khi xóa ${key}:`, error);
    }
  },

  // 4. Hàm dọn sạch toàn bộ storage (Dùng khi Đăng xuất)
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('Storage đã được dọn sạch hoàn toàn.');
    } catch (error) {
      console.error('Lỗi khi xóa sạch storage:', error);
    }
  }
};