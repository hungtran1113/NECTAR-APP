// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { storageService, storageKeys } from './services/storageService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await storageService.getData(storageKeys.USER_TOKEN, true);
      if (token) setUserToken(token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  // Lấy email làm Token định danh người dùng
  const login = async (email) => {
    const token = email.toLowerCase().trim() || "guest"; // Nếu không nhập gì thì gán là guest
    setUserToken(token);
    await storageService.saveData(storageKeys.USER_TOKEN, token, true);
  };

  const logout = async () => {
    setUserToken(null);
    // CHỈ XÓA TRẠNG THÁI ĐĂNG NHẬP (Để giữ lại giỏ hàng cho các tài khoản khác)
    await storageService.removeData(storageKeys.USER_TOKEN);
  };

  return (
    <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);