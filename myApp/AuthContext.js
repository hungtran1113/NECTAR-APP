// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService, storageKeys } from './services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Tự động kiểm tra trạng thái đăng nhập khi mở app (Auto Login)
  useEffect(() => {
    const checkToken = async () => {
      // Lấy token đã mã hóa từ storage
      const token = await storageService.getData(storageKeys.USER_TOKEN, true);
      if (token) {
        setUserToken(token);
      }
      setIsLoading(false);
    };
    checkToken();
  }, []);

  const login = async (token) => {
    setUserToken(token);
    // Lưu token vào máy kèm mã hóa Base64
    await storageService.saveData(storageKeys.USER_TOKEN, token, true);
  };

  const logout = async () => {
    setUserToken(null);
    // Xóa sạch dữ liệu (token, giỏ hàng, đơn hàng) khi đăng xuất
    await storageService.clearAll();
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);